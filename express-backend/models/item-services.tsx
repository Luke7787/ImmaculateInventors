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

async function getItems(name, quantity) {
  const ItemModel = getDbConnection().model("Item", ItemSchema);
  let result;
  if (name === undefined && quantity === undefined) {
    result = await ItemModel.find();
  } else if (name && !quantity) {
    result = await findItemByName(name);
  } else if (quantity && !name) {
    result = await findItemByQuantity(quantity);
  } else {
    result = await findItemByNameAndQuantity(name, quantity);
  }
  return result;
}

async function findItemById(id) {
  // try {
  return await itemModel.findById(id);
  // } catch (error) {
  //   console.log(error);
  //   return undefined;
  // }
}

async function addItem(item) {
  const ItemModel = getDbConnection().model("Item", ItemSchema);
  const itemToAdd = new ItemModel(item);
  const savedItem = await itemToAdd.save();
  return savedItem;
}

async function findItemByName(name) {
  return await itemModel.find({ name: name });
}

async function findItemByQuantity(quantity) {
  return await itemModel.find({ type: quantity })
}
async function findItemByNameAndQuantity(name, quantity) {
  return await itemModel.find({ name: name, quantity: quantity });
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
exports.findItemById = findItemById;
exports.findItemByName = findItemByName;
exports.findItemByQuantity = findItemByQuantity;
exports.findItemByNameAndQuantity = findItemByNameAndQuantity;
exports.addItem = addItem;
exports.deleteItem = deleteItem;
// exports.disconnectDB = disconnectDB;