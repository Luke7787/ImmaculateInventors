const userServices = require('./user-services.tsx');
const mongoose = require('mongoose');
import 'jest';

test('Testing sum with zero -- success', () => {
	const target = 30;
	const result = userServices.sum(30, 0);
	expect(result).toBe(target);
});

export {};
