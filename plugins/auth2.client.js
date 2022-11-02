import Cookie from 'js-cookie';
import { unWrap } from '~/utils/fetching';
export default async ({ $config, store }) => {
	try {
		const token = response.credential;
		// if (!user.isSignedIn()) {
		//     Cookie.remove($config.auth.cookieName);
		//     store.commit('auth/user', null);
		//     return;
		// }
		Cookie.set($config.auth.cookieName, token, {
			expires: 1 / 24,
			sameSite: 'Lax',
		});

		try {
			//The new auth flow gives an extra layer of security
			//after google log in, it will hit an endpoint
			//which will authenticate the user, and save it to the database

			// Auth flow part 1: using fetch to call to a api endpoint
			// i use await twice, once to fetch the response from the api
			//and the other to unwrap the response
			const response = await unWrap(await fetch('/api/user'));
			// I store the json response on a constant
			const user = response.json;
			//then I use the data from the constant to
			//commit and save to global state
			store.commit('auth/user', {
				fullName: user.name,
				profileUrl: user.image,
			});
		} catch (error) {
			console.error(error);
		}
	} catch (e) {
		console.log(`JWT Error ${e}`);
	}
};
