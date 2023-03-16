import { redirect } from '@sveltejs/kit';
export const ssr = false;
export function load() {
	throw redirect(300, '/dashboard-2/my-first-dashboard-link');
}
