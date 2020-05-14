const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { 
      type: String,
      minlength: 3,
      maxlength: 255,
      required: true
    }
  });


const User = mongoose.model('User', userSchema);


  function validateUser(user) {

    const userSchema = Joi.object({ username: Joi.string().min(3).required()});
    
        return userSchema.validate(user);
  }
  
exports.userSchema = userSchema;
exports.User = User;
exports.validateUser = validateUser;