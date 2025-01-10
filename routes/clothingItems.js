const router = require("express").Router();
const auth = require("../middlewares/auth");
const {createItem, getItems, deleteItem, likeItem, dislikeItem} = require('../controllers/clothingItems');


// Public Routes (No Authentication)
router.get('/', getItems);

// Private Routes (Require User Authentication)
router.use(auth);

router.post('/', createItem);
router.delete('/:itemId', deleteItem);
router.put('/:itemId/likes', likeItem);
router.delete('/:itemId/likes', dislikeItem);

module.exports = router;