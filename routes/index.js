const router = require("express").Router();
const {NOT_FOUND, ERROR_MESSAGES} = require('../utils/config');
const { createUser, login } = require("../controllers/users");
const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const { validateUserCreation, validateUserLogin } = require("../middlewares/validation");

// Public Routes (No Authentication Required)
router.post("/signup", validateUserCreation, createUser);
router.post("/signin", validateUserLogin, login);

router.use("/users", userRouter);
router.use("/items", itemRouter);

router.use((req, res, next) => {
  const err = new Error(ERROR_MESSAGES.USER_NOT_FOUND);
  err.statusCode = NOT_FOUND;
  next(err);
});



module.exports = router;