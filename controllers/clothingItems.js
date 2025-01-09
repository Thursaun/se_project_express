const ClothingItem = require('../models/clothingItem');
const { handleError, BAD_REQUEST, NOT_FOUND } = require('../utils/errors');

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  if (!req.user || !req.user._id) {
    return res.status(401).send({ message: 'User not authenticated' });
  }

  if (!name || !weather || !imageUrl) {
    return res.status(BAD_REQUEST).send({ message: 'All fields are required' });
  }

  if (!['hot', 'warm', 'cold'].includes(weather)) {
    return res.status(BAD_REQUEST).send({ message: 'Invalid weather type' });
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

  ClothingItem.findByIdAndDelete(itemId)
  .orFail(() => {
    const error = new Error('Item not found');
    error.statusCode = NOT_FOUND;
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
    error.statusCode = NOT_FOUND;
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
    error.statusCode = NOT_FOUND;
    throw error;
  })
  .then((item) => res.status(200).send({data: item}))
  .catch((err) => handleError(err, res));
};

module.exports = { createItem, getItems, likeItem, dislikeItem, deleteItem};

