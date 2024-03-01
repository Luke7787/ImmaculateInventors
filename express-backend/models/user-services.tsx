import * as bcrypt from 'bcrypt'

const mongoose = require("mongoose");
const UserSchema = require("./user.tsx");


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
    //hash password and check if it's identical to actual password
    const hashpassword = bcrypt.hashSync(password, 10);
    result = await findUserByUserAndPass(username, hashpassword);
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

async function addUser(user){
    // userModel is a Model, a subclass of mongoose.Model
    const userModel = getDbConnection().model("User", UserSchema);
    try{
        //hash password before adding into database
        const hashpassword = bcrypt.hashSync(user['password'], 10);
        user['password'] = hashpassword;

        // You can use a Model to create new documents using 'new' and 
        // passing the JSON content of the Document:
        const userToAdd = new userModel(user);
        const savedUser = await userToAdd.save()
        return savedUser;
    }catch(error) {
        if (error.name == 'ValidationError'){
            const errorMessage = error.errors.password ? error.errors.password.message : 'Validation failed';   //This truncates the error message to just be what is wanted -> Error: Password must be 5 or more characters long.
            console.log(errorMessage); //return the error message to handle it in response
            return {error: true, message: errorMessage};
        }
        else{
            console.log(error);
            return {error: true, message: 'An unexpected error occurred'};
        }

        // console.log(error);
        // return false;
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

async function findUserByUsername(username) {
  const userModel = getDbConnection().model("User", UserSchema);
  return await userModel.find({ username: username });
}

async function findUserBypassword(password) {
  const userModel = getDbConnection().model("User", UserSchema);
  //hash password and check if it's identical to actual password
  const hashpassword = bcrypt.hashSync(password, 10);
  return await userModel.find({ password: hashpassword });
}

async function findUserByUserAndPass(username, password) {
  const userModel = getDbConnection().model("User", UserSchema);
  //hash password and check if it's identical to actual password
  const hashpassword = bcrypt.hashSync(password, 10);
  return await userModel.find({ username: username, password: hashpassword });
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
exports.delUser = delUser;
exports.findUserByUsername = findUserByUsername;
