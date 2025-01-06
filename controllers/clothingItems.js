const ClothingItem = require('../models/clothingItem');

const createItem = (req, res) => {
  console.log(res);
  console.log(req.body);

  const { name, weather, imageURL } = req.body;

  ClothingItem.create({name, weather, imageURL})
  .then((item) => {
    console.log(item);
    res.status(201).send({data: item})
  })
  .catch((err) => {
    console.error(err);
    if (err.name === "ValidationError") {
      return res.status(400).send({ message: err.message})
    }
    return res.status(500).send({ message: err.message})
  });
};

const getItems = (req, res) => {
  ClothingItem.find({})
  .then((items) => res.status(200).send({data: items}))
  .catch((err) => {
    console.error(err);
    return res.status(500).send({ message: err.message})
  });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
  .orFail()
  .then((item) => res.status(200).send({data: item}))
  .catch((err) => {
    console.error(err);
    if (err.name === "DocumentNotFoundError") {
      return res.status(404).send({ message: err.message})
    }
    if (err.name === "CastError") {
      return res.status(400).send({ message: err.message})
    }
    return res.status(500).send({ message: err.message})
  });
}

module.exports = {createItem, getItems, deleteItem};