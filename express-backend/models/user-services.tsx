const mongoose = require('mongoose');
const UserSchema = require('./user.tsx');
const ItemSchema = require('./item.tsx');
const itemServices = require('./item-services.tsx');


mongoose.set("debug", true);


mongoose.connect("mongodb+srv://awu98:inventoryUsers98@inventory.pen6xvt.mongodb.net/myInventory?retryWrites=true&w=majority&appName=Inventory", {
    useNewUrlParser: true, //useFindAndModify: false,
    useUnifiedTopology: true,
  });


async function getUsers() {
    return await UserSchema.find();
}


async function findUserById(id: String) {
    try {
        return await UserSchema.find();
    } catch (error) {
        console.log(error);
        return undefined;
    }
}


async function addUser(user: any) {
    // userModel is a Model, a subclass of mongoose.Model
   
    try {
        const userToAdd = new UserSchema(user);
        const savedUser = await userToAdd.save();
        return savedUser;
    } catch (error: any) {
        if (error.name == 'ValidationError') {
            const errorMessage = error.errors.password
                ? error.errors.password.message
                : error.errors; //This truncates the error message to just be what is wanted -> Error: Password must be 5 or more characters long.
            console.log(errorMessage); //return the error message to handle it in response
            return { error: true, message: errorMessage };
        } else {
            console.log(error);
            return { error: true, message: 'An unexpected error occurred' };
        }
    }
}


async function delUser(user: any) {
    try {
        await UserSchema.deleteOne(user);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}


async function addItemToUser(user_id: any, item_id: any) {
    // connect to user collection and item collection databases
    // find user with matching id
    //const user = await findUserById(user_id);
   
    //if (user) console.log(user.username);


    //console.log("User selected is ", user)
   
    const itemToAdd = await ItemSchema.find({ _id: item_id });


    console.log("Item selected is ", itemToAdd)


    //if (itemToAdd) console.log(item_id);
    //user.items.push({items: item_id});
    // push id onto item list of user
    const updatedUser = UserSchema.findByIdAndUpdate(user_id, { items: [itemToAdd._id] },
    function (err : any, docs : any) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Updated User : ", docs);
        }
    });
}




async function getItemFromUser(userId: any, itemId: any) {
    const user = await UserSchema.findById(userId);
    const userItem = await UserSchema.find({ items: itemId });
    return await ItemSchema.find({ _id: itemId });
}


async function deleteItemFromUser(userId: any, itemId: any) {
    const user = await UserSchema.findById(userId);
    if (user) console.log(user.username);
    const userItem = await UserSchema.find({ items: itemId });
    if (userItem) console.log('Item found');
    const updatedUser = await UserSchema.findByIdAndUpdate(userId, {
        $pull: { items: itemId },
    });
    return updatedUser;
}


async function updateItemFromUser(
    userId: any,
    itemId: any,
    quantity: any,
    option: any,
) {
    const user = await UserSchema.findById(userId);
    if (option === 'add') {
        const incItem = await ItemSchema.findByIdAndUpdate(itemId, {
            $inc: { quantity: quantity },
        });
        return incItem;
    } else {
        const tempItem = await ItemSchema.findById(itemId);
        if (tempItem.quantity - quantity <= 0) {
            const updatedUser = await ItemSchema.findByIdAndUpdate(userId, {
                $pull: { items: itemId },
            });
            const delItem = await itemServices.deleteItem(itemId);
            return delItem;
        } else {
            const decItem = await ItemSchema.findByIdAndUpdate(itemId, {
                $inc: { quantity: -quantity },
            });
            return decItem;
        }
    }
}


//function findByIdAndUpdate(user_id: any, arg1: { $push: { items: any; }; }) {
//}




async function findUserByUsername(username: string) {
    return await UserSchema.find({ username: username});
}


async function findUserByUserAndPass(username: any, password: any) {
    return await UserSchema.find({ username: username, password: password });
}


async function deleteUserById(id: any) {
    try {
        if (await UserSchema.findByIdAndDelete(id)) return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}


exports.getUsers = getUsers;
exports.findUserById = findUserById;
exports.addUser = addUser;
exports.delUser = delUser;
exports.addItemToUser = addItemToUser;
exports.getItemFromUser = getItemFromUser;
exports.deleteItemFromUser = deleteItemFromUser;
exports.updateItemFromUser = updateItemFromUser;
exports.findUserByUsername = findUserByUsername;
exports.findUserByUserAndPass = findUserByUserAndPass;
exports.deleteUserById = deleteUserById;
export {};





