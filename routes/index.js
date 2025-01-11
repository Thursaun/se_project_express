const router = require("express").Router();
const {NOT_FOUND, ERROR_MESSAGES} = require('../utils/config');
const { createUser, login } = require("../controllers/users");
const userRouter = require("./users");
const itemRouter = require("./clothingItems");

// Public Routes (No Authentication Required)
router.post("/signup", createUser);
router.post("/signin", login);

router.use("/users", userRouter);
router.use("/items", itemRouter);

router.use((req, res,) => {
  res.status(NOT_FOUND).send({message: ERROR_MESSAGES.USER_NOT_FOUND})
});



module.exports = router;