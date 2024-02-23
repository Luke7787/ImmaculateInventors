const mongoose = require("mongoose");

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
      if (value.length < 2) throw new Error("Invalid job.");
    },
  },
  
}, {collection : 'users_list'});

module.exports = UserSchema;