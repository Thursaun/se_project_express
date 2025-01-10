const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/users");


// Private Routes (Require User Authentication)
router.use(auth);

router.get("/me", getCurrentUser );
router.patch("/me", updateUser )


module.exports = router;