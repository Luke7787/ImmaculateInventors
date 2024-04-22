import { useEffect } from 'react';
import { useUser } from './useUser';
import { useLocalStorage } from './useLocalStorage';

export const useAuth = () => {
	// we can re export the user methods or object from this hook
	let { user, addUser, removeUser, setUser } = useUser();
	const { getItem } = useLocalStorage();

	useEffect(() => {
		user = getItem('user');
		if (user) {
			addUser(JSON.parse(user));
		}
	}, [addUser, getItem]);

	const login = (user: string) => {
		addUser(user);
	};

	const logout = () => {
		removeUser();
	};

	const getUser = () => {
		return user || '';
	};

	return { user, login, logout, setUser, getUser };
};
