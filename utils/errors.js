const { BAD_REQUEST, NOT_FOUND, DEFAULT, ERROR_MESSAGES, CONFLICT} = require('./config');

const handleError = (err, res) => {
  console.error('Error:', err.name, '| Message:', err.message);

  if (err.name === "ValidationError") {
    return res.status(BAD_REQUEST).send({ message: ERROR_MESSAGES.VALIDATION_FAILED});
  }
  if (err.name === "DocumentNotFoundError" || err.statusCode === NOT_FOUND) {
    return res.status(NOT_FOUND).send({ message: err.message });
  }
  if (err.name === "CastError") {
    return res.status(BAD_REQUEST).send({ message: ERROR_MESSAGES.INVALID_ID_FORMAT});
  }
  if (err.name === 11000) {
    return res.status(CONFLICT).send({ message: ERROR_MESSAGES.CONFLICT});
  }
  return res.status(DEFAULT).send({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR});
};

module.exports = handleError;
