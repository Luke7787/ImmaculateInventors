const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const bcryptTest = require('bcrypt');

const {
	getUsers,
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
	getFolders,
	addFolder,
	getFolderContents,
	deleteFolder,
	addItemToFolder,
	deleteItemFromFolder,
	updateFolderName,
	sortByQuantityAsc,
	sortByQuantityDes,
	sortByDateAsc,
	sortByDateDes,
	sortByNameAsc,
	sortByNameDes,
} = require('./user-services.tsx');
const UserSchema = require('./user.tsx');
const ItemSchema = require('./item.tsx');
const FolderSchema = require('./folder.tsx');

describe('user services', () => {
	let mongoServer: any;
	let conn: any;
	let ItemModel: any;
	let UserModel: any;
	let FolderModel: any;

	beforeAll(async () => {
		mongoServer = await MongoMemoryServer.create();
		const mongooseOpts = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		};
		conn = await mongoose.createConnection(
			'mongodb+srv://awu98:inventoryUsers98@inventory.pen6xvt.mongodb.net/myInventory?retryWrites=true&w=majority&appName=Inventory',
			mongooseOpts
		);
		ItemModel = conn.model('Item', ItemSchema, 'items');
		UserModel = conn.model('User', UserSchema, 'users');
		FolderModel = conn.model('Folder', FolderSchema, 'folders');
	});

	afterAll(async () => {
		await conn.dropDatabase();
		await conn.close();
		await mongoServer.stop();
	});

	afterEach(async () => {
		await ItemModel.deleteMany();
		//await UserModel.deleteMany();
		//await FolderModel.deleteMany();
	});

	describe('UserSchema', () => {
		it('should create a new user with all required fields', async () => {
			const user = new UserModel({
				firstName: 'John',
				lastName: 'Doe',
				email: 'john.doe@example.com',
				country: 'United States',
				state: 'California',
				city: 'Los Angeles',
				zipcode: '90001',
				username: 'johndoe',
				password: 'Password123!@#',
			});

			const savedUser = await user.save();

			expect(savedUser).toHaveProperty('_id');
			expect(savedUser.firstName).toBe(user.firstName);
			expect(savedUser.lastName).toBe(user.lastName);
			expect(savedUser.email).toBe(user.email);
			expect(savedUser.country).toBe(user.country);
			expect(savedUser.state).toBe(user.state);
			expect(savedUser.city).toBe(user.city);
			expect(savedUser.zipcode).toBe(user.zipcode);
			expect(savedUser.username).toBe(user.username);
			expect(savedUser.password).not.toBe('Password123!@#'); // Password should be hashed
		});

		it('should not create a user with an invalid password', async () => {
			const user2 = new UserModel({
				firstName: 'John',
				lastName: 'Doe',
				email: 'john.doe@example.com',
				country: 'United States',
				state: 'California',
				city: 'Los Angeles',
				zipcode: '90001',
				username: 'johndoe',
				password: 'invalid',
			});

			await expect(user2.save()).rejects.toThrow(
				'Error: Password must be 10 characters long, have a special character, uppercase character, and a number'
			);
		});

		it('should not create a user with a duplicate email', async () => {
			const user3 = new UserModel({
				firstName: 'John',
				lastName: 'Doe',
				email: 'john.doe@example.com',
				country: 'United States',
				state: 'California',
				city: 'Los Angeles',
				zipcode: '90001',
				username: 'johndoe',
				password: 'Password123!@#',
			});

			await expect(user3.save()).rejects.toThrow('E11000 duplicate key error');
		});

		it('should hash the password before saving', async () => {
			const user4 = new UserModel({
				firstName: 'John',
				lastName: 'Doe',
				email: 'john.dofae@example.com',
				country: 'United States',
				state: 'California',
				city: 'Los Angeles',
				zipcode: '90001',
				username: 'johndoe',
				password: 'Password123!@#',
			});

			const savedUser = await user4.save();

			expect(savedUser.password).not.toBe('Password123!@#');
		});
	});

	describe('addUser', () => {
		test('Testing addUsers', async () => {
			const toBeAdded = {
				firstName: 'Victor',
				lastName: 'Phan',
				email: 'vphan98@gmail.com',
				country: 'United States',
				state: 'California',
				city: 'SLO',
				zipcode: '93401',
				username: 'liluzi',
				password: 'a1234567890!AA',
			};

			const result = await addUser(toBeAdded);

			expect(result).toBeTruthy();
			expect(result.firstName).toBe(toBeAdded.firstName);
			expect(result.lastName).toBe(toBeAdded.lastName);
			expect(result.email).toBe(toBeAdded.email);
			expect(result.country).toBe(toBeAdded.country);
			expect(result.state).toBe(toBeAdded.state);
			expect(result.city).toBe(toBeAdded.city);
			expect(result.zipcode).toBe(toBeAdded.zipcode);
			expect(result.username).toBe(toBeAdded.username);
			expect(result.password).not.toBe(toBeAdded.password);
			expect(result).toHaveProperty('_id');
		});

		test('Adding user -- failure path with invalid password', async () => {
			const dummyUser = {
				_id: '6618ba4716c1fd15c725030c',
				firstName: 'Victor',
				lastName: 'Phan',
				email: 'vphan98@gmail.com',
				country: 'United States',
				state: 'California',
				city: 'SLO',
				zipcode: '93401',
				username: 'liluzi',
				password: 'a123456789AA',
			};

			try {
				const result = await addUser(dummyUser);
			} catch (error) {
				expect(error).toEqual({
					error: true,
					message:
						'Error: Password must be 10 characters long, have a special character, uppercase character, and a number',
				});
			}
		});

		test('Adding user -- failure path with no lastname', async () => {
			const dummyUser = {
				_id: '6618ba4716c1fd15c725030c',
				firstName: 'Victor',
				email: 'vphan98@gmail.com',
				country: 'United States',
				state: 'California',
				city: 'SLO',
				zipcode: '93401',
				username: 'liluzi',
				password: 'a1234567890!AA',
			};

			try {
				const result = await addUser(dummyUser);
			} catch (error: any) {
				expect(error.error).toBe(true);
				expect(error.message.lastName).toBeDefined();
			}
		});
	});

	describe('getUsers', () => {
		test('Testing getUsers to get all users', async () => {
			const user1 = new UserModel({
				firstName: 'Victor',
				lastName: 'Phan',
				email: 'vphan0809@gmail.com',
				country: 'United States',
				state: 'California',
				city: 'SLO',
				zipcode: '93401',
				username: 'liluzi',
				password: 'a1234567890!AA',
			});
			const user2 = new UserModel({
				firstName: 'John',
				lastName: 'Doe',
				email: 'john.doe2@example.com',
				country: 'United States',
				state: 'New York',
				city: 'New York',
				zipcode: '10001',
				username: 'johndoe',
				password: 'Password123!@#',
			});

			await user1.save();
			await user2.save();

			const result = await getUsers();

			expect(result).toBeDefined();
			expect(result.length).toBeGreaterThanOrEqual(2);
		});
	});

	// ... (previous code)

	describe('findUserById', () => {
		test('Testing findUserById', async () => {
			const user = new UserModel({
				firstName: 'Victor',
				lastName: 'Phan',
				email: 'vphan1975@gmail.com',
				country: 'United States',
				state: 'California',
				city: 'SLO',
				zipcode: '93401',
				username: 'liluzi',
				password: 'a1234567890!AA',
			});
			const savedUser = await user.save();
			const userId = savedUser.username;

			const result = await findUserById(userId);

			expect(result).toBeDefined();
		});
	});

	describe('addItemToUser', () => {
		test('Testing addItemToUser', async () => {
			const user = new UserModel({
				firstName: 'Victor',
				lastName: 'Phan',
				email: 'vphan9800@gmail.com',
				country: 'United States',
				state: 'California',
				city: 'SLO',
				zipcode: '93401',
				username: 'liluzi',
				password: 'a1234567890!AA',
			});
			const savedUser = await user.save();
			const userId = savedUser._id;

			const item = new ItemModel({
				userId: userId,
				name: 'Item 1',
				quantity: 3,
				folder: mongoose.Types.ObjectId(),
			});
			const savedItem = await item.save();
			const itemId = savedItem._id;

			const result = await addItemToUser(userId, itemId);

			expect(result).toBeDefined();
			//expect(result.items).toContain(itemId.toString());
		});
	});

	describe('getItemFromUser', () => {
		test('Testing getItemFromUser', async () => {
			const user = new UserModel({
				firstName: 'Victor',
				lastName: 'Phan',
				email: 'vphan98000@gmail.com',
				country: 'United States',
				state: 'California',
				city: 'SLO',
				zipcode: '93401',
				username: 'liluzi',
				password: 'a1234567890!AA',
				items: [],
			});
			const savedUser = await user.save();
			const userId = savedUser._id;

			const item = new ItemModel({
				userId: userId,
				name: 'Item 1',
				quantity: 3,
				folder: mongoose.Types.ObjectId(),
			});
			const savedItem = await item.save();
			const itemId = savedItem._id;

			await addItemToUser(userId, itemId);

			const result = await getItemFromUser(userId, itemId);

			expect(result).toBeDefined();
			expect(result[0]._id).toEqual(itemId);
		});
	});

	describe('updateItemFromUser', () => {
		test('Testing updateItemFromUser (ADD)', async () => {
			const user = new UserModel({
				firstName: 'Victor',
				lastName: 'Phan',
				email: 'vphan980000@gmail.com',
				country: 'United States',
				state: 'California',
				city: 'SLO',
				zipcode: '93401',
				username: 'liluzi',
				password: 'a1234567890!AA',
				items: [],
			});
			const savedUser = await user.save();
			const userId = savedUser._id;

			const item = new ItemModel({
				userId: userId,
				name: 'Item 1',
				quantity: 5,
				folder: mongoose.Types.ObjectId(),
			});
			const savedItem = await item.save();
			const itemId = savedItem._id;

			await addItemToUser(userId, itemId);

			const result = await updateItemFromUser(userId, itemId, 1, 'add');

			expect(result).toBeDefined();
			expect(result.quantity).toBe(5);
		});

		test('Testing updateItemFromUser (SUB)', async () => {
			const user = new UserModel({
				firstName: 'Victor',
				lastName: 'Phan',
				email: 'vphan9800000@gmail.com',
				country: 'United States',
				state: 'California',
				city: 'SLO',
				zipcode: '93401',
				username: 'liluzi',
				password: 'a1234567890!AA',
				items: [],
			});
			const savedUser = await user.save();
			const userId = savedUser._id;

			const item = new ItemModel({
				userId: userId,
				name: 'Item 1',
				quantity: 5,
				folder: mongoose.Types.ObjectId(),
			});
			const savedItem = await item.save();
			const itemId = savedItem._id;

			await addItemToUser(userId, itemId);

			const result = await updateItemFromUser(userId, itemId, 1, 'sub');

			expect(result).toBeDefined();
			expect(result.quantity).toBe(5);
		});
	});

	describe('deleteItemFromUser', () => {
		test('Testing deleteItemFromUser', async () => {
			const user = new UserModel({
				firstName: 'Victor',
				lastName: 'Phan',
				email: 'vphan98000000@gmail.com',
				country: 'United States',
				state: 'California',
				city: 'SLO',
				zipcode: '93401',
				username: 'liluzi',
				password: 'a1234567890!AA',
				items: [],
			});
			const savedUser = await user.save();
			const userId = savedUser._id;

			const item = new ItemModel({
				userId: userId,
				name: 'Item 1',
				quantity: 3,
				folder: mongoose.Types.ObjectId(),
			});
			const savedItem = await item.save();
			const itemId = savedItem._id;

			await addItemToUser(userId, itemId);

			const result = await deleteItemFromUser(userId, itemId);

			expect(result).toBeDefined();
			expect(result.items).not.toContain(itemId.toString());
		});
	});

	describe('findUserByUsername', () => {
		test('Testing findUserByUsername', async () => {
			const username = 'liluzi';
			const user = new UserModel({
				firstName: 'Victor',
				lastName: 'Phan',
				email: 'vphan908@gmail.com',
				country: 'United States',
				state: 'California',
				city: 'SLO',
				zipcode: '93401',
				username: 'liluzi',
				password: 'a1234567890!AA',
			});
			await user.save();

			const result = await findUserByUsername(username);

			expect(result).toBeDefined();
			expect(result.username).toBe(username);
		});
	});

	describe('deleteUserById', () => {
		test('Testing deleteUserById', async () => {
			const user = new UserModel({
				firstName: 'Victor',
				lastName: 'Phan',
				email: 'vphan9008@gmail.com',
				country: 'United States',
				state: 'California',
				city: 'SLO',
				zipcode: '93401',
				username: 'liluzi',
				password: 'a1234567890!AA',
			});
			const savedUser = await user.save();
			const userId = savedUser._id;

			const result = await deleteUserById(userId);

			expect(result).toBeDefined();
			//expect("66604df608a86783547e07ab").toBeCloseTo(savedUser);
		});
	});

	describe('delUser', () => {
		test('Testing delUser', async () => {
			const user = new UserModel({
				firstName: 'Victor',
				lastName: 'Phan',
				email: 'vphan90008@gmail.com',
				country: 'United States',
				state: 'California',
				city: 'SLO',
				zipcode: '93401',
				username: 'liluzi',
				password: 'a1234567890!AA',
			});
			const savedUser = await user.save();

			const result = await delUser(user);

			expect(result).toBeDefined();
			//expect("66604df608a86783547e07af").toBeCloseTo(savedUser);
		});
	});

	describe('getFolders', () => {
		test('Testing getFolders', async () => {
			const userId = mongoose.Types.ObjectId();
			const folder1 = new FolderModel({
				name: 'Folder 1',
				userId: userId,
				items: [],
				image: 'image1.jpg',
			});
			const folder2 = new FolderModel({
				name: 'Folder 2',
				userId: userId,
				items: [],
				image: 'image2.jpg',
			});
			await folder1.save();
			await folder2.save();

			const result = await getFolders(userId);

			expect(result).toBeDefined();
			expect(result[0].userId).toEqual(userId);
			expect(result[1].userId).toEqual(userId);
		});
	});

	describe('addFolder', () => {
		test('Testing addFolder', async () => {
			const userId = mongoose.Types.ObjectId('666049d9147b05337b6b66cf');
			const folderName = 'New Folder';
			const imageUrl = 'image.jpg';

			const result = await addFolder(userId, folderName, imageUrl);

			expect(result).toBeDefined();
			//expect(result).toBeCloseTo(userId);
			//expect(result).toBe(userId);
		});
	});

	describe('getFolderContents', () => {
		test('Testing getFolderContents', async () => {
			const folderId = mongoose.Types.ObjectId();
			const item1 = new ItemModel({
				userId: mongoose.Types.ObjectId(),
				name: 'Item 1',
				quantity: 3,
				folder: folderId,
			});
			const item2 = new ItemModel({
				userId: mongoose.Types.ObjectId(),
				name: 'Item 2',
				quantity: 5,
				folder: folderId,
			});
			await item1.save();
			await item2.save();

			const result = await getFolderContents(folderId);

			expect(result).toBeDefined();
			expect(result[0].folder).toEqual(folderId);
			expect(result[1].folder).toEqual(folderId);
		});
	});

	describe('deleteFolder', () => {
		test('Testing deleteFolder', async () => {
			const userId = mongoose.Types.ObjectId();
			const folderName = 'Folder 1';
			const folder = new FolderModel({
				name: folderName,
				userId: userId,
				items: [],
				image: 'image.jpg',
			});
			const savedFolder = await folder.save();
			const folderId = savedFolder._id;

			const result = await deleteFolder(userId, folderName);

			expect(result).toBeDefined();
			const deletedFolder = await FolderModel.findById(folderId);
			expect(deletedFolder).toBeDefined;
		});
	});

	describe('addItemToFolder', () => {
		test('Testing addItemToFolder', async () => {
			const folderId = mongoose.Types.ObjectId();
			const folder = new FolderModel({
				name: 'Folder 1',
				userId: mongoose.Types.ObjectId(),
				items: [],
				image: 'image.jpg',
			});
			const savedFolder = await folder.save();

			const itemId = mongoose.Types.ObjectId();
			const item = new ItemModel({
				userId: mongoose.Types.ObjectId(),
				name: 'Item 1',
				quantity: 3,
				folder: null,
			});
			const savedItem = await item.save();

			const result = await addItemToFolder(folderId, itemId);

			expect(result).toBeDefined();
			expect(result).toBe(true);
			const updatedFolder = await FolderModel.findById(folderId);
			expect(updatedFolder.items).toContain(itemId);
			const updatedItem = await ItemModel.findById(itemId);
			expect(updatedItem.folder).toEqual(folderId);
		});
	});

	describe('deleteItemFromFolder', () => {
		test('Testing deleteItemFromFolder', async () => {
			const folderName = 'Folder 1';
			const folderId = mongoose.Types.ObjectId();
			const folder = new FolderModel({
				name: folderName,
				userId: mongoose.Types.ObjectId(),
				items: [],
				image: 'image.jpg',
			});
			const savedFolder = await folder.save();

			const itemId = mongoose.Types.ObjectId();
			const item = new ItemModel({
				userId: mongoose.Types.ObjectId(),
				name: 'Item 1',
				quantity: 3,
				folder: folderId,
			});
			const savedItem = await item.save();

			await addItemToFolder(folderId, itemId);

			const result = await deleteItemFromFolder(folderName, itemId);

			expect(result).toBeDefined();
			expect(result).toBe(true);
			const updatedFolder = await FolderModel.findById(folderId);
			//expect(updatedFolder.items).not.toContain(itemId);
			const updatedItem = await ItemModel.findById(itemId);
			expect(updatedItem).toBeNull();
		});
	});

	describe('updateFolderName', () => {
		test('Testing updateFolderName', async () => {
			const folderId = mongoose.Types.ObjectId();
			const folderName = 'Folder 1';
			const newName = 'New Folder Name';
			const folder = new FolderModel({
				name: folderName,
				userId: mongoose.Types.ObjectId(),
				items: [],
				image: 'image.jpg',
			});
			await folder.save();

			const result = await updateFolderName(folderId, newName);

			expect(result).toBeDefined();
			expect(result).toBe(true);
			const updatedFolder: any = await FolderModel.findById(folderId);
			//expect(updatedFolder.name).toBe(newName);
		});
	});

	describe('sortByQuantityAsc', () => {
		test('Testing sortByQuantityAsc', async () => {
			const folderId = mongoose.Types.ObjectId();
			const item1 = new ItemModel({
				userId: mongoose.Types.ObjectId(),
				name: 'Item 1',
				quantity: 5,
				folder: folderId,
			});
			const item2 = new ItemModel({
				userId: mongoose.Types.ObjectId(),
				name: 'Item 2',
				quantity: 3,
				folder: folderId,
			});
			await item1.save();
			await item2.save();

			const result = await sortByQuantityAsc(folderId);

			expect(result).toBeDefined();
			expect(result[0].quantity).toBeLessThanOrEqual(result[1].quantity);
		});
	});
});
