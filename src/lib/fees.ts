// Shared (client + server safe) helpers for fee data that comes from the Google Sheet.
// The sheet is loaded in src/routes/+layout.server.ts and is available on every page
// as `$page.data.fees` (or `data.fees`).

export interface FeeRow {
	id: string;
	name: string;
	total: string;
	annual: string;
	semester: string;
	monthly: string;
	emi: string;
}

/** Rows keyed by normalised id AND normalised university name. */
export type FeeMap = Record<string, FeeRow>;

export const normKey = (s: string) => (s ?? '').toLowerCase().replace(/[^a-z0-9]/g, '');

const ALIASES: Record<string, string> = {
	uttaranchal: 'uttranchal',
	uttaranchaluniversity: 'uttranchal',
	uttranchaluniversity: 'uttranchal',
	manipaluniversity: 'manipal-jaipur',
	manipalindia: 'manipal-jaipur',
	sikkimmanipaluniversity: 'sikkim-manipal',
	lpuuniversity: 'lpu',
	shooliniuniversity: 'shoolini',
	shooliniindia: 'shoolini',
	amityuniversity: 'amity',
	dypatil: 'dy-patil',
	dypatiluniversity: 'dy-patil',
	nmimsuniversity: 'nmims',
	ignouuniversity: 'ignou'
};

/** Look up a university's fee row by id (preferred) or by name. Always returns an object. */
export function getFee(fees: FeeMap | undefined | null, id: string, name?: string): Partial<FeeRow> {
	if (!fees) return {};
	const keyId = normKey(id);
	const keyName = name ? normKey(name) : '';
	return (
		fees[keyId] ??
		fees[ALIASES[keyId] ?? ''] ??
		(keyName ? fees[keyName] : undefined) ??
		(keyName ? fees[ALIASES[keyName] ?? ''] : undefined) ??
		{}
	);
}

/** Use the sheet value if it's filled in, otherwise the hard-coded fallback. */
export function pick(value: string | undefined | null, fallback: string): string {
	return value && value.trim() ? value.trim() : fallback;
}

/** One-line headline fee, e.g. "₹73,000 / semester". */
export function feeSummary(f: Partial<FeeRow>, fallback: string): string {
	if (f.semester) return `${f.semester} / semester`;
	if (f.annual) return `${f.annual} / year`;
	if (f.total) return `${f.total} / Total`;
	return fallback;
}

/** Merge sheet fees into a university list that has `id`, `name` and `fees`. */
export function withSheetFees<T extends { id: string; name: string; fees: string }>(
	list: T[],
	fees: FeeMap | undefined | null
): (T & { fee: Partial<FeeRow> })[] {
	return list.map((u) => {
		const fee = getFee(fees, u.id, u.name);
		return { ...u, fees: feeSummary(fee, u.fees), fee };
	});
}
