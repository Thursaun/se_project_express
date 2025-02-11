const { BAD_REQUEST, CONFLICT, ERROR_MESSAGES, NOT_FOUND, UNAUTHORIZED, UNAUTHORIZED_ACTION } = require("./config");

class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

class BadRequestError extends CustomError {
  constructor(message = ERROR_MESSAGES.VALIDATION_FAILED) {
    super(message, BAD_REQUEST);
  }
}

class UnauthorizedError extends CustomError {
  constructor(message = ERROR_MESSAGES.UNAUTHORIZED) {
    super(message, UNAUTHORIZED);
  }
}

class ForbiddenError extends CustomError {
  constructor(message = ERROR_MESSAGES.UNAUTHORIZED_ACTION) {
    super(message, UNAUTHORIZED_ACTION);
  }
}

class NotFoundError extends CustomError {
  constructor(message = ERROR_MESSAGES.ITEM_NOT_FOUND) {
    super(message, NOT_FOUND);
  }
}

class ConflictError extends CustomError {
  constructor(message = ERROR_MESSAGES.CONFLICT) {
    super(message, CONFLICT)
  }
}


module.exports = {
  CustomError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
}


