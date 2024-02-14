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

async function getUsers(name, job){
    const userModel = getDbConnection().model("User", UserSchema);
    let result;
    if (name === undefined && job === undefined){
        result = await userModel.find();
    }
    else if (name && !job) {
        result = await findUserByName(name);
    }
    else if (job && !name){
        result = await findUserByJob(job);
    }
    else if (job && name) {
        result = await findUserByNameAndJob(name, job);
    }
    return result;  
}


function findUserByUsername(username) {
    return users["users_list"].filter((user) => user["username"] === username);
  }

function usernameUser(username){
    return users['users_list'].findIndex( (user) => user['username'] === username);
    
}

async function findUserById(id){
    const userModel = getDbConnection().model("User", UserSchema);    
    try{
        return await userModel.findById(id);
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

async function findUserByName(name){
    const userModel = getDbConnection().model("User", UserSchema);
    return await userModel.find({'name':name});
}

async function findUserByJob(job){
    const userModel = getDbConnection().model("User", UserSchema);
    return await userModel.find({'job':job});
}

async function findUserByNameAndJob(name, job) {
    const userModel = getDbConnection().model("User", UserSchema);
    return await userModel.find({"name": name, "job": job});
}

exports.getUsers = getUsers;
exports.findUserById = findUserById;
exports.addUser = addUser;
exports.delUser = delUser;