import { redirect } from '@sveltejs/kit';

export function load() {
	throw redirect(300, '/dashboard/my-first-dashboard');
}
