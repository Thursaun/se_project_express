const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const { ERROR_MESSAGES, JWT_SECRET } = require("../utils/config");
const { BadRequestError } = require("../utils/badrequesterror");
const { ConflictError } = require("../utils/conflicterror");
const { NotFoundError } = require("../utils/notfounderror");

const createUser = (err, req, res, next) => {
  const { name, avatar, email, password } = req.body;

  if (!name || !avatar || !email || !password) {
    return next(new BadRequestError(ERROR_MESSAGES.INVALID_FIELDS));
  }

  if (err.name === "ValidationError") {
    next(new BadRequestError(ERROR_MESSAGES.INVALID_FIELDS));
   } else {
     next(err);
   }

  UserModel.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return next(new ConflictError(ERROR_MESSAGES.CONFLICT));
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
    .orFail(() => new NotFoundError(ERROR_MESSAGES.USER_NOT_FOUND))
    .then((user) => res.send(user))
    .catch(next);
};

const updateUser = (err, req, res, next) => {
  const { name, avatar } = req.body;
  if (err.name === "ValidationError") {
    next(new BadRequestError(ERROR_MESSAGES.INVALID_FIELDS));
   } else {
     next(err);
   }

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
    return next(new BadRequestError(ERROR_MESSAGES.INVALID_LOGIN));
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
