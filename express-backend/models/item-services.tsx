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
	//let result;
	return ItemSchema.find({ userId: userId });
	//return result;
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
	return savedItem;
}

async function findItemByName(name: any) {
	console.log(name);
	return await ItemSchema.find({ name: name });
}

async function deleteItem(id: any) {
	const item = await ItemSchema.findById(id);
	const folder = await FolderSchema.findById(item._id);
	const user = await UserSchema.findById(item.userId);
	await FolderSchema.findByIdAndUpdate(folder._id, {
		$pull : { items : mongoose.Types.ObjectId(id) },
	});
	await UserSchema.findByIdAndUpdate(user._id, {
		$pull : { items : mongoose.Types.ObjectId(id) },
	});
	return await ItemSchema.findByIdAndDelete(id);
}

async function updateItem(id: any, updates: any) {
	const updatedItem = await ItemSchema.findByIdAndUpdate(id, updates, {
		new: true,
	});
	return updatedItem;
}

// async function disconnectDB() {
//   await mongoose.connection.close();
//   await mongoose.disconnect();
// }
exports.getItems = getItems;
exports.findItemByName = findItemByName;
exports.addItem = addItem;
exports.deleteItem = deleteItem;
exports.getItemsFromUser = getItemsFromUser;
exports.updateItem = updateItem;
exports.getUserId = getUserId;
// exports.disconnectDB = disconnectDB;
export {};
