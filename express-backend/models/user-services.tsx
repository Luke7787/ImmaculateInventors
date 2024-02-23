const mongoose = require("mongoose");
const UserSchema = require("./user.tsx");
const ItemSchema = require("./item.tsx")


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

async function getUsers(username, password) {
  const userModel = getDbConnection().model("User", UserSchema);
  let result;
  if (!username && !password) {
    result = await userModel.find();
  } else {
    result = await findUserByUserAndPass(username, password);
  }
  return result;
}

function usernameUser(username) {
  return users["users_list"].findIndex((user) => user["username"] === username);
}

async function findUserById(id) {
  const userModel = getDbConnection().model("User", UserSchema);
  try {
    return await userModel.findUserByUsername(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function addUser(user) {
  // userModel is a Model, a subclass of mongoose.Model
  const userModel = getDbConnection().model("User", UserSchema);
  try {
    // You can use a Model to create new documents using 'new' and
    // passing the JSON content of the Document:
    const userToAdd = new userModel(user);
    const savedUser = await userToAdd.save();
    return savedUser;
  } catch (error) {
    console.log(error);
    return false;
  }
}


async function delUser(user) {
  const userModel = getDbConnection().model("User", UserSchema);
  try {
    await userModel.deleteOne(user);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

async function addItemToUser(user_id, item_id) {
  const UserModel = getDbConnection().model("User", UserSchema);
  const ItemModel = getDbConnection().model("Item", UserSchema);
  const itemToAdd = await ItemModel.find({ _id: item_id });
  const updatedUser = await UserModel.findByIdAndUpdate(user_id, {
    $push: { items: item_id },
  });
  return updatedUser;
}

async function findUserByUsername(username) {
  const userModel = getDbConnection().model("User", UserSchema);
  return await userModel.find({ username: username });
}

async function findUserBypassword(password) {
  const userModel = getDbConnection().model("User", UserSchema);
  return await userModel.find({ password: password });
}

async function findUserByUserAndPass(username, password) {
  const userModel = getDbConnection().model("User", UserSchema);
  return await userModel.find({ username: username, password: password });
}

async function deleteUserById(id) {
  console.log("delete user by id", id);
  const userModel = getDbConnection().model("User", UserSchema);
  try {
    if (await userModel.findByIdAndDelete(id)) return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
exports.deleteUserById = deleteUserById;
exports.getUsers = getUsers;
exports.findUserById = findUserById;
exports.addUser = addUser;
exports.addItemToUser = addItemToUser;
exports.delUser = delUser;
exports.findUserByUsername = findUserByUsername;
