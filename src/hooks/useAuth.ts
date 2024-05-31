export const useAuth = () => {
	// we can re export the user methods or object from this hook

	const login = (
		user: string,
		username: string,
		email: string,
		country: string
	) => {
		localStorage.setItem('user', JSON.stringify(user));
		localStorage.setItem('username', JSON.stringify(username));
		localStorage.setItem('email', JSON.stringify(email));
		localStorage.setItem('country', JSON.stringify(country));
	};

	const logout = () => {
		localStorage.setItem('user', '');
		localStorage.setItem('username', '');
		localStorage.setItem('email', '');
		localStorage.setItem('country', '');
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

	return { login, logout, getUser, getUsername, getEmail, getCountry };
};
