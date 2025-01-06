const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [2,  'Name must be at least 2 characters'],
    maxlength: [30, 'Name must not exceed 30 characters'],
  },
  avatar: {
    type: String,
    required: [true, "The avatar field is required." ],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    }
  }
});

module.exports = mongoose.model('User', userSchema);
