import mongoose from 'mongoose';
const {
	getUsers,
	getDbConnection,
	updateItemFromUser,
	findUserById,
	getItemFromUser,
	addItemToUser,
	deleteItemFromUser,
	addUser,
	deleteUserById,
	delUser,
	findUserByUserAndPass,
	findUserByUsername,
} = require('./user-services.tsx');
const { findItemByName, deleteItem } = require('./item-services.tsx');
const UserSchema = require('./user.tsx');
const ItemSchema = require('./item.tsx');

describe('getUsers function', () => {
	let conn: any;
	beforeAll(async () => {
		conn = await getDbConnection();
	});
	afterAll(async () => {
		await mongoose.disconnect();
	});
	test('Testing addUsers', async () => {
		const user1 = await addUser(
			{
				username: 'awu98',
				password: 'a1234567890!AA',
				email: 'awu98@gmail.com',
				country: 'United States',
				state: 'California',
				zipcode: '93410',
				city: 'SLO',
				firstName: 'Anson',
				lastName: 'Wu',
			},
			conn
		);
		const user2 = await addUser(
			{
				username: 'koalascope',
				password: 'a1234567890!AA',
				email: 'koalascope@gmail.com',
				country: 'United States',
				state: 'California',
				zipcode: '93410',
				city: 'SLO',
				firstName: 'koala',
				lastName: 'scope',
			},
			conn
		);
		const user5 = await addUser(
			{
				username: 'bossbaby',
				password: 'S1u&',
				email: 'koalascope@gmail.com',
				country: 'United States',
				state: 'California',
				zipcode: '93410',
				city: 'SLO',
				firstName: 'boss',
				lastName: 'baby',
			},
			conn
		);
		const user6 = await addUser(
			{
				username: 'bossbaby2',
				password: 'a1234567890!AA',
				email: 'koalascope@gmail.com',
				country: 'United States',
				state: 'California',
				zipcode: '93410',
				city: 'SLO',
				firstName: 'boss',
			},
			conn
		);
		const user3 = await addUser(undefined, conn);
		const user4 = await addUser(undefined, undefined);
		expect(user6).toBeDefined();
		expect(user5).toEqual({
			error: true,
			message:
				'Error: Password must be 10 characters long, have a special character, uppercase character, and a number',
		});
		expect(user3).toEqual({
			error: true,
			message: 'Path `password` is required.',
		});
		expect(user4).toEqual({
			error: true,
			message: 'An unexpected error occurred',
		});
		expect(user1.username).toEqual('awu98');
	});
	test('Testing getUsers', async () => {
		const users = await getUsers(conn);
		const user = await getUsers(conn, 'awu98', 'a1234567890!AA');
		expect(user[0].username).toEqual('awu98');
		expect(users).toBeDefined();
		expect(users.length).toBeGreaterThan(0);
	});
	test('Testing findUserById', async () => {
		const result = await findUserById('awu98', conn);
		const target = 'awu98';
		const result2 = await findUserById(undefined, undefined);
		expect(result2).toBeUndefined();
		expect(result[0].username).toEqual(target);
	});
	test('Testing addItemToUser', async () => {
		const user = await findUserByUsername('awu98', conn);
		const ItemModel = conn.model('Item', ItemSchema);
		await ItemModel.create({
			userId: user[0]._id.toString(),
			name: 'Toe',
			quantity: 3,
			_id: new mongoose.Types.ObjectId('65ef409a0336b57ddfbe9ce3'),
		});
		console.log(user[0]._id.toString())
		const result = await addItemToUser(
			user[0]._id.toString(),
			'65ef409a0336b57ddfbe9ce3',
			conn
		);
		const updatedUser = await findUserByUsername('awu98', conn);
		console.log(updatedUser);
		const res = await deleteItem('65ef409a0336b57ddfbe9ce3', conn);
		expect(updatedUser[0].items.length).toBeGreaterThan(0);
	});
	test('Testing getItemFromUser', async () => {
		const user = await findUserByUsername('awu98', conn);
		const ItemModel = conn.model('Item', ItemSchema);
		await ItemModel.create({
			userId: user[0]._id.toString(),
			name: 'Toe',
			quantity: 3,
			_id: new mongoose.Types.ObjectId('65ef409a0336b57ddfbe9ce3'),
		});
		const result = getItemFromUser(
			user[0]._id.toString(),
			'65ef409a0336b57ddfbe9ce3',
			conn
		);
		const res = await deleteItem('65ef409a0336b57ddfbe9ce3', conn);
		expect(result).toBeDefined();
	});
	test('Testing updateItemFromUser (ADD)', async () => {
		const user = await findUserByUsername('awu98', conn);
		const ItemModel = conn.model('Item', ItemSchema);
		await ItemModel.create({
			userId: user[0]._id.toString(),
			name: 'Toe',
			quantity: 3,
			_id: new mongoose.Types.ObjectId('65ef409a0336b57ddfbe9ce3'),
		});
		const item = await findItemByName('Toe', conn);
		const target = item[0].quantity;
		const update = await updateItemFromUser(
			user[0]._id.toString(),
			'65ef409a0336b57ddfbe9ce3',
			1,
			'add',
			conn
		);
		const result = await findItemByName('Toe', conn);
		const res = await deleteItem('65ef409a0336b57ddfbe9ce3', conn);
		expect(result[0].quantity).toBeGreaterThan(target);
	});
	test('Testing updateItemFromUser (SUB)', async () => {
		const user = await findUserByUsername('awu98', conn);
		const ItemModel = conn.model('Item', ItemSchema);
		await ItemModel.create({
			userId: user[0]._id.toString(),
			name: 'Toe',
			quantity: 3,
			_id: new mongoose.Types.ObjectId('65ef409a0336b57ddfbe9ce3'),
		});
		const item = await findItemByName('Toe', conn);
		const target = item[0].quantity;
		const update = await updateItemFromUser(
			user[0]._id.toString(),
			'65ef409a0336b57ddfbe9ce3',
			1,
			'sub',
			conn
		);
		const result = await findItemByName('Toe', conn);
		const update2 = await updateItemFromUser(
			user[0]._id.toString(),
			'65ef409a0336b57ddfbe9ce3',
			3,
			'sub',
			conn
		);
		expect(update2).toBeDefined();
		expect(result[0].quantity).toBeLessThan(target);
	});
	test('Testing deleteItemFromUser', async () => {
		const user = await findUserByUsername('awu98', conn);
		const ItemModel = conn.model('Item', ItemSchema);
		await ItemModel.create({
			userId: user[0]._id.toString(),
			name: 'Toe',
			quantity: 3,
			_id: new mongoose.Types.ObjectId('65ef409a0336b57ddfbe9ce3'),
		});
		const result = await deleteItemFromUser(
			user[0]._id.toString(),
			'65ef409a0336b57ddfbe9ce3',
			conn
		);
		const updatedUser = await findUserByUsername('awu98', conn);
		console.log(updatedUser);
		const res = await deleteItem('65ef409a0336b57ddfbe9ce3', conn);
		expect(updatedUser[0].items.length).toEqual(0);
	});
	test('Testing findUserByUserAndPass', async () => {
		const result = await findUserByUserAndPass('awu98', 'a1234567890!AA', conn);
		const target = 'awu98';
		expect(result[0].username).toEqual(target);
	});
	test('Testing findUserByUsername', async () => {
		const result = await findUserByUsername('awu98', conn);
		const target = 'awu98';
		expect(result[0].username).toEqual(target);
	});
	test('Testing deleteUserById', async () => {
		const user = await findUserByUsername('koalascope', conn);
		const result = await deleteUserById(user[0]._id.toString(), conn);
		const user2 = await findUserByUsername('koalascope', conn);
		const result2 = await deleteUserById(undefined, undefined);
		expect(result2).toEqual(false);
		expect(user2.length).toEqual(0);
	});
	test('Testing delUser', async () => {
		let user;
		const users = await getUsers(conn);
		for (let i = 0; i < users.length; i += 1) {
			user = users[i];
			let del = await delUser(user, conn);
		}
		const result = await getUsers(conn);
		const result2 = await delUser(undefined, undefined);
		expect(result2).toEqual(false);
		expect(result.length).toEqual(0);
	});
});
