const router = require("express").Router()

router.get("/", () => console.log("Get users"));
router.get("/:userId", () => console.log("Get user by ID"));
router.post("/", () => console.log("POST users"));

module.exports = router;