const mongoose = require('mongoose');
const UserSchema = require('./user.tsx');
const ItemSchema = require('./item.tsx');
const FolderSchema = require('./folder.tsx');
const itemServices = require('./item-services.tsx');
const dotenv = require("dotenv").config({ path: '../.env' });
//dotenv.config();

mongoose.set("debug", true);

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
    useNewUrlParser: true, //useFindAndModify: false,
    useUnifiedTopology: true,
  });

async function getUsers() {	
	return await UserSchema.find();
}

async function findUserById(id: any) {
	try {
		return await findUserByUsername(id);
	} catch (error) {
		console.log(error);
		return undefined;
	}
}

async function addFolder(userId: any, folderName: any) {
	const objUID = mongoose.Types.ObjectId(userId);
	const folderToAdd = new FolderSchema({name: folderName, userId: objUID});
	const savedFolder = await folderToAdd.save();
	const user = await UserSchema.findByIdAndUpdate(userId, {
		$push: {folders: mongoose.Types.ObjectId(folderToAdd._id)},
	});
	return user;
}

async function deleteFolder(userId: any, folderName: any) {
	const objUID = mongoose.Types.ObjectId(userId);
	const folderToDel = await FolderSchema.find({name: folderName});
	const user = await UserSchema.findByIdAndUpdate(userId, {
		$pull: {folders: mongoose.Types.ObjectId(folderToDel[0]._id)}
	});
	await FolderSchema.findByIdAndDelete(folderToDel[0]._id);
	return user;
}

async function addItemToFolder(folderName: any, itemId: any) {
	//const objUID = mongoose.Types.ObjectId(userId);
	//let f2;
	const folderToUpdate = await FolderSchema.find({name: folderName});
	console.log(folderName);
	console.log(folderToUpdate);
	const folder = await FolderSchema.findByIdAndUpdate(folderToUpdate[0]._id, {
		$push: {items: mongoose.Types.ObjectId(itemId)}
	})
	const itemToUpdate = await ItemSchema.findByIdAndUpdate(itemId,
		{folder: folderToUpdate[0]._id},
		{new: true},
	)
	return true;
}

async function deleteItemFromFolder(folderName: any, itemId: any) {
	const folderToUpdate = await FolderSchema.find({name: folderName});
	const folder = await FolderSchema.findByIdAndUpdate(folderToUpdate[0]._id, {
		$pull: {items: mongoose.Types.ObjectId(itemId)}
	});
	const itemToUpdate = await ItemSchema.findByIdAndUpdate(itemId,
		{folder: null},
		{new: true},
	)
	return true;
}

async function addUser(user: any) {
	// userModel is a Model, a subclass of mongoose.Model
	
	try {
		const userToAdd = new UserSchema(user);
		const savedUser = await userToAdd.save();
		return savedUser;
	} catch (error: any) {
		if (error.name == 'ValidationError') {
			const errorMessage = error.errors.password
				? error.errors.password.message
				: error.errors; //This truncates the error message to just be what is wanted -> Error: Password must be 5 or more characters long.
			console.log(errorMessage); //return the error message to handle it in response
			return { error: true, message: errorMessage };
		} else {
			console.log(error);
			return { error: true, message: 'An unexpected error occurred' };
		}
	}
}

async function delUser(user: any) {
	try {
		await UserSchema.deleteOne(user);
		return true;
	} catch (err) {
		console.error(err);
		return false;
	}
}

async function addItemToUser(user_id: any, item_id: any) {
	// connect to user collection and item collection databases
	// find user with matching id
	const user = await UserSchema.findById(user_id);
	// initialize array for user items if it doesnt exist already
	user.items = [];
	if (user) console.log(user.username);
	const itemToAdd = await ItemSchema.find({ _id: item_id });
	if (itemToAdd) console.log(item_id);
	//user.items.push({items: item_id});
	// push id onto item list of user
	const updatedUser = await UserSchema.findByIdAndUpdate(user_id, {
		$push: { items: mongoose.Types.ObjectId(item_id) },
	});
	return updatedUser;
}

async function getItemFromUser(userId: any, itemId: any) {
	const user = await UserSchema.findById(userId);
	const userItem = await UserSchema.find({ items: itemId });
	return await ItemSchema.find({ _id: itemId });
}

async function deleteItemFromUser(userId: any, itemId: any) {
	const user = await UserSchema.findById(userId);
	if (user) console.log(user.username);
	const userItem = await UserSchema.find({ items: itemId });
	if (userItem) console.log('Item found');
	const updatedUser = await UserSchema.findByIdAndUpdate(userId, {
		$pull: { items: itemId },
	});
	return updatedUser;
}

async function updateItemFromUser(
	userId: any,
	itemId: any,
	quantity: any,
	option: any,
) {
	const user = await UserSchema.findById(userId);
	if (option === 'add') {
		const incItem = await ItemSchema.findByIdAndUpdate(itemId, {
			$inc: { quantity: quantity },
		});
		return incItem;
	} else {
		const tempItem = await ItemSchema.findById(itemId);
		if (tempItem.quantity - quantity <= 0) {
			const updatedUser = await ItemSchema.findByIdAndUpdate(userId, {
				$pull: { items: itemId },
			});
			const delItem = await itemServices.deleteItem(itemId);
			return delItem;
		} else {
			const decItem = await ItemSchema.findByIdAndUpdate(itemId, {
				$inc: { quantity: -quantity },
			});
			return decItem;
		}
	}
}

async function findUserByUsername(username: string) {
	return await UserSchema.find({ username: username});
}

async function findUserByUserAndPass(username: any, password: any) {
	return await UserSchema.find({ username: username, password: password });
}

async function deleteUserById(id: any) {
	try {
		if (await UserSchema.findByIdAndDelete(id)) return true;
	} catch (error) {
		console.log(error);
		return false;
	}
}

exports.getUsers = getUsers;
exports.findUserById = findUserById;
exports.addUser = addUser;
exports.delUser = delUser;
exports.addItemToUser = addItemToUser;
exports.getItemFromUser = getItemFromUser;
exports.deleteItemFromUser = deleteItemFromUser;
exports.updateItemFromUser = updateItemFromUser;
exports.findUserByUsername = findUserByUsername;
exports.findUserByUserAndPass = findUserByUserAndPass;
exports.deleteUserById = deleteUserById;
exports.addFolder = addFolder;
exports.deleteFolder = deleteFolder;
exports.addItemToFolder = addItemToFolder;
exports.deleteItemFromFolder = deleteItemFromFolder;
export {};