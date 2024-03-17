const userServices = require('./user-services.tsx');
const mongoose = require('mongoose');
import 'jest';

afterAll(() => mongoose.disconnect());

jest.mock('mongoose');
describe('getUsers', () => {
	it('returns all users from database', async () => {
		const mockUserModel = {
			find: jest.fn().mockResolvedValue([
				{ username: 'user1', password: 'password1' },
				{ username: 'user2', password: 'password2' },
			]),
		};
		mongoose.createConnection.mockReturnValueOnce({
			model: jest.fn().mockReturnValueOnce(mockUserModel),
		});
		const result = await userServices.getUsers();
		expect(mockUserModel.find).toHaveBeenCalledTimes(1);
		expect(result).toEqual([
			{ username: 'user1', password: 'password1' },
			{ username: 'user2', password: 'password2' },
		]);
	});
});

export {};
