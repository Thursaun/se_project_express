const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const { BAD_REQUEST, ERROR_MESSAGES, JWT_SECRET, CONFLICT } = require("../utils/config");


const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  if (!name || !avatar || !email || !password) {
    const err = new Error(ERROR_MESSAGES.INVALID_FIELDS);
    err.statusCode = BAD_REQUEST;
    return next(err);
  }

  UserModel.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        const err = new Error(ERROR_MESSAGES.CONFLICT);
        err.statusCode = CONFLICT;
        return next(err);
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
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  UserModel.findById(req.user._id)
    .orFail()
    .then((user) => res.send(user))
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, avatar } = req.body;

  UserModel.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => res.send(user))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const err = new Error(ERROR_MESSAGES.INVALID_LOGIN);
    err.statusCode = BAD_REQUEST;
    return next(err);
  }

  UserModel.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch(next);
};

module.exports = { createUser, getCurrentUser, updateUser, login };
