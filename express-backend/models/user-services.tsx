const mongoose = require('mongoose');
const UserSchema = require('./user.tsx');
const ItemSchema = require('./item.tsx');
const FolderSchema = require('./folder.tsx');
const itemServices = require('./item-services.tsx');
const dotenv = require('dotenv');
dotenv.config();

mongoose.set('debug', true);

let dbConnection: any;
function setConnection(newConn: any) {
	dbConnection = newConn;
	return dbConnection;
}

function getDbConnection() {
	if (!dbConnection) {
		dbConnection = mongoose.createConnection(process.env.MONGODBURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	}
	return dbConnection;
}

const uri = process.env.MONGODBURI;
mongoose.connect(uri, {
	useNewUrlParser: true, //useFindAndModify: false,
	useUnifiedTopology: true,
});

async function getUsers() {
	const UserModel = getDbConnection().model('User', UserSchema);
	return await UserModel.find();
}

async function findUserById(id: any) {
	try {
		return await findUserByUsername(id);
	} catch (error) {
		console.log(error);
		return undefined;
	}
}

async function getFolders(userId: any) {
	const FolderModel = getDbConnection().model('Folder', FolderSchema);
	const folders = await FolderModel.find({ userId: userId });
	return folders;
}

async function addFolder(userId: any, folderName: String, imageUrl: string) {
	const FolderModel = getDbConnection().model('Folder', FolderSchema);
	const UserModel = getDbConnection().model('User', UserSchema);
	const objUID = mongoose.Types.ObjectId(userId);
	const folderToAdd = new FolderModel({
		name: folderName,
		userId: objUID,
		image: imageUrl,
	});
	const savedFolder = await folderToAdd.save();
	const user = await UserModel.findByIdAndUpdate(userId, {
		$push: { folders: mongoose.Types.ObjectId(folderToAdd._id) },
	});
	return folderToAdd._id;
}

async function getFolderContents(folderId: any) {
	const ItemModel = getDbConnection().model('Item', ItemSchema);
	console.log(folderId);
	const items = await ItemModel.find({ folder: folderId });
	console.log(items);
	return items;
}

async function sortByQuantity(folderId: any) {
	const ItemModel = getDbConnection().model('Item', ItemSchema);
	const items = await ItemModel.find({ folder: folderId }).sort({
		quantity: 1,
	});
	return items;
}

async function deleteFolder(userId: any, folderName: any) {
	const FolderModel = getDbConnection().model('Folder', FolderSchema);
	const UserModel = getDbConnection().model('User', UserSchema);
	const objUID = mongoose.Types.ObjectId(userId);
	const folderToDel = await FolderModel.find({ name: folderName });
	const user = await UserModel.findByIdAndUpdate(userId, {
		$pull: { folders: mongoose.Types.ObjectId(folderToDel[0]._id) },
	});
	await FolderModel.findByIdAndDelete(folderToDel[0]._id);
	return user;
}

// async function addItemToFolder(folderName: any, itemId: any) {
// 	const folderToUpdate = await FolderSchema.find({ name: folderName });
// 	const folder = await FolderSchema.findByIdAndUpdate(folderToUpdate[0]._id, {
// 		$push: { items: mongoose.Types.ObjectId(itemId) },
// 	});
// 	const itemToUpdate = await ItemSchema.findByIdAndUpdate(
// 		itemId,
// 		{ folder: folderToUpdate[0]._id },
// 		{ new: true }
// 	);
// 	return true;
// }
async function addItemToFolder(folderId: any, itemId: any) {
	const FolderModel = getDbConnection().model('Folder', FolderSchema);
	const ItemModel = getDbConnection().model('Item', ItemSchema);
	const folder = await FolderModel.findByIdAndUpdate(
		mongoose.Types.ObjectId(folderId),
		{
			$push: { items: mongoose.Types.ObjectId(itemId) },
		}
	);
	const itemToUpdate = await ItemModel.findByIdAndUpdate(
		itemId,
		{ folder: mongoose.Types.ObjectId(folderId) },
		{ new: true }
	);
	return true;
}

async function deleteItemFromFolder(folderName: any, itemId: any) {
	const FolderModel = getDbConnection().model('Folder', FolderSchema);
	const ItemModel = getDbConnection().model('Item', ItemSchema);
	const folderToUpdate = await FolderModel.find({ name: folderName });
	const folder = await FolderModel.findByIdAndUpdate(folderToUpdate[0]._id, {
		$pull: { items: mongoose.Types.ObjectId(itemId) },
	});
	const itemToUpdate = await ItemModel.findByIdAndUpdate(
		itemId,
		{ folder: null },
		{ new: true }
	);
	return true;
}

async function updateFolderName(folderId: any, newName: any) {
	const FolderModel = getDbConnection().model('Folder', FolderSchema);
	const folderToUpdate = await FolderModel.findByIdAndUpdate(
		folderId,
		{ name: newName },
		{ new: true }
	);
	return true;
}

async function addUser(user: any) {
	// userModel is a Model, a subclass of mongoose.Model
	const UserModel = getDbConnection().model('User', UserSchema);
	try {
		const userToAdd = new UserModel(user);
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
	const UserModel = getDbConnection().model('User', UserSchema);
	try {
		await UserModel.deleteOne(user);
		return true;
	} catch (err) {
		console.error(err);
		return false;
	}
}

async function addItemToUser(user_id: any, item_id: any) {
	const UserModel = getDbConnection().model('User', UserSchema);
	const ItemModel = getDbConnection().model('Item', ItemSchema);
	// connect to user collection and item collection databases
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

async function getItemFromUser(userId: any, itemId: any) {
	const UserModel = getDbConnection().model('User', UserSchema);
	const ItemModel = getDbConnection().model('Item', ItemSchema);
	const user = await UserModel.findById(userId);
	const userItem = await UserModel.find({ items: itemId });
	return await ItemModel.find({ _id: itemId });
}

async function deleteItemFromUser(userId: any, itemId: any) {
	const UserModel = getDbConnection().model('User', UserSchema);
	const user = await UserModel.findById(userId);
	if (user) console.log(user.username);
	const userItem = await UserModel.find({ items: itemId });
	if (userItem) console.log('Item found');
	const updatedUser = await UserModel.findByIdAndUpdate(userId, {
		$pull: { items: itemId },
	});
	return updatedUser;
}

async function updateItemFromUser(
	userId: any,
	itemId: any,
	quantity: any,
	option: any
) {
	const ItemModel = getDbConnection().model('Item', ItemSchema);
	const UserModel = getDbConnection().model('User', UserSchema);
	const user = await UserModel.findById(userId);
	if (option === 'add') {
		const incItem = await ItemModel.findByIdAndUpdate(itemId, {
			$inc: { quantity: quantity },
		});
		return incItem;
	} else {
		const tempItem = await ItemModel.findById(itemId);
		if (tempItem.quantity - quantity <= 0) {
			const updatedUser = await ItemModel.findByIdAndUpdate(userId, {
				$pull: { items: itemId },
			});
			const delItem = await itemServices.deleteItem(itemId);
			return delItem;
		} else {
			const decItem = await ItemModel.findByIdAndUpdate(itemId, {
				$inc: { quantity: -quantity },
			});
			return decItem;
		}
	}
}

async function findUserByUsername(username: string) {
	const UserModel = getDbConnection().model('User', UserSchema);
	const user = await UserModel.find({ username: username });
	return user[0];
}

async function findUserByUserAndPass(username: any, password: any) {
	const UserModel = getDbConnection().model('User', UserSchema);
	const user = await UserModel.find({
		username: username,
		password: password,
	});
	return user[0];
}

async function deleteUserById(id: any) {
	const UserModel = getDbConnection().model('User', UserSchema);
	try {
		if (await UserModel.findByIdAndDelete(id)) return true;
	} catch (error) {
		console.log(error);
		return false;
	}
}

async function sortByQuantityAsc(folderId: any) {
	const ItemModel = getDbConnection().model('Item', ItemSchema);
	const items = await ItemModel.find({ folder: folderId }).sort({
		quantity: 1,
	});
	return items;
}

async function sortByQuantityDes(folderId: any) {
	const ItemModel = getDbConnection().model('Item', ItemSchema);
	const items = await ItemModel.find({ folder: folderId }).sort({
		quantity: -1,
	});
	return items;
}

async function sortByDateAsc(folderId: any) {
	const ItemModel = getDbConnection().model('Item', ItemSchema);
	const items = await ItemModel.find({ folder: folderId }).sort({ date: 1 });
	return items;
}

async function sortByDateDes(folderId: any) {
	const ItemModel = getDbConnection().model('Item', ItemSchema);
	const items = await ItemModel.find({ folder: folderId }).sort({ date: -1 });
	return items;
}

async function sortByNameAsc(folderId: any) {
	const ItemModel = getDbConnection().model('Item', ItemSchema);
	const items = await ItemModel.find({ folder: folderId }).sort({ name: 1 });
	return items;
}

async function sortByNameDes(folderId: any) {
	const ItemModel = getDbConnection().model('Item', ItemSchema);
	const items = await ItemModel.find({ folder: folderId }).sort({ name: -1 });
	return items;
}

exports.sortByNameAsc = sortByNameAsc;
exports.sortByNameDes = sortByNameDes;
exports.sortByDateAsc = sortByDateAsc;
exports.sortByDateDes = sortByDateDes;
exports.sortByQuantityAsc = sortByQuantityAsc;
exports.sortByQuantityDes = sortByQuantityDes;
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
exports.getFolders = getFolders;
exports.addFolder = addFolder;
exports.deleteFolder = deleteFolder;
exports.addItemToFolder = addItemToFolder;
exports.deleteItemFromFolder = deleteItemFromFolder;
exports.updateFolderName = updateFolderName;
exports.getFolderContents = getFolderContents;
export {};
