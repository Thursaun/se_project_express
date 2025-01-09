const router = require("express").Router();
const {NOT_FOUND, ERROR_MESSAGES} = require('../utils/constants');

const userRouter = require("./users");
const itemRouter = require("./clothingItems");



router.use("/users", userRouter);
router.use("/items", itemRouter);

router.use((req, res,) => {
  res.status(NOT_FOUND).send({message: ERROR_MESSAGES.USER_NOT_FOUND})
});

module.exports = router;