const {
  DEFAULT,
  ERROR_MESSAGES,
  CONFLICT,
} =require('../utils/config');


module.exports = (err, req, res, next) => {
  console.error('Error:', err.name, '| Message:', err.message);

  if (err.code === 11000) {
    return res.status(CONFLICT).send({ message: ERROR_MESSAGES.CONFLICT});
  }
  if (err.statusCode) {
    return res.status(err.statusCode).send ({ message: err.message });
  }

  return res.status(DEFAULT).send({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR});
};
