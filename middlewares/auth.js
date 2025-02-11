const jwt = require('jsonwebtoken');
const { ERROR_MESSAGES, JWT_SECRET } = require("../utils/config");
const { UnauthorizedError } = require('../utils/customerror');


const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthorizedError(ERROR_MESSAGES.UNAUTHORIZED));
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return next(new UnauthorizedError(ERROR_MESSAGES.UNAUTHORIZED));
  };
};

module.exports = auth;