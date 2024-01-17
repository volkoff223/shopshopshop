import { error, redirect } from '@sveltejs/kit';

export const actions = {
	login: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		try {
			await locals.pb.collection('users').authWithPassword(body.email, body.password);

			//! Uncoment to add email varivication requirement
			// if (!locals.pb?.authStore?.model?.verified) {
			// 	locals.pb.authStore.clear();
			// 	return {
			// 		notVerified: true
			// 	};
			// }
		} catch (err) {
			console.log('Error: ', err);
			throw error(500, 'Something went wrong');
		}
		throw redirect(303, '/');
	}
};
