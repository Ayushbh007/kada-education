import { env } from '$env/dynamic/private';
import { normKey, type FeeMap, type FeeRow } from '$lib/fees';

// How long a fetched copy of the sheet is reused before asking Google again.
const TTL_MS = 5 * 60 * 1000;
// If Google fails, wait this long before retrying (serving the last good copy meanwhile).
const RETRY_MS = 60 * 1000;
const TIMEOUT_MS = 4000;

let cache: { at: number; ttl: number; data: FeeMap } | null = null;
let inflight: Promise<FeeMap> | null = null;

/** Minimal RFC-4180 CSV parser (handles quotes, escaped quotes, commas and newlines in cells). */
function parseCsv(text: string): string[][] {
	const rows: string[][] = [];
	let row: string[] = [];
	let cell = '';
	let inQuotes = false;
	for (let i = 0; i < text.length; i++) {
		const c = text[i];
		if (inQuotes) {
			if (c === '"') {
				if (text[i + 1] === '"') {
					cell += '"';
					i++;
				} else inQuotes = false;
			} else cell += c;
		} else if (c === '"') inQuotes = true;
		else if (c === ',') {
			row.push(cell);
			cell = '';
		} else if (c === '\n' || c === '\r') {
			if (c === '\r' && text[i + 1] === '\n') i++;
			row.push(cell);
			rows.push(row);
			row = [];
			cell = '';
		} else cell += c;
	}
	if (cell !== '' || row.length) {
		row.push(cell);
		rows.push(row);
	}
	return rows;
}

/** Map a header cell (whatever the sales team typed) to our field name. */
function headerToField(h: string): keyof FeeRow | null {
	const k = normKey(h);
	if (!k) return null;
	if (k === 'id' || k === 'universityid' || k === 'slug') return 'id';
	if (k.includes('emi')) return 'emi';
	if (k.includes('total')) return 'total';
	if (k.includes('annual') || k.includes('year')) return 'annual';
	if (k.includes('sem')) return 'semester';
	if (k.includes('month')) return 'monthly';
	if (k.includes('name') || k.includes('university')) return 'name';
	return null;
}

/** "73000", "73,000", "₹ 73,000" -> "₹73,000". Anything with words is kept as typed. */
function formatMoney(raw: string): string {
	const v = raw.trim();
	if (!v) return '';
	if (/^(₹|rs\.?|inr)?\s*[\d,]+(\.\d+)?\s*(\/-)?$/i.test(v)) {
		const n = Number(v.replace(/[^\d.]/g, ''));
		if (Number.isFinite(n)) return '₹' + n.toLocaleString('en-IN');
	}
	return v;
}

async function fetchSheet(url: string): Promise<FeeMap> {
	const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
	if (!res.ok) throw new Error(`Fee sheet HTTP ${res.status}`);
	const text = await res.text();
	if (text.trimStart().startsWith('<')) {
		throw new Error('Fee sheet returned HTML - is it published to the web as CSV?');
	}

	const [header, ...rows] = parseCsv(text);
	if (!header) return {};
	const fields = header.map(headerToField);

	const map: FeeMap = {};
	for (const r of rows) {
		const row: FeeRow = { id: '', name: '', total: '', annual: '', semester: '', monthly: '', emi: '' };
		fields.forEach((f, i) => {
			if (!f) return;
			const val = (r[i] ?? '').trim();
			row[f] = f === 'id' || f === 'name' || f === 'emi' ? val : formatMoney(val);
		});
		if (!row.id && !row.name) continue;
		if (row.id) map[normKey(row.id)] = row;
		if (row.name && !map[normKey(row.name)]) map[normKey(row.name)] = row;
	}
	return map;
}

/**
 * Returns the fee data from the Google Sheet (cached for 5 minutes).
 * Never throws: on any error it returns the last good copy, or {} so pages use their built-in fees.
 */
export async function getSheetFees(): Promise<FeeMap> {
	const url = env.FEES_SHEET_CSV_URL;
	if (!url) return {};

	if (cache && Date.now() - cache.at < cache.ttl) return cache.data;

	inflight ??= fetchSheet(url)
		.then((data) => {
			cache = { at: Date.now(), ttl: TTL_MS, data };
			return data;
		})
		.catch((err) => {
			console.error('[fees] Could not load Google Sheet:', err?.message ?? err);
			const data = cache?.data ?? {};
			cache = { at: Date.now(), ttl: RETRY_MS, data };
			return data;
		})
		.finally(() => {
			inflight = null;
		});

	return inflight;
}
