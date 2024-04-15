const mongoose = require('mongoose');
const mockingoose = require('mockingoose');
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
const {
	addItem,
	findItemByName, 
	deleteItem
} = require('./item-services.tsx');
const UserSchema = require('./user.tsx');
const ItemSchema = require('./item.tsx');

let userModel: {
	findOneAndDelete: jest.Mock<any, any, any>; find: jest.Mock<any, any, any>; 
};

let itemModel: {
	findOneAndDelete: jest.Mock<any, any, any>; find: jest.Mock<any, any, any>; 
};

beforeAll(async () => {
	mongoose.set("debug", true);
	await mongoose.connect("mongodb+srv://awu98:inventoryUsers98@inventory.pen6xvt.mongodb.net/myInventory?retryWrites=true&w=majority&appName=Inventory", {
    useNewUrlParser: true, //useFindAndModify: false,
    useUnifiedTopology: true,
	});
	userModel = UserSchema;
	itemModel = ItemSchema;

});


afterAll(async () => {
    await mongoose.connection.close();
});

//describe('getUsers function', () => {
	
	//let conn: any;
	// beforeAll(async () => {
	// 	conn = await getDbConnection();
	// });
	// afterAll(async () => {
	// 	await mongoose.disconnect();
	// });
	test('Testing addUsers', async () => {
		const addedUser = 
			{
				_id: "6618ba4716c1fd15c725030c",
				firstName : "Victor",
				lastName : "Phan",
				email : "vphan98@gmail.com",
				country : "United States",
				state : "California",
				city : "SLO",
				zipcode : "93401",
				username : "liluzi",
				password : "a1234567890!AA"
			};
		const toBeAdded = {
			firstName : "Victor",
			lastName : "Phan",
			email : "vphan98@gmail.com",
			country : "United States",
			state : "California",
			city : "SLO",
			zipcode : "93401",
			username : "liluzi",
			password : "a1234567890!AA"
		};

		mockingoose(userModel).toReturn(addedUser, 'save');

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
		expect(result.password).toBe(toBeAdded.password);
		expect(result).toHaveProperty("_id");
	});
	test("Adding user -- failure path with invalid password", async () => {
		const dummyUser = {
			_id: "6618ba4716c1fd15c725030c",
			firstName : "Victor",
			lastName : "Phan",
			email : "vphan98@gmail.com",
			country : "United States",
			state : "California",
			city : "SLO",
			zipcode : "93401",
			username : "liluzi",
			password : "a123456789AA"
		};
	  
		mockingoose(userModel).toReturn(false, 'save');
	  
		const result = await addUser(dummyUser);
		expect(result).toEqual({"error": true, "message": "Error: Password must be 10 characters long, have a special character, uppercase character, and a number"});
	  });
	test("Adding user -- failure path with no lastname", async () => {
		const dummyUser = {
			_id: "6618ba4716c1fd15c725030c",
			firstName : "Victor",
			email : "vphan98@gmail.com",
			country : "United States",
			state : "California",
			city : "SLO",
			zipcode : "93401",
			username : "liluzi",
			password : "a1234567890!AA"
		};
	  
		mockingoose(userModel).toReturn(false, 'save');
	  
		const result = await addUser(dummyUser);
		expect(result.error).toBe(true);
		expect(result.message.lastName).toBeDefined();
	});
	test('Testing getUsers to get all users', async () => {
		//Mocking up the mongoose find() call
		userModel.find = jest.fn().mockResolvedValue([]);

		// That function depends on the mongoose find() function that's mocked
		const users = await getUsers();
	  
		expect(users).toBeDefined();
		expect(users.length).toBeGreaterThanOrEqual(0);
	  
		// Mock-related assertions
		expect(userModel.find.mock.calls.length).toBe(1);
		expect(userModel.find).toHaveBeenCalledWith();
	});
	test('Testing findUserById', async () => {
		const testUser = [{
			_id: "6618ba4716c1fd15c725030c",
			firstName : "Victor",
			lastName : "Phan",
			email : "vphan98@gmail.com",
			country : "United States",
			state : "California",
			city : "SLO",
			zipcode : "93401",
			username : "liluzi",
			password : "a1234567890!AA"
		}, {
			_id: "6618ba4716c1fd15c7238dg3",
			firstName : "LeBron",
			lastName : "James",
			email : "mysunshine@gmail.com",
			country : "United States",
			state : "California",
			city : "Lebronto",
			zipcode : "93401",
			username : "liluzi",
			password : "a1234567890!AA"
		}];

		userModel.find = jest.fn().mockResolvedValue(testUser);

  		const target = "liluzi";
  		const result = await findUserById("liluzi");

  		expect(result).toBeDefined();
  		expect(result.length).toBeGreaterThan(0);
  		result.forEach((user: { username: any; }) => expect(user.username).toBe(target));

  		// Mock-related assertions
  		expect(userModel.find.mock.calls.length).toBe(1);
  		expect(userModel.find).toHaveBeenCalledWith({username: target});
	});
	test('Testing addItemToUser', async () => {
		const user = await findUserByUsername('liluzi');

		console.log(user);
		//const ItemModel = conn.model('Item', ItemSchema);
		const addedItem = await addItem({
			userId: user[0]._id,
			name: 'steak',
			quantity: 5,
			_id: new mongoose.Types.ObjectId("6618ba4716c1fd15c725030c"),
		});

		//Use mockingoose
		mockingoose(itemModel).toReturn(addedItem, 'save');


		const itemAdded = await addItemToUser(user[0]._id, addedItem._id);
		console.log("")
		expect(itemAdded).toBeDefined();

		console.log("User is", user);
		console.log("User Item is", user[0].items);

		const updatedUser = await findUserByUsername('liluzi');

		expect(updatedUser[0].items.length).toBeGreaterThanOrEqual(0);
		
		//console.log(updatedUser);
		const res = await deleteItem('6618ba4716c1fd15c725030c');

	});/** 
	test('Testing getItemFromUser', async () => {
		const user = await findUserByUsername('awu98');
		//const ItemModel = conn.model('Item', ItemSchema);
		await ItemSchema.create({
			userId: user[0]._id.toString(),
			name: 'Toe',
			quantity: 3,
			_id: new mongoose.Types.ObjectId('65ef409a0336b57ddfbe9ce3'),
		});
		const result = getItemFromUser(
			user[0]._id.toString(),
			'65ef409a0336b57ddfbe9ce3'
		);
		const res = await deleteItem('65ef409a0336b57ddfbe9ce3');
		expect(result).toBeDefined();
	});
	test('Testing updateItemFromUser (ADD)', async () => {
		const user = await findUserByUsername('awu98');
		//const ItemModel = conn.model('Item', ItemSchema);
		await ItemSchema.create({
			userId: user[0]._id.toString(),
			name: 'Toe',
			quantity: 3,
			_id: new mongoose.Types.ObjectId('65ef409a0336b57ddfbe9ce3'),
		});
		const item = await findItemByName('Toe');
		const target = item[0].quantity;
		const update = await updateItemFromUser(
			user[0]._id.toString(),
			'65ef409a0336b57ddfbe9ce3',
			1,
			'add'
		);
		const result = await findItemByName('Toe');
		const res = await deleteItem('65ef409a0336b57ddfbe9ce3');
		expect(result[0].quantity).toBeGreaterThan(target);
	});
	test('Testing updateItemFromUser (SUB)', async () => {
		const user = await findUserByUsername('awu98');
		//const ItemModel = conn.model('Item', ItemSchema);
		await ItemSchema.create({
			userId: user[0]._id.toString(),
			name: 'Toe',
			quantity: 3,
			_id: new mongoose.Types.ObjectId('65ef409a0336b57ddfbe9ce3'),
		});
		const item = await findItemByName('Toe');
		const target = item[0].quantity;
		const update = await updateItemFromUser(
			user[0]._id.toString(),
			'65ef409a0336b57ddfbe9ce3',
			1,
			'sub'
		);
		const result = await findItemByName('Toe');
		const update2 = await updateItemFromUser(
			user[0]._id.toString(),
			'65ef409a0336b57ddfbe9ce3',
			3,
			'sub',
			
		);
		expect(update2).toBeDefined();
		expect(result[0].quantity).toBeLessThan(target);
	});
	test('Testing deleteItemFromUser', async () => {
		const user = await findUserByUsername('awu98');
		//const ItemModel = conn.model('Item', ItemSchema);
		await ItemSchema.create({
			userId: user[0]._id.toString(),
			name: 'Toe',
			quantity: 3,
			_id: new mongoose.Types.ObjectId('65ef409a0336b57ddfbe9ce3'),
		});
		const result = await deleteItemFromUser(
			user[0]._id.toString(),
			'65ef409a0336b57ddfbe9ce3',
			
		);
		const updatedUser = await findUserByUsername('awu98');
		console.log(updatedUser);
		const res = await deleteItem('65ef409a0336b57ddfbe9ce3');
		expect(updatedUser[0].items.length).toEqual(0);
	});**/
	test('Testing findUserByUserAndPass', async () => {
		const testUser = [{
			_id: "6618ba4716c1fd15c725030c",
			firstName : "Victor",
			lastName : "Phan",
			email : "vphan98@gmail.com",
			country : "United States",
			state : "California",
			city : "SLO",
			zipcode : "93401",
			username : "liluzi",
			password : "a1234567890!AA"
		}, {
			_id: "6618ba4716c1fd15c725030c",
			firstName : "LeBron",
			lastName : "James",
			email : "mysunshine@gmail.com",
			country : "United States",
			state : "California",
			city : "Lebronto",
			zipcode : "93401",
			username : "liluzi",
			password : "a1234567890!AA"
		}];

		userModel.find = jest.fn().mockResolvedValue(testUser);

  		const targetUser = "liluzi";
		const targetPass = "a1234567890!AA";
  		const result = await findUserByUserAndPass("liluzi", "a1234567890!AA");

  		expect(result).toBeDefined();
  		expect(result.length).toBeGreaterThan(0);
  		result.forEach((user: { username: any; }) => expect(user.username).toBe(targetUser));
  		result.forEach((user: { password: any; }) => expect(user.password).toBe(targetPass));

  		// Mock-related assertions
  		expect(userModel.find.mock.calls.length).toBe(1);
  		expect(userModel.find).toHaveBeenCalledWith({username: targetUser, password: targetPass});
	});
	test('Testing findUserByUsername', async () => {
		const testUser = [{
			_id: "6618ba4716c1fd15c725030c",
			firstName : "Victor",
			lastName : "Phan",
			email : "vphan98@gmail.com",
			country : "United States",
			state : "California",
			city : "SLO",
			zipcode : "93401",
			username : "liluzi",
			password : "a1234567890!AA"
		}, {
			_id: "6618ba4716c1fd15c725030c",
			firstName : "LeBron",
			lastName : "James",
			email : "mysunshine@gmail.com",
			country : "United States",
			state : "California",
			city : "Lebronto",
			zipcode : "93401",
			username : "liluzi",
			password : "a1234567890!AA"
		}];

		userModel.find = jest.fn().mockResolvedValue(testUser);

  		const target = "liluzi";
  		const result = await findUserByUsername("liluzi");

  		expect(result).toBeDefined();
  		expect(result.length).toBeGreaterThan(0);
  		result.forEach((user: { username: any; }) => expect(user.username).toBe(target));

  		// Mock-related assertions
  		expect(userModel.find.mock.calls.length).toBe(1);
  		expect(userModel.find).toHaveBeenCalledWith({username: target});
	});
	test('Testing deleteUserById', async () => {
		const addedUser = 
			{
				firstName : "Kevin",
				lastName : "Durant",
				email : "snake@gmail.com",
				country : "United States",
				state : "California",
				city : "LA",
				zipcode : "93401",
				username : "grimReaper",
				password : "a1234567890!LOL"
			};
		
		mockingoose(userModel).toReturn(addedUser, 'save');

		const testAddUser = await addUser(addedUser);

		const testUser={
			_id: testAddUser._id,
			firstName : "Kevin",
			lastName : "Durant",
			email : "snake@gmail.com",
			country : "United States",
			state : "California",
			city : "LA",
			zipcode : "93401",
			username : "grimReaper",
			password : "a1234567890!LOL"
	}

		userModel.find = jest.fn().mockResolvedValue(testUser);
		const user = await findUserByUsername('grimReaper');
		const userId = user._id;
		userModel.findOneAndDelete = jest.fn().mockResolvedValue(userId);

  		const deleteResult = await deleteUserById(userId);
  		expect(deleteResult).toBeTruthy();
		//console.log(userId)		

		expect(userModel.findOneAndDelete.mock.calls.length).toBe(1);
		expect(userModel.findOneAndDelete).toHaveBeenCalledWith({ _id: userId}, undefined, undefined);  
	});
	test('Testing delUser', async () => {
		const dummyUser = {
			_id: "6618ba4716c1fd15c725030c",
			firstName : "Victor",
			lastName: "Phan",
			email : "vphan98@gmail.com",
			country : "United States",
			state : "California",
			city : "SLO",
			zipcode : "93401",
			username : "liluzi",
			password : "a1234567890!AA"
		};

		mockingoose(userModel).toReturn(dummyUser, 'save');

		const result = await addUser(dummyUser);

		userModel.findOneAndDelete = jest.fn().mockResolvedValue(dummyUser);

  		const deleteResult = await delUser(dummyUser);
  		expect(deleteResult).toBeTruthy();
  		expect(userModel.findOneAndDelete.mock.calls.length).toBe(0);
	});
//});
