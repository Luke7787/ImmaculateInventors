const ItemSchema = require('./item.tsx');
const UserSchema = require('./user.tsx');
const FolderSchema = require('./folder.tsx');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Item = mongoose.model('Item', ItemSchema, 'items');
dotenv.config();

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

async function getItems() {
	const ItemModel = getDbConnection().model('Item', ItemSchema);
	return await ItemModel.find();
}

async function getUserId(id: any) {
	const ItemModel = getDbConnection().model('Item', ItemSchema);
	const item = await ItemModel.findById(id);
	return item.userId;
}

async function getItemsFromUser(userId: any) {
	const ItemModel = getDbConnection().model('Item', ItemSchema);
	return await ItemModel.find({ userId: userId });
}

async function addItem(item: any) {
	const ItemModel = getDbConnection().model('Item', ItemSchema);
	const UserModel = getDbConnection().model('User', UserSchema);
	const FolderModel = getDbConnection().model('Folder', FolderSchema);
	const itemToAdd = new ItemModel(item);
	const savedItem = await itemToAdd.save();
	const folder = await FolderModel.findById(savedItem.folder);
	await FolderModel.findByIdAndUpdate(folder._id, {
		$push: { items: savedItem._id },
	});
	await UserModel.findByIdAndUpdate(folder.userId, {
		$push: { items: savedItem._id },
	});
	await ItemModel.findByIdAndUpdate(savedItem._id, { userId: folder.userId });
	return savedItem;
}

async function findItemByName(name: any, uid: any) {
	// const user = await UserSchema.findById(uid);
	// const items = user.items;
	// let item;
	// for (let i = 0; i < items.length; i++) {
	// 	item = await ItemSchema.findById(items[i]);
	// 	if (item.name === name) break;
	// }
	const ItemModel = getDbConnection().model('Item', ItemSchema);
	return await ItemModel.find({ userId: uid, name: name });

	//return item;
}

async function findItemById(id: any) {
	const ItemModel = getDbConnection().model('Item', ItemSchema);
	return await ItemModel.findById(id);
}

async function deleteItem(id: any) {
	const ItemModel = getDbConnection().model('Item', ItemSchema);
	const UserModel = getDbConnection().model('User', UserSchema);
	const FolderModel = getDbConnection().model('Folder', FolderSchema);
	const item = await ItemModel.findById(id);
	const folder = await FolderModel.findById(item.folder);
	const user = await UserModel.findById(item.userId);
	await FolderModel.findByIdAndUpdate(folder._id, {
		$pull: { items: mongoose.Types.ObjectId(id) },
	});
	await UserModel.findByIdAndUpdate(user._id, {
		$pull: { items: mongoose.Types.ObjectId(id) },
	});
	return await ItemModel.findByIdAndDelete(id);
}

async function updateItem(id: any, updates: any) {
	const ItemModel = getDbConnection().model('Item', ItemSchema);
	const updatedItem = await ItemModel.findByIdAndUpdate(id, updates, {
		new: true,
	});
	return updatedItem;
}

async function incQuantity(id: any, quantity: any) {
	const ItemModel = getDbConnection().model('Item', ItemSchema);
	await ItemModel.findByIdAndUpdate(id, {
		$inc: { quantity: quantity },
	});
	return await ItemModel.findById(id);
}

async function decQuantity(id: any, quantity: any) {
	const ItemModel = getDbConnection().model('Item', ItemSchema);
	const item = await ItemModel.findById(id);
	if (item.quantity - quantity <= 0) {
		await deleteItem(id);
	} else {
		await ItemModel.findByIdAndUpdate(id, {
			$inc: { quantity: -quantity },
		});
		return await ItemModel.findById(id);
	}
	return item;
}

exports.getItems = getItems;
exports.findItemByName = findItemByName;
exports.findItemById = findItemById;
exports.addItem = addItem;
exports.deleteItem = deleteItem;
exports.getItemsFromUser = getItemsFromUser;
exports.updateItem = updateItem;
exports.getUserId = getUserId;
exports.incQuantity = incQuantity;
exports.decQuantity = decQuantity;
exports.setConnection = setConnection;
exports.getDbConnection = getDbConnection;
export {};
