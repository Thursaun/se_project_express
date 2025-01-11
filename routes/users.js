const router = require("express").Router();
const auth = require("../middlewares/auth");
const { getCurrentUser, updateUser } = require("../controllers/users");


// Private Routes (Require User Authentication)
router.get("/me", auth, getCurrentUser );
router.patch("/me", auth, updateUser )


module.exports = router;