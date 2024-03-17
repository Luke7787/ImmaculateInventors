const userServices = require('./user-services.tsx');
const mongoose = require('mongoose');
import '@types/jest';

afterAll(() => mongoose.disconnect());
test('getUsers', async () => {
	expect(await userServices.getUsers()).toBe(1);
});

export {};
