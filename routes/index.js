const router = require("express").Router();
const NOT_FOUND = require('../utils/constants');

const userRouter = require("./users");
const itemRouter = require("./clothingItems");

router.use((req, res,) => {
  res.status(NOT_FOUND).send({message: "Requested resource not found"})
});

router.use("/users", userRouter);
router.use("/items", itemRouter);



module.exports = router;