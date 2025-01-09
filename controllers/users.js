const User = require("../models/user");
const handleError = require('../utils/errors');

const getUsers = (req, res) => {
  User.find({})
  .then((users) => res.status(200).send(users))
  .catch((err) => handleError(err, res));
};

const createUser = (req, res) => {
  const {name, avatar} = req.body;

  User.create({ name, avatar })
  .then((user) => res.status(201).send(user))
  .catch((err) => handleError(err, res));
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
  .then((user) => res.status(200).send(user))
  .catch((err) => handleError(err, res));
}

module.exports = { getUsers, createUser, getUser };

