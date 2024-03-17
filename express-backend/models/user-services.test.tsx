// Import necessary modules and functions
import mongoose from 'mongoose';
const { getUsers, getDbConnection, addUser } = require('./user-services.tsx'); // Update the path accordingly

describe('getUsers function', () => {
	let conn: any;
	beforeAll(async () => {
		conn = await getDbConnection();
		// await addUser({ username: 'dawglog', password: 'ta' }, conn);
	});
	afterAll(async () => {
		await mongoose.disconnect();
	});
	it('all users', async () => {
		const users = await getUsers(conn);
		expect(users).toBeDefined();
		expect(users.length).toBeGreaterThan(0);
	});
	// it('specific user', async () => {
	// 	const user = await getUsers(conn, 'Ansoazasdfn', 'pPassword123!');
	// 	expect(user).toBe('Ansoazasdfn');
	// 	expect(user.password).toBe('pPassword123!');
	// });
});

export {};
