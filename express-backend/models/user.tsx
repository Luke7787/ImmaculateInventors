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
    validate(value) {
      if (value.length < 2) throw new Error("Invalid Password");
    },
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