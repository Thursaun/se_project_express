const ClothingItemModel = require("../models/clothingItem");
const { ERROR_MESSAGES } = require("../utils/config");
const { UnauthorizedError, BadRequestError, NotFoundError, ForbiddenError } = require("../utils/customerror");

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  if (!req.user || !req.user._id) {
    return next(new UnauthorizedError(ERROR_MESSAGES.UNAUTHORIZED));
  }

  if (!name || !weather || !imageUrl) {
    return next(new BadRequestError(ERROR_MESSAGES.INVALID_FIELDS));
  }

  if (!["hot", "warm", "cold"].includes(weather)) {
    return next(new BadRequestError(ERROR_MESSAGES.INVALID_WEATHER));
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
    .orFail(() => new NotFoundError(ERROR_MESSAGES.ITEM_NOT_FOUND))
    .then((item) => {
      if (!item.owner.equals(req.user._id)) {
        return next(new ForbiddenError(ERROR_MESSAGES.UNAUTHORIZED_ACTION));
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
    .orFail(() => new NotFoundError(ERROR_MESSAGES.ITEM_NOT_FOUND))
    .then((item) => res.send(item))
    .catch(next);
};

const dislikeItem = (req, res, next) => {
  ClothingItemModel.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true }
  )
    .orFail(() => new NotFoundError(ERROR_MESSAGES.ITEM_NOT_FOUND))
    .then((item) => res.send(item))
    .catch(next);
};

module.exports = { createItem, getItems, likeItem, dislikeItem, deleteItem };
