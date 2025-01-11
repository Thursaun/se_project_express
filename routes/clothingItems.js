const router = require("express").Router();
const auth = require("../middlewares/auth");
const {createItem, getItems, deleteItem, likeItem, dislikeItem} = require('../controllers/clothingItems');


// Public Routes (No Authentication)
router.get('/', getItems);

// Private Routes (Require User Authentication)
router.post('/', auth, createItem);
router.delete('/:itemId', auth, deleteItem);
router.put('/:itemId/likes', auth, likeItem);
router.delete('/:itemId/likes', auth, dislikeItem);

module.exports = router;