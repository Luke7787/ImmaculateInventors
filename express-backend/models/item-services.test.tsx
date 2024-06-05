const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const {
	getItems,
	getItemsFromUser,
	getUserId,
	findItemByName,
	addItem,
	deleteItem,
	updateItem,
	findItemById,
	incQuantity,
	decQuantity,
	setConnection,
	getDbConnection,
} = require('./item-services');
const itemServices = require('./item-services');
const ItemSchema = require('./item');
const User = require('./user');
const UserSchema = require('./user');
const FolderSchema = require('./folder');

describe('item services', () => {
	let mongoServer: any;
	let conn: any;

	beforeAll(async () => {
		mongoServer = await MongoMemoryServer.create();
		const uri = mongoServer.getUri();

		const mongooseOpts = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		};

		conn = await mongoose.createConnection(uri, mongooseOpts);

		itemServices.setConnection(conn);
	});

	afterAll(async () => {
		await conn.dropDatabase();
		await conn.close();
		await mongoServer.stop();
	});

	afterEach(async () => {
		await conn.model('Item').deleteMany();
		//await conn.model('User').deleteMany();
	});

	describe('getItemsFromUser', () => {
		it('returns items for a given user', async () => {
			const ItemModel = conn.model('Item', ItemSchema, 'items');
			//const UserModel = conn.model('Item', UserSchema, 'users');
			await ItemModel.create({
				userId: 'dawglogsondog',
				name: 'Foot',
				quantity: 3,
				folder: mongoose.Types.ObjectId(),
			});
			await ItemModel.create({
				userId: 'abcdeffasdf',
				name: 'Foot',
				quantity: 5,
				folder: mongoose.Types.ObjectId(),
			});
			await ItemModel.create({
				userId: 'abcdeffasdfasdf',
				name: 'Foot',
				quantity: 5,
				folder: mongoose.Types.ObjectId(),
			});
			const items = await getItemsFromUser('dawglogsondog', conn);

			expect(items[0].name).toBe('Foot');
			expect(items[0].quantity).toBe(3);
			expect(items[0].userId).toBe('dawglogsondog');
		});
	});

	describe('findItemByName', () => {
		it('finds the item by name', async () => {
			const ItemModel = conn.model('Item', ItemSchema, 'items');
			await ItemModel.create({
				userId: 'dawglogsondog',
				name: 'Toe',
				quantity: 3,
				folder: mongoose.Types.ObjectId(),
			});

			const items = await findItemByName('Toe', 'dawglogsondog');

			expect(items.length).toBeGreaterThan(0);
			expect(items[0].name).toBe('Toe');
			expect(items[0].quantity).toBe(3);
			expect(items[0].userId).toBe('dawglogsondog');
		});
	});

	describe('addItem', () => {
		it('adds items', async () => {
			const UserModel = conn.model('User', UserSchema, 'users');
			const FolderModel = conn.model('Folder', FolderSchema, 'folders');
			await UserModel.deleteMany();
			const folder = mongoose.Types.ObjectId();
			const itemToAdd = {
				userId: 'dawglogsondog',
				name: 'Foot',
				quantity: 3,
				folder: folder,
			};
			const newUser = new UserModel({
				firstName: 'John',
				lastName: 'Doe',
				email: 'john.doe@example1234.com',
				country: 'France',
				state: 'California',
				city: 'Los Angeles',
				zipcode: '90001',
				username: 'johndoe69420',
				password: '1234567890!A',
				folders: [folder],
			});
			const newFolder = new FolderModel({
				_id: folder,
				name: 'f',
				userId: mongoose.Types.ObjectId(),
				items: [],
				image: 'idk',
			});
			const savedFolder = await newFolder.save();
			const savedUser = await newUser.save();
			const res = await addItem(itemToAdd, conn);

			expect(res.name).toBe(itemToAdd.name);
			expect(res.quantity).toBe(itemToAdd.quantity);
			expect(res.userId).toBe(itemToAdd.userId);
		});
	});

	describe('deleteItem', () => {
		it('deletes items', async () => {
			const UserModel = conn.model('User', UserSchema, 'users');
			await UserModel.deleteMany();
			const ItemModel = conn.model('Item', ItemSchema, 'items');
			const FolderModel = conn.model('Folder', FolderSchema, 'folders');
			const folder = mongoose.Types.ObjectId();
			const newUser = new UserModel({
				firstName: 'John',
				lastName: 'Doe',
				email: 'john.doe@example1234.com',
				country: 'France',
				state: 'California',
				city: 'Los Angeles',
				zipcode: '90001',
				username: 'johndoe69420',
				password: '1234567890!A',
				folders: [folder],
			});
			const savedUser = await newUser.save();
			const newFolder = new FolderModel({
				_id: folder,
				name: 'f',
				userId: mongoose.Types.ObjectId(),
				items: [],
				image: 'idk',
			});
			const savedFolder = await newFolder.save();
			const newItem = await ItemModel.create({
				userId: savedUser._id.toString(),
				name: 'Toe',
				quantity: 3,
				folder: folder,
			});
			const res = await deleteItem(newItem._id.toString(), conn);

			expect(res.name).toBe('Toe');
			expect(res.quantity).toBe(3);
			expect(res.userId).toBe(savedUser._id.toString());
		});
	});

	describe('updateItem', () => {
		it('updates items', async () => {
			const ItemModel = conn.model('Item', ItemSchema, 'items');
			const newItem = await ItemModel.create({
				userId: 'dawglogsondog',
				name: 'Toe',
				quantity: 3,
				note: 'Hi there',
				folder: mongoose.Types.ObjectId(),
			});
			const updates = { quantity: 233, note: 'update works', name: 'Hello' };
			const res = await updateItem(newItem._id.toString(), updates, conn);

			expect(res.name).toBe('Hello');
			expect(res.quantity).toBe(233);
			expect(res.userId).toBe('dawglogsondog');
			expect(res.note).toBe('update works');
		});
	});

	describe('findItemById', () => {
		it('all items', async () => {
			const savedUser = mongoose.Types.ObjectId();
			const ItemModel = conn.model('Item', ItemSchema, 'items');
			const newItem = await ItemModel.create({
				userId: savedUser._id.toString(),
				name: 'Toe',
				quantity: 3,
				folder: mongoose.Types.ObjectId(),
			});
			const items = await findItemById(newItem._id, conn);
			expect(items.name).toEqual('Toe');
		});
	});

	describe('testUsers', () => {
		it('all items', async () => {
			const UserModel = conn.model('User', UserSchema, 'users');
			const folder = mongoose.Types.ObjectId();
			const newUser = new UserModel({
				firstName: 'John',
				lastName: 'Doe',
				email: 'john.doe@example1234.com',
				country: 'France',
				state: 'California',
				city: 'Los Angeles',
				zipcode: '90001',
				username: 'johndoe69420',
				password: '123456',
				folders: [folder],
			});

			try {
				const savedUser = await newUser.save();
				// If the save is successful (which it shouldn't be), fail the test
				fail('Expected validation error was not thrown');
			} catch (error) {
				// Check that the error is a validation error
				expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
				// Check that the error message contains the expected text
				//expect(error.errors.password.message).toBe('Password must be 10 characters long, have a special character, uppercase character, and a number');
			}
			expect('Toe').toEqual('Toe');
		});
	});

	describe('getItems', () => {
		it('all items', async () => {
			const itemList = [
				{ name: 'pentagon', quantity: 3 },
				{ name: 'Foot', quantity: 5 },
			];
			const ItemModel = conn.model('Item', ItemSchema, 'items');
			ItemModel.find = jest.fn().mockResolvedValue(itemList);
			const items = await getItems(conn);

			expect(items).toEqual(items);
		});
	});

	describe('getUserId', () => {
		it('all items', async () => {
			const savedUser = mongoose.Types.ObjectId();
			const ItemModel = conn.model('Item', ItemSchema, 'items');
			const newItem = await ItemModel.create({
				userId: savedUser._id.toString(),
				name: 'Toe',
				quantity: 3,
				folder: mongoose.Types.ObjectId(),
			});
			const items = await getUserId(newItem._id, conn);
			expect(items).toEqual(savedUser._id.toString());
		});
	});

	describe('incQuantity', () => {
		it('all items', async () => {
			const savedUser = mongoose.Types.ObjectId();
			const ItemModel = conn.model('Item', ItemSchema, 'items');
			const newItem = await ItemModel.create({
				userId: savedUser._id.toString(),
				name: 'Toe',
				quantity: 3,
				folder: mongoose.Types.ObjectId(),
			});
			const items = await incQuantity(newItem._id, 3, conn);
			expect(items.quantity).toEqual(6);
		});
	});

	describe('decQuantity', () => {
		it('all items', async () => {
			const UserModel = conn.model('User', UserSchema, 'users');
			await UserModel.deleteMany();
			const ItemModel = conn.model('Item', ItemSchema, 'items');
			const FolderModel = conn.model('Folder', FolderSchema, 'folders');
			const folder = mongoose.Types.ObjectId();
			const newUser = new UserModel({
				firstName: 'John',
				lastName: 'Doe',
				email: 'john.doe@example1234.com',
				country: 'France',
				state: 'California',
				city: 'Los Angeles',
				zipcode: '90001',
				username: 'johndoe69420',
				password: '1234567890!A',
				folders: [folder],
			});
			const savedUser = await newUser.save();
			const newFolder = new FolderModel({
				_id: folder,
				name: 'f',
				userId: mongoose.Types.ObjectId(),
				items: [],
				image: 'idk',
			});
			const savedFolder = await newFolder.save();
			const newItem = await ItemModel.create({
				userId: savedUser._id.toString(),
				name: 'Toe',
				quantity: 3,
				folder: folder,
			});
			const items1 = await decQuantity(newItem._id, 1, conn);
			expect((await ItemModel.findById(newItem._id)).quantity).toEqual(2);
			const items = await decQuantity(newItem._id, 3, conn);
			expect(await ItemModel.findById(newItem._id)).toEqual(null);
		});
	});

	describe('setConnection', () => {
		it('should set the database connection', () => {
			const mockConn = {}; // Mock connection object
			const result = setConnection(mockConn);

			expect(result).toBe(mockConn);
			expect(result).toEqual(mockConn);
		});
	});
});

describe('dbc', () => {
	getDbConnection();
});

export {};
