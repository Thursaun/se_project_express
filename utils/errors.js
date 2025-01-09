const { BAD_REQUEST, NOT_FOUND, DEFAULT } = require('./constants');

const handleError = (err, res) => {

  console.error(err);
  if (err.name === "ValidationError") {
    return res.status(BAD_REQUEST).send({ message: 'Validation failed. Check input fields.'});
  }
  if (err.name === "DocumentNotFoundError") {
    return res.status(NOT_FOUND).send({ message: err.message });
  }
  if (err.name === "CastError") {
    return res.status(BAD_REQUEST).send({ message: 'Invalid ID format.'});
  }
  return res.status(DEFAULT).send({ message: 'Internal server error'})
};

module.exports = handleError;
