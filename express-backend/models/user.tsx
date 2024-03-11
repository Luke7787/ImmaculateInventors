const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Item = require("./item.tsx");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function(value){
        const passwordPolicy = /^(?=.*\d)(?=.*[?!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{10,}$/;
        return passwordPolicy.test(value);
      },
      message: props => 'Error: Password must be 10 characters long, have a special character, uppercase character, and a number'
    }
    
    
    // validate(value) {
    //   // if (value.length < 5) throw new Error("Error: Password must be 5 or more characters long.");
    //   if (value.length < 5) res.status(409).send("Error: Password must be 5 or more characters long.");
    // },
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
      required: false,
      trim: true,
    },
  ],
}, {collection : 'users_list'});

module.exports = UserSchema;

