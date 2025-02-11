const router = require("express").Router();
const { ERROR_MESSAGES} = require('../utils/config');
const { createUser, login } = require("../controllers/users");
const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const { validateUserCreation, validateUserLogin } = require("../middlewares/validation");
const { CustomError } = require("../utils/customerror");

// Public Routes (No Authentication Required)
router.post("/signup", validateUserCreation, createUser);
router.post("/signin", validateUserLogin, login);

router.use("/users", userRouter);
router.use("/items", itemRouter);

router.use((req, res, next) => {
  next(new CustomError(ERROR_MESSAGES.USER_NOT_FOUND));
});



module.exports = router;