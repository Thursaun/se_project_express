const ClothingItemModel = require("../models/clothingItem");
const {
  UNAUTHORIZED,
  ERROR_MESSAGES,
  BAD_REQUEST,
  NOT_FOUND,
  UNAUTHORIZED_ACTION,
} = require("../utils/config");

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  if (!req.user || !req.user._id) {
    const err = new Error(ERROR_MESSAGES.UNAUTHORIZED);
    err.statusCode = UNAUTHORIZED;
    return next(err);
  }

  if (!name || !weather || !imageUrl) {
    const err = new Error(ERROR_MESSAGES.INVALID_FIELDS);
    err.statusCode = BAD_REQUEST;
    return next(err);
  }

  if (!["hot", "warm", "cold"].includes(weather)) {
    const err = new Error(ERROR_MESSAGES.INVALID_WEATHER);
    err.statusCode = BAD_REQUEST;
    return next(err);
  }

  ClothingItemModel.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(201).send(item))
    .catch(next);
};

const getItems = (req, res, next) => {
  ClothingItemModel.find({})
    .then((items) => res.status(200).send(items))
    .catch(next);
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItemModel.findById(itemId)
    .orFail(() => {
      const err = new Error(ERROR_MESSAGES.ITEM_NOT_FOUND);
      err.statusCode = NOT_FOUND;
      throw err;
    })
    .then((item) => {
      if (!item.owner.equals(req.user._id)) {
        const err = new Error(ERROR_MESSAGES.UNAUTHORIZED_ACTION);
        err.statusCode = UNAUTHORIZED_ACTION;
        throw err;
      }
      return item.deleteOne();
    })
    .then(() => res.send({ message: "Item deleted successfully" }))
    .catch(next);
};

const likeItem = (req, res, next) => {
  ClothingItemModel.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const err = new Error(ERROR_MESSAGES.ITEM_NOT_FOUND);
      err.statusCode = NOT_FOUND;
      throw err;
    })
    .then((item) => res.send(item))
    .catch(next);
};

const dislikeItem = (req, res, next) => {
  ClothingItemModel.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const err = new Error(ERROR_MESSAGES.ITEM_NOT_FOUND);
      err.statusCode = NOT_FOUND;
      throw err;
    })
    .then((item) => res.send(item))
    .catch(next);
};

module.exports = { createItem, getItems, likeItem, dislikeItem, deleteItem };
