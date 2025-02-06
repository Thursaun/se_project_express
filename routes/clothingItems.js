const router = require("express").Router();
const auth = require("../middlewares/auth");
const {createItem, getItems, deleteItem, likeItem, dislikeItem} = require('../controllers/clothingItems');
const { validateCardBody, validateId } = require("../middlewares/validation");


// Public Routes (No Authentication)
router.get('/', getItems);

// Private Routes (Require User Authentication)
router.post('/', auth, validateCardBody, createItem);
router.delete('/:itemId', auth, validateId, deleteItem);
router.put('/:itemId/likes', auth, validateId, likeItem);
router.delete('/:itemId/likes', auth, validateId, dislikeItem);

module.exports = router;