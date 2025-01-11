const { BAD_REQUEST, NOT_FOUND, DEFAULT, ERROR_MESSAGES, CONFLICT, UNAUTHORIZED, UNAUTHORIZED_ACTION} = require('./config');

const handleError = (err, res) => {
  console.error('Error:', err.name, '| Message:', err.message);

  if (err.code === 11000) {
    return res.status(CONFLICT).send({ message: ERROR_MESSAGES.CONFLICT});
  }
  if (err.message === "Incorrect email or password") {
    return res.status(UNAUTHORIZED).send ({ message: ERROR_MESSAGES.INVALID_LOGIN });
  }
  if (err.message === "You are not authoized to delete this item") {
    return res.status(UNAUTHORIZED_ACTION).send ({ message: ERROR_MESSAGES.UNAUTHORIZED_ACTION});
  }
  if (err.name === "ValidationError") {
    return res.status(BAD_REQUEST).send({ message: ERROR_MESSAGES.VALIDATION_FAILED});
  }
  if (err.name === "DocumentNotFoundError" || err.statusCode === NOT_FOUND) {
    return res.status(NOT_FOUND).send({ message: err.message });
  }
  if (err.name === "CastError") {
    return res.status(BAD_REQUEST).send({ message: ERROR_MESSAGES.INVALID_ID_FORMAT});
  }
  return res.status(DEFAULT).send({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR});
};

module.exports = handleError;
