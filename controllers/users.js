const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const { BAD_REQUEST, ERROR_MESSAGES, JWT_SECRET, CONFLICT } = require("../utils/config");
const handleError = require("../utils/errors");

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  if (!name || !avatar || !email || !password) {
    return res.status(BAD_REQUEST).send({ message: ERROR_MESSAGES.INVALID_FIELDS});
  }

  UserModel.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(CONFLICT).send({message: ERROR_MESSAGES.CONFLICT });
      }

      return bcrypt
        .hash(password, 8)
        .then((hashedPassword) =>
          UserModel.create({ name, avatar, email, password: hashedPassword })
        )
        .then((user) => {
          const userWithoutPassword = user.toObject();
          delete userWithoutPassword.password;
          res.status(201).send(userWithoutPassword)});
    })
    .catch((err) => handleError(err, res));
};

const getCurrentUser = (req, res) => {
  UserModel.findById(req.user._id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => handleError(err, res));
};

const updateUser = (req, res) => {
  const { name, avatar } = req.body;

  UserModel.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => res.send(user))
    .catch((err) => handleError(err, res));
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(BAD_REQUEST)
      .send({ message: ERROR_MESSAGES.INVALID_LOGIN });
  }

  UserModel.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => handleError(err, res));
};

module.exports = { createUser, getCurrentUser, updateUser, login };
