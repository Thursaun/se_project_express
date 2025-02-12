const { CONFLICT, ERROR_MESSAGES } = require("./config");
const{ CustomError } = require("./customerror");

class ConflictError extends CustomError {
  constructor(message = ERROR_MESSAGES.CONFLICT) {
    super(message, CONFLICT)
  }
}

module.exports = { ConflictError };

