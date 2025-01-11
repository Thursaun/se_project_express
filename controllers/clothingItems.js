const ClothingItemModel = require("../models/clothingItem");
const {
  UNAUTHORIZED,
  ERROR_MESSAGES,
  BAD_REQUEST,
  NOT_FOUND,
  UNAUTHORIZED_ACTION,
} = require("../utils/config");
const handleError = require("../utils/errors");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  if (!req.user || !req.user._id) {
    return res
      .status(UNAUTHORIZED)
      .send({ message: ERROR_MESSAGES.UNAUTHORIZED });
  }

  if (!name || !weather || !imageUrl) {
    return res
      .status(BAD_REQUEST)
      .send({ message: ERROR_MESSAGES.INVALID_FIELDS });
  }

  if (!["hot", "warm", "cold"].includes(weather)) {
    return res
      .status(BAD_REQUEST)
      .send({ message: ERROR_MESSAGES.INVALID_WEATHER });
  }

  ClothingItemModel.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(201).send({ data: item }))
    .catch((err) => handleError(err, res));
};

const getItems = (req, res) => {
  ClothingItemModel.find({})
    .then((items) => res.status(200).send({ data: items }))
    .catch((err) => handleError(err, res));
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItemModel.findById(itemId)
    .orFail(() => {
      const error = new Error(ERROR_MESSAGES.ITEM_NOT_FOUND);
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => {
      if (!item.owner === req.user._id) {
        const error = new Error(ERROR_MESSAGES.UNAUTHORIZED_ACTION);
        error.statusCode = UNAUTHORIZED_ACTION;
        throw error;
      }
      return item.deleteOne();
    })
    .then(() => res.status(200).send({ message: "Item deleted successfully" }))
    .catch((err) => handleError(err, res));
};

const likeItem = (req, res) => {
  ClothingItemModel.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error(ERROR_MESSAGES.ITEM_NOT_FOUND);
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => handleError(err, res));
};

const dislikeItem = (req, res) => {
  ClothingItemModel.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error(ERROR_MESSAGES.ITEM_NOT_FOUND);
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => handleError(err, res));
};

module.exports = { createItem, getItems, likeItem, dislikeItem, deleteItem };
