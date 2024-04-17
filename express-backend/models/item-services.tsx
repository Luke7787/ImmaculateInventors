const ItemSchema = require('./item.tsx');
const UserSchema = require('./user.tsx');
const FolderSchema = require('./folder.tsx');
const mongoose = require('mongoose');


let dbConnection: any;


mongoose.connect("mongodb+srv://awu98:inventoryUsers98@inventory.pen6xvt.mongodb.net/myInventory?retryWrites=true&w=majority&appName=Inventory", {
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

async function addItem(item: any, folderId : any) {
	const itemToAdd = new ItemSchema(item);
	const savedItem = await itemToAdd.save();
	const folder = await FolderSchema.findByIdAndUpdate(folderId, 
		{$push: {items: mongoose.Types.ObjectId(savedItem._id)}}
	)
	await ItemSchema.findByIdAndUpdate(savedItem._id, 
		{folder: mongoose.Types.ObjectId(folderId),
			userId: folder.userId.toString()},
		{new: true},
	)
	return savedItem;
}

async function findItemByName(name: any) {
	return await ItemSchema.find({ name: name });
}

async function deleteItem(id: any) {
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
