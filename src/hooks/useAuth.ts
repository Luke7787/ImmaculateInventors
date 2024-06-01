import axios from 'axios';

export const useAuth = () => {
	// we can re export the user methods or object from this hook

	const login = (
		user: string,
		username: string,
		email: string,
		country: string,
		jwt: string
	) => {
		localStorage.setItem('user', JSON.stringify(user));
		localStorage.setItem('username', JSON.stringify(username));
		localStorage.setItem('email', JSON.stringify(email));
		localStorage.setItem('country', JSON.stringify(country));
		localStorage.setItem('jwt', JSON.stringify(jwt));
	};

	const logout = () => {
		localStorage.setItem('user', '');
		localStorage.setItem('username', '');
		localStorage.setItem('email', '');
		localStorage.setItem('country', '');
		localStorage.setItem('jwt', '');
	};

	const getUser = () => {
		return localStorage.getItem('user') || '';
	};

	const getUsername = () => {
		return localStorage.getItem('username') || '';
	};

	const getEmail = () => {
		return localStorage.getItem('email') || '';
	};

	const getCountry = () => {
		return localStorage.getItem('country') || '';
	};

	const getJwt = () => {
		let res = localStorage.getItem('jwt');
		if (res) {
			res = res.replace(/['"]+/g, '');
		}
		return res || '';
	};

	return {
		login,
		logout,
		getUser,
		getUsername,
		getEmail,
		getCountry,
		getJwt,
	};
};
