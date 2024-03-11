const ItemSchema = require("./item.tsx");
const mongoose = require("mongoose");


let dbConnection;

function getDbConnection() {
  if (!dbConnection) {
    dbConnection = mongoose.createConnection(
      "mongodb://127.0.0.1:27017/inventoryUsers",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  }
  return dbConnection;
}

async function getItems() {
  const ItemModel = getDbConnection().model("Item", ItemSchema);
  return await ItemModel.find();
}

async function getItemsFromUser(userId) {
  const ItemModel = getDbConnection().model("Item", ItemSchema);
  let result;
  result = await ItemModel.find({userId: userId})
  return result
}

async function addItem(item) {
  const ItemModel = getDbConnection().model("Item", ItemSchema);
  const itemToAdd = new ItemModel(item);
  const savedItem = await itemToAdd.save();
  return savedItem;
}

async function findItemByName(name) {
  const ItemModel = getDbConnection().model("Item", ItemSchema);
  return await ItemModel.find({name: name});
}

async function deleteItem(id) {
  const ItemModel = getDbConnection().model("Item", ItemSchema);
  return await ItemModel.findByIdAndDelete(id);
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
// exports.disconnectDB = disconnectDB;