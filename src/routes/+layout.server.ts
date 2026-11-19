import { getSheetFees } from '$lib/server/feeSheet';
import type { LayoutServerLoad } from './$types';

// Loads the live fee structure from the Google Sheet once per page load.
// Available on every page as `$page.data.fees`.
export const load: LayoutServerLoad = async () => {
	return { fees: await getSheetFees() };
};
