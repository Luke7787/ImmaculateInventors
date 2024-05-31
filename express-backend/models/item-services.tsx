const ItemSchema = require('./item.tsx');
const UserSchema = require('./user.tsx');
const FolderSchema = require('./folder.tsx');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

let dbConnection: any;

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {
	useNewUrlParser: true, //useFindAndModify: false,
	useUnifiedTopology: true,
});

async function getItems() {
	return await ItemSchema.find();
}

async function getUserId(id: any) {
	const item = await ItemSchema.findById(id);
	return item.userId;
}

async function getItemsFromUser(userId: any) {
	return ItemSchema.find({ userId: userId });
}

async function addItem(item: any) {
	const itemToAdd = new ItemSchema(item);
	const savedItem = await itemToAdd.save();
	console.log(savedItem);
	console.log(savedItem._id);
	const folder = await FolderSchema.findById(savedItem.folder);
	await FolderSchema.findByIdAndUpdate(folder._id, {
		$push: { items: savedItem._id },
	});
	await UserSchema.findByIdAndUpdate(folder.userId, {
		$push: { items: savedItem._id },
	});
	await ItemSchema.findByIdAndUpdate(savedItem._id, { userId: folder.userId });
	return savedItem;
}

async function findItemByName(name: any, uid: any) {
	const user = await UserSchema.findById(uid);
	const items = user.items;
	let item;
	for (let i = 0; i < items.length; i++) {
		item = await ItemSchema.findById(items[i]);
		if (item.name === name) break;
	}
	return item;
}

async function findItemById(id: any) {
	return await ItemSchema.findById(id);
}

async function deleteItem(id: any) {
	const item = await ItemSchema.findById(id);
	const folder = await FolderSchema.findById(item.folder);
	const user = await UserSchema.findById(item.userId);
	console.log(item.folder);
	console.log(item.userId);
	await FolderSchema.findByIdAndUpdate(folder._id, {
		$pull: { items: mongoose.Types.ObjectId(id) },
	});
	await UserSchema.findByIdAndUpdate(user._id, {
		$pull: { items: mongoose.Types.ObjectId(id) },
	});
	return await ItemSchema.findByIdAndDelete(id);
}

async function updateItem(id: any, updates: any) {
	const updatedItem = await ItemSchema.findByIdAndUpdate(id, updates, {
		new: true,
	});
	return updatedItem;
}

async function incQuantity(id: any, quantity: any) {
	await ItemSchema.findByIdAndUpdate(id, {
		$inc: { quantity: quantity },
	});
	return await ItemSchema.findById(id);
}

async function decQuantity(id: any, quantity: any) {
	const item = await ItemSchema.findById(id);
	if (item.quantity - quantity <= 0) {
		await deleteItem(id);
	} else {
		await ItemSchema.findByIdAndUpdate(id, {
			$inc: { quantity: -quantity },
		});
		return await ItemSchema.findById(id);
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
export {};
