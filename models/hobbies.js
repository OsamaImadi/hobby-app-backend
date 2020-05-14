const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const {userSchema} = require('./users');
Joi.objectId = require('joi-objectid')(Joi)

const hobbySchema = mongoose.Schema({
  hobby: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  },
  user: { 
    type: userSchema,  
    required: true
  },
  passion: {
    type: String,
    enum : ['Low','Medium', 'High'],
    default: 'Low'
  },
  year: { 
    type: Number, 
    required: false
  }
});

const Hobby = mongoose.model('Hobby', hobbySchema);

function validateHobby(movie) {
  const schema = Joi.object({
    hobby: Joi.string().min(3).max(255).required(),
    userId: Joi.objectId().required(),
    passion: Joi.string().min(0).required(),
    year: Joi.number()
  });

  return schema.validate(movie);
}

exports.Hobby = Hobby; 
exports.validate = validateHobby;