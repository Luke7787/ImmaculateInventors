const mongoose = require('mongoose');
const ItemSchema = require('./item');
const dotenv = require("dotenv");
dotenv.config();


let dbConnection: any;


function setConnection(newConn: any){
	dbConnection = newConn;
	return dbConnection;
  }
  
function getDbConnection() {
	if (!dbConnection) {
		dbConnection = mongoose.createConnection(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	}
	return dbConnection;
}

// mongoose.connect("mongodb+srv://awu98:inventoryUsers98@inventory.pen6xvt.mongodb.net/myInventory?retryWrites=true&w=majority&appName=Inventory", {
//     useNewUrlParser: true, //useFindAndModify: false,
//     useUnifiedTopology: true,
//   });


async function getItems() {
	const ItemModel = getDbConnection().model("Item", ItemSchema);
	return await ItemModel.find();
}

async function getUserId(id: any) {
	const ItemModel = getDbConnection().model("Item", ItemSchema);
	const item = await ItemModel.findById(id);
	return item.userId;
}

async function getItemsFromUser(userId: any) {
	const ItemModel = getDbConnection().model("Item", ItemSchema);
	//let result;
	return ItemModel.find({ userId: userId });
	//return result;
}

async function addItem(item: any) {
	const ItemModel = getDbConnection().model("Item", ItemSchema);
	const itemToAdd = new ItemModel(item);
	const savedItem = await itemToAdd.save();
	return savedItem;
}

async function findItemByName(name: any) {
	console.log(name)
	return await ItemSchema.find({ name: name });
}

async function deleteItem(id: any) {
	const ItemModel = getDbConnection().model("Item", ItemSchema);
	return await ItemModel.findByIdAndDelete(id);
}

async function updateItem(id: any, updates: any) {
	const ItemModel = getDbConnection().model("Item", ItemSchema);
	const updatedItem = await ItemModel.findByIdAndUpdate(id, updates, {
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
exports.setConnection = setConnection;
// exports.disconnectDB = disconnectDB;
export {};
