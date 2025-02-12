const { BAD_REQUEST, ERROR_MESSAGES } = require("./config");
const{ CustomError } = require("./customerror");

class BadRequestError extends CustomError {
  constructor(message = ERROR_MESSAGES.VALIDATION_FAILED) {
    super(message, BAD_REQUEST);
  }
}

module.exports = { BadRequestError };