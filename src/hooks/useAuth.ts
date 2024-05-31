export const useAuth = () => {
	// we can re export the user methods or object from this hook

	const login = (user: string) => {
		localStorage.setItem('user', JSON.stringify(user));
	};

	const logout = () => {
		localStorage.setItem('user', '');
	};

	const getUser = () => {
		return localStorage.getItem('user') || '';
	};

	return { login, logout, getUser };
};
