// @ts-ignore
const mongoose = require('mongoose');
// @ts-ignore
const UserSchema = require('./user.tsx');
// @ts-ignore
const ItemSchema = require('./item.tsx');
// @ts-ignore
const itemServices = require('./item-services.tsx');
const bcrypt = require('bcrypt');


let dbConnection;

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

async function getUsers(username, password) {
	const userModel = getDbConnection().model('User', UserSchema);
	let result;
	if (!username && !password) {
		result = await userModel.find();
	} else {
    //hash password and check if it's identical to actual password
    const hashpassword = bcrypt.hashSync(password, 10);
		result = await findUserByUserAndPass(username, hashpassword);
	}
	return result;
}
// TODO: Fix this issue
// function usernameUser(username) {
//   return users["users_list"].findIndex((user) => user["username"] === username);
// }

async function findUserById(id) {
	const userModel = getDbConnection().model('User', UserSchema);
	try {
		return await userModel.findUserByUsername(id);
	} catch (error) {
		console.log(error);
		return undefined;
	}
}

async function addUser(user) {
	// userModel is a Model, a subclass of mongoose.Model
	const userModel = getDbConnection().model('User', UserSchema);
	try {
        //hash password before adding into database
        const hashpassword = bcrypt.hashSync(user['password'], 10);
        user['password'] = hashpassword;


		// You can use a Model to create new documents using 'new' and
		// passing the JSON content of the Document:
		const userToAdd = new userModel(user);
		const savedUser = await userToAdd.save();
		return savedUser;
	} catch (error) {
		if (error.name == 'ValidationError') {
			const errorMessage = error.errors.password
				? error.errors.password.message
				: 'Validation failed'; //This truncates the error message to just be what is wanted -> Error: Password must be 5 or more characters long.
			console.log(errorMessage); //return the error message to handle it in response
			return { error: true, message: errorMessage };
		} else {
			console.log(error);
			return { error: true, message: 'An unexpected error occurred' };
		}

		// console.log(error);
		// return false;
	}
}

async function delUser(user) {
	const userModel = getDbConnection().model('User', UserSchema);
	try {
		await userModel.deleteOne(user);
		return true;
	} catch (err) {
		console.error(err);
		return false;
	}
}

async function addItemToUser(user_id, item_id) {
	// connect to user collection and item collection databases
	const UserModel = getDbConnection().model('User', UserSchema);
	const ItemModel = getDbConnection().model('Item', ItemSchema);
	// find user with matching id
	const user = await UserModel.findById(user_id);
	// initialize array for user items if it doesnt exist already
	user.items = [];
	if (user) console.log(user.username);
	const itemToAdd = await ItemModel.find({ _id: item_id });
	if (itemToAdd) console.log(item_id);
	//user.items.push({items: item_id});
	// push id onto item list of user
	const updatedUser = await UserModel.findByIdAndUpdate(user_id, {
		$push: { items: mongoose.Types.ObjectId(item_id) },
	});
	return updatedUser;
}

async function getItemFromUser(userId, itemId) {
	const UserModel = getDbConnection().model('User', UserSchema);
	const ItemModel = getDbConnection().model('Item', ItemSchema);
	const user = await UserModel.findById(userId);
	if (user) console.log(user.username);
	const userItem = await UserModel.find({ items: itemId });
	if (userItem) console.log('Item found');
	return await ItemModel.find({ _id: itemId });
}


async function deleteItemFromUser(userId, itemId) {
	const UserModel = getDbConnection().model('User', UserSchema);
	const ItemModel = getDbConnection().model('Item', ItemSchema);
	const user = await UserModel.findById(userId);
	if (user) console.log(user.username);
	const userItem = await UserModel.find({ items: itemId });
	if (userItem) console.log('Item found');
	const updatedUser = await UserModel.findByIdAndUpdate(userId, {
		$pull: { items: itemId },
	});
}

async function updateItemFromUser(userId, itemId, quantity, option) {
  const UserModel = getDbConnection().model("User", UserSchema);
  const ItemModel = getDbConnection().model("Item", ItemSchema);
  const user = await UserModel.findById(userId);
  if (option === "add") {
    const incItem = await ItemModel.findByIdAndUpdate(itemId, {
      $inc: {quantity: quantity}
    });
    return incItem
  } else {
    const tempItem = await ItemModel.findById(itemId)
    if (tempItem.quantity - quantity <= 0) {
      const updatedUser = await UserModel.findByIdAndUpdate(userId, {
        $pull: {items: itemId},
      })
      const delItem = await itemServices.deleteItem(itemId)
      return delItem;
    } else {
      const decItem = await ItemModel.findByIdAndUpdate(itemId, {
        $inc: {quantity: -quantity}
      });
      return decItem;
    }
  }
}


async function findUserByUsername(username) {
	const userModel = getDbConnection().model('User', UserSchema);
	return await userModel.find({ username: username });
}

async function findUserBypassword(password) {
	const userModel = getDbConnection().model('User', UserSchema);
  //hash password and check if it's identical to actual password
  const hashpassword = bcrypt.hashSync(password, 10);
	return await userModel.find({ password: hashpassword });
}

async function findUserByUserAndPass(username, password) {
	const userModel = getDbConnection().model('User', UserSchema);
  //hash password and check if it's identical to actual password
  const hashpassword = bcrypt.hashSync(password, 10);
	return await userModel.find({ username: username, password: hashpassword });
}

async function deleteUserById(id) {
	console.log('delete user by id', id);
	const userModel = getDbConnection().model('User', UserSchema);
	try {
		if (await userModel.findByIdAndDelete(id)) return true;
	} catch (error) {
		console.log(error);
		return false;
	}
}
exports.deleteUserById = deleteUserById;
exports.getUsers = getUsers;
exports.findUserById = findUserById;
exports.addUser = addUser;
exports.addItemToUser = addItemToUser;
exports.delUser = delUser;
exports.findUserByUsername = findUserByUsername;
exports.getItemFromUser = getItemFromUser;
exports.deleteItemFromUser = deleteItemFromUser;
exports.updateItemFromUser = updateItemFromUser;
