const User = require("../models/user");
const NOT_FOUND = require('../utils/constants');
const handleError = require('../utils/errors');

const getUsers = (req, res) => {
  User.find({})
  .then((users) => res.send(users))
  .catch((err) => handleError(err, res));
};

const createUser = (req, res) => {
  const {name, avatar} = req.body;

  User.create({ name, avatar })
  .then((user) => res.send(user))
  .catch((err) => handleError(err, res));
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
  .orFail(() => {
    const error = new Error('User not found');
    error.name = 'DocumentNotFoundError';
    error.statusCode = NOT_FOUND;
    throw error;
  })
  .then((user) => res.send(user))
  .catch((err) => handleError(err, res));
}

module.exports = { getUsers, createUser, getUser };

