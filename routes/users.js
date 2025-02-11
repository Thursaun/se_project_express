const router = require("express").Router();
const auth = require("../middlewares/auth");
const { getCurrentUser, updateUser } = require("../controllers/users");
const { validateUserUpdate } = require("../middlewares/validation");


// Private Routes (Require User Authentication)
router.get("/me", auth, getCurrentUser );
router.patch("/me", auth, validateUserUpdate, updateUser )


module.exports = router;