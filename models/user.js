const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Incorrect email address or password'],
    validator: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "You must enter a valid email address",
    }
  },
  password: {
    type: String,
    unique: true,
    required: [true, 'Incorrect email address or password'],
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials (email, password) {
  return User.findOne({email}).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email of password'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Incorrect email of password'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('UserModel', userSchema, 'users');
