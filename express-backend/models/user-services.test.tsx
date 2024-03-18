import mongoose from 'mongoose';
const { getUsers, getDbConnection, addUser } = require('./user-services.tsx');
const UserSchema = require('./user.tsx');

describe('getUsers function', () => {
	let conn: any;
	beforeAll(async () => {
		conn = await getDbConnection();
	});
	afterAll(async () => {
		await mongoose.disconnect();
	});
	it('all users', async () => {
		const users = await getUsers(conn);
		console.log(users);
		expect(users).toBeDefined();
		expect(users.length).toBeGreaterThan(0);
	});
	it('specific user', async () => {
		const userModel = conn.model('User', UserSchema);
		userModel.find = jest.fn().mockResolvedValue([
			{
				username: 'dawglog',
				password: 'one',
			},
		]);
		const user = await getUsers(conn, 'dawglog', 'one');
		expect(user[0].username).toBe('dawglog');
		expect(user[0].password).toBe('one');
	});
});

export {};
