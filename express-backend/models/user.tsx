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
    validate: {
      validator: function(value){
        return value.length >=5;
      },
      message: props => 'Error: Password must be 5 or more characters long.'
    }
    
    
    // validate(value) {
    //   // if (value.length < 5) throw new Error("Error: Password must be 5 or more characters long.");
    //   if (value.length < 5) res.status(409).send("Error: Password must be 5 or more characters long.");
    // },
  },
  
}, {collection : 'users_list'});

module.exports = UserSchema;

