const ItemSchema = require('./item.tsx');
// const mongoose = require('mongoose');
const { PutObjectCommand } = require("@aws-sdk/client-s3");

let dbConnection: any;

async function getDbConnection() {
	if (!dbConnection) {
		dbConnection = await mongoose.createConnection(
			'mongodb://127.0.0.1:27017/inventoryUsers',
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
		);
	}
	return dbConnection;
}

async function getItems(conn: any) {
	const ItemModel = conn.model('Item', ItemSchema);
	return await ItemModel.find();
}

async function getItemsFromUser(userId: any, conn: any) {
	const ItemModel = conn.model('Item', ItemSchema);
	let result;
	result = await ItemModel.find({ userId: userId });
	return result;
}

async function addItem(item: any, conn: any) {
	const ItemModel = conn.model('Item', ItemSchema);
	const itemToAdd = new ItemModel(item);
	const savedItem = await itemToAdd.save();
	return savedItem;
}

async function findItemByName(name: any, conn: any) {
	const ItemModel = conn.model('Item', ItemSchema);
	return await ItemModel.find({ name: name });
}

async function deleteItem(id: any, conn: any) {
	const ItemModel = conn.model('Item', ItemSchema);
	return await ItemModel.findByIdAndDelete(id);
}

async function updateItem(id: any, updates: any, conn: any) {
	const ItemModel = conn.model('Item', ItemSchema);
	const updatedItem = await ItemModel.findByIdAndUpdate(id, updates, {
		new: true,
	});
	return updatedItem;
}



async function uploadFile(fileStream: any, fileName: any) {
  const uploadParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
    Body: fileStream,
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(uploadParams));
    console.log("Success", data);
    return data;
  } catch (err) {
    console.log("Error", err);
    throw new Error("File upload failed");
  }
}



// async function disconnectDB() {
//   await mongoose.connection.close();
//   await mongoose.disconnect();
// }
exports.getDbConnection = getDbConnection;
exports.getItems = getItems;
exports.findItemByName = findItemByName;
exports.addItem = addItem;
exports.deleteItem = deleteItem;
exports.getItemsFromUser = getItemsFromUser;
exports.updateItem = updateItem;
exports.uploadFile = uploadFile;
// exports.disconnectDB = disconnectDB;

