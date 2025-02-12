const { ERROR_MESSAGES, UNAUTHORIZED_ACTION } = require("./config");
const{ CustomError } = require("./customerror");

class ForbiddenError extends CustomError {
  constructor(message = ERROR_MESSAGES.UNAUTHORIZED_ACTION) {
    super(message, UNAUTHORIZED_ACTION);
  }
}

module.exports = { ForbiddenError }