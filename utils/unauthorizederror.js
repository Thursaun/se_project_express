const { ERROR_MESSAGES, UNAUTHORIZED } = require("./config");
const{ CustomError } = require("./customerror");

class UnauthorizedError extends CustomError {
  constructor(message = ERROR_MESSAGES.UNAUTHORIZED) {
    super(message, UNAUTHORIZED);
  }
}

module.exports = { UnauthorizedError }
