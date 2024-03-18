// Describe block for the test suite
describe('Async function testing', () => {
	const userServices = require('./user-services.tsx');
	const UserSchema = require('./user.tsx');
	const mongoose = require('mongoose');
	let dbConnection: any;
	function getDbConnection() {
		if (!dbConnection) {
			dbConnection = mongoose.createConnection(
				'mongodb://127.0.0.1:27017/inventoryUsers',
				{
					useNewUrlParser: true,
					useUnifiedTopology: true,
				}
			);
		}
		return dbConnection;
	}
	// Test case
	test('Testing addUser', async () => {
		// Act - Call the async function being tested
		const result = await userServices.addUser({
			username: 'awu98',
			password: 'a1234567890!AA',
			email: 'awu98@gmail.com',
			country: 'United States',
			state: 'California',
			zipcode: '93410',
			city: 'SLO',
			firstName: 'Anson',
			lastName: 'Wu',
		});
		const other = await userServices.addUser({
			username: 'koalascope',
			password: 'a1234567890!AA',
			email: 'koalascope@gmail.com',
			country: 'United States',
			state: 'California',
			zipcode: '93410',
			city: 'SLO',
			firstName: 'koala',
			lastName: 'scope',
		});
		// Assert - Check the result or behavior of the async function
		expect(result).toEqual(true);
	});
	test('Testing getUsers', async () => {
		const userModel = getDbConnection().model('User', UserSchema);
		const target = await userModel.find();
		mongoose.disconnect();
		// Act - Call the async function being tested
		const result = await userServices.getUsers();
		// Assert - Check the result or behavior of the async function
		expect(result).toEqual(target);
	});
	test('Testing findUserByUserAndPass', async () => {
		const target = 'awu98';
		// Act - Call the async function being tested
		const res = await userServices.findUserByUserAndPass(
			'awu98',
			'a1234567890!AA'
		);
		console.log(res);
		const result = res[0].username;

		// Assert - Check the result or behavior of the async function
		expect(result).toEqual(target);
	});
	test('Testing findUserByUsername', async () => {
		const target = 'awu98';
		// Act - Call the async function being tested
		const res = await userServices.findUserByUsername('awu98');
		console.log(res);
		const result = res[0].username;

		// Assert - Check the result or behavior of the async function
		expect(result).toEqual(target);
	});
	test('Testing deleteUserById', async () => {
		const target = true;
		// Act - Call the async function being tested
		const result = await userServices.deleteUserById(
			'65f7945b2db7e286c0948847'
		);

		// Assert - Check the result or behavior of the async function
		expect(result).toEqual(target);
	});
});

// test('Testing get', () => {
// 	const userModel = getDbConnection().model('User', UserSchema);
// 	const target = userModel.find();
// 	mongoose.disconnect()
// 	const result = userServices.getUsers();
// 	expect(result).toEqual(target);
// });

// export {};
