// import mongoose from 'mongoose';
// const mockingoose = require('mockingoose');

// const {
// 	getItems,
// 	getItemsFromUser,
// 	getDbConnection,
// 	deleteItem,
// 	addItem,
// 	findItemByName,
// 	updateItem,
// } = require('./item-services.tsx');
// const ItemSchema = require('./item.tsx');

// describe('item services', () => {
// 	beforeEach(() => {
// 		jest.clearAllMocks();
// 		mockingoose.resetAll();
// 	});
// 	let conn: any;
// 	beforeAll(async () => {
// 		conn = await getDbConnection();
// 		mongoose.model = jest.fn().mockReturnValue(ItemSchema);
// 	});
// 	afterAll(async () => {
// 		jest.clearAllMocks();
// 		mockingoose.resetAll();
// 		await mongoose.disconnect();
// 		await mongoose.connection.close();
// 	});
// });

// // 	describe('getItemsFromUser', () => {
// // 		it('returns items for a given user', async () => {
// // 			const ItemModel = conn.model('Item', ItemSchema);
// // 			await ItemModel.create({
// // 				userId: 'dawglogsondog',
// // 				name: 'Foot',
// // 				quantity: 3,
// // 			});
// // 			await ItemModel.create({
// // 				userId: 'abcdeffasdf',
// // 				name: 'Foot',
// // 				quantity: 5,
// // 			});
// // 			await ItemModel.create({
// // 				userId: 'abcdeffasdfasdf',
// // 				name: 'Foot',
// // 				quantity: 5,
// // 			});
// // 			const items = await getItemsFromUser('dawglogsondog', conn);
// // 			await ItemModel.findOneAndRemove({
// // 				userId: 'abcdeffasdfasdf',
// // 				name: 'Foot',
// // 				quantity: 5,
// // 			});
// // 			await ItemModel.findOneAndRemove({
// // 				userId: 'abcdeffasdf',
// // 				name: 'Foot',
// // 				quantity: 5,
// // 			});
// // 			await ItemModel.findOneAndRemove({
// // 				userId: 'dawglogsondog',
// // 				name: 'Foot',
// // 				quantity: 3,
// // 			});

// // 			expect(items[0].name).toBe('Foot');
// // 			expect(items[0].quantity).toBe(3);
// // 			expect(items[0].userId).toBe('dawglogsondog');
// // 		});
// // 	});
// // 	describe('findItemByName', () => {
// // 		it('finds the item by name', async () => {
// // 			const ItemModel = conn.model('Item', ItemSchema);
// // 			await ItemModel.create({
// // 				userId: 'dawglogsondog',
// // 				name: 'Toe',
// // 				quantity: 3,
// // 			});
// // 			await ItemModel.create({
// // 				userId: 'abcdeffasdf',
// // 				name: 'Foot',
// // 				quantity: 5,
// // 			});
// // 			await ItemModel.create({
// // 				userId: 'abcdeffasdfasdf',
// // 				name: 'Foot',
// // 				quantity: 5,
// // 			});
// // 			const items = await findItemByName('Toe', conn);
// // 			await ItemModel.findOneAndRemove({
// // 				userId: 'abcdeffasdfasdf',
// // 				name: 'Foot',
// // 				quantity: 5,
// // 			});
// // 			await ItemModel.findOneAndRemove({
// // 				userId: 'abcdeffasdf',
// // 				name: 'Foot',
// // 				quantity: 5,
// // 			});
// // 			await ItemModel.findOneAndRemove({
// // 				userId: 'dawglogsondog',
// // 				name: 'Toe',
// // 				quantity: 3,
// // 			});

// // 			expect(items[0].name).toBe('Toe');
// // 			expect(items[0].quantity).toBe(3);
// // 			expect(items[0].userId).toBe('dawglogsondog');
// // 		});
// // 	});
// // 	describe('addItem', () => {
// // 		it('adds items', async () => {
// // 			const ItemModel = conn.model('Item', ItemSchema);
// // 			const itemToAdd = { userId: 'dawglogsondog', name: 'Foot', quantity: 3 };
// // 			const res = await addItem(itemToAdd, conn);

// // 			expect(res.name).toBe(itemToAdd.name);
// // 			expect(res.quantity).toBe(itemToAdd.quantity);
// // 			expect(res.userId).toBe(itemToAdd.userId);
// // 			await ItemModel.findOneAndRemove(itemToAdd);
// // 		});
// // 	});
// // 	describe('deleteItem', () => {
// // 		it('deletes items', async () => {
// // 			const ItemModel = conn.model('Item', ItemSchema);
// // 			await ItemModel.create({
// // 				userId: 'dawglogsondog',
// // 				name: 'Toe',
// // 				quantity: 3,
// // 				_id: new mongoose.Types.ObjectId('65ef409a0336b57ddfbe9ce3'),
// // 			});
// // 			const res = await deleteItem('65ef409a0336b57ddfbe9ce3', conn);

// // 			expect(res.name).toBe('Toe');
// // 			expect(res.quantity).toBe(3);
// // 			expect(res.userId).toBe('dawglogsondog');
// // 		});
// // 	});
// // 	describe('updateItem', () => {
// // 		it('updates items', async () => {
// // 			const ItemModel = conn.model('Item', ItemSchema);
// // 			await ItemModel.create({
// // 				userId: 'dawglogsondog',
// // 				name: 'Toe',
// // 				quantity: 3,
// // 				note: 'Hi there',
// // 				_id: new mongoose.Types.ObjectId('65ef409a0336b57ddfbe9ce3'),
// // 			});
// // 			const updates = {
// // 				quantity: 233,
// // 				note: 'update worasdfasdfks',
// // 				name: 'Hello',
// // 			};
// // 			const res = await updateItem('65ef409a0336b57ddfbe9ce3', updates, conn);

// // 			expect(res.name).toBe('Hello');
// // 			expect(res.quantity).toBe(233);
// // 			expect(res.userId).toBe('dawglogsondog');
// // 			expect(res.note).toBe('update worasdfasdfks');
// // 			await ItemModel.findOneAndRemove({
// // 				userId: 'dawglogsondog',
// // 				name: 'Hello',
// // 				quantity: 233,
// // 			});
// // 		});
// // 	});

// // 	describe('getItems', () => {
// // 		it('all items', async () => {
// // 			const itemList = [
// // 				{
// // 					name: 'pentagon',
// // 					quantity: 3,
// // 				},
// // 				{
// // 					name: 'Foot',
// // 					quantity: 5,
// // 				},
// // 			];
// // 			const ItemModel = conn.model('Item', ItemSchema);
// // 			ItemModel.find = jest.fn().mockResolvedValueOnce(itemList);
// // 			const items = await getItems(conn);
// // 			expect(items).toEqual(itemList);
// // 		});
// // 	});
// // });

// // export {};
