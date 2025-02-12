const { ERROR_MESSAGES, NOT_FOUND } = require("./config");
const{ CustomError } = require("./customerror");

class NotFoundError extends CustomError {
  constructor(message = ERROR_MESSAGES.ITEM_NOT_FOUND || ERROR_MESSAGES.USER_NOT_FOUND ) {
    super(message, NOT_FOUND);
  }
}

module.exports = { NotFoundError }