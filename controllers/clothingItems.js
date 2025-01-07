const ClothingItem = require('../models/clothingItem');
const handleError = require('../utils/errors');

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  if (!req.user || !req.user._id) {
    return res.status(401).send({ message: 'User not authenticated' });
  }

  if (!name || !weather || !imageUrl) {
    return res.status(400).send({ message: 'All fields are required' });
  }

  if (name.length < 2 || name.length > 30) {
    return res.status(400).send({ message: 'Name must be between 2 and 30 characters' });
  }

  if (!['hot', 'warm', 'cold'].includes(weather)) {
    return res.status(400).send({ message: 'Invalid weather type' });
  }

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id, })
  .then((item) => res.status(201).send({ data: item }))
  .catch((err) => handleError(err, res));
};

const getItems = (req, res) => {
  ClothingItem.find({})
  .then((items) => res.status(200).send({data: items}))
  .catch((err) => handleError(err, res));
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndRemove(itemId)
  .orFail(() => {
    const error = new Error('Item not found');
    error.statusCode = 404;
    throw error;
  })
  .then(() => res.status(200).send({message: 'Item deleted successfully'}))
  .catch((err) => handleError(err, res));
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
  { $addToSet: { likes: req.user._id } },
  { new: true },)
  .orFail(() => {
    const error = new Error('Item not found');
    error.statusCode = 404;
    throw error;
  })
  .then((item) => res.status(200).send({data: item}))
  .catch((err) => handleError(err, res));
};

const dislikeItem = (req, res) => {ClothingItem.findByIdAndUpdate(
  req.params.itemId,
  { $pull: { likes: req.user._id } },
  { new: true, runValidators: true },)
  .orFail(() => {
    const error = new Error('Item not found');
    error.statusCode = 404;
    throw error;
  })
  .then((item) => res.status(200).send({data: item}))
  .catch((err) => handleError(err, res));
};

module.exports = { createItem, getItems, likeItem, dislikeItem, deleteItem};

