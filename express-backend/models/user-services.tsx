const mongoose = require('mongoose');
const UserSchema = require("./user.tsx");

let dbConnection;

function getDbConnection() {
    if (!dbConnection) {
        dbConnection = mongoose.createConnection("mongodb://127.0.0.1:27017/inventoryUsers", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    return dbConnection;
  }

async function getUsers(username, password){
    const userModel = getDbConnection().model("User", UserSchema);
    let result;
    if (username === undefined && password === undefined){
        result = await userModel.find();
    }
    else if (username && !password) {
        result = await findUserByUsername(username);
    }
    else if (password && !username){
        result = await findUserBypassword(password);
    }
    else if (password && username) {
        result = await findUserByusernameAndpassword(username, password);
    }
    return result;  
}

async function findUserById(id){
    const userModel = getDbConnection().model("User", UserSchema);    
    try{
        return await userModel.findUserByUsername(id);
    }catch(error) {
        console.log(error);
        return undefined;
    }
}

async function addUser(user){
    // userModel is a Model, a subclass of mongoose.Model
    const userModel = getDbConnection().model("User", UserSchema);
    try{
        // You can use a Model to create new documents using 'new' and 
        // passing the JSON content of the Document:
        const userToAdd = new userModel(user);
        const savedUser = await userToAdd.save()
        return savedUser;
    }catch(error) {
        console.log(error);
        return false;
    }   
}

async function delUser(user) {
    const userModel = getDbConnection().model("User", UserSchema);
    try {
        await userModel.deleteOne(user)
        return true;
    } catch (err) {
        console.error(err);
        return false
    }
}

async function findUserByUsername(username){
    const userModel = getDbConnection().model("User", UserSchema);
    return await userModel.find({'username':username});
}

async function findUserBypassword(password){
    const userModel = getDbConnection().model("User", UserSchema);
    return await userModel.find({'password':password});
}

async function findUserByusernameAndpassword(username, password) {
    const userModel = getDbConnection().model("User", UserSchema);
    return await userModel.find({"username": username, "password": password});
}

exports.getUsers = getUsers;
exports.findUserById = findUserById;
exports.addUser = addUser;
exports.delUser = delUser;
exports.findUserByUsername = findUserByUsername;