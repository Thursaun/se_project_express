const jwt = require('jsonwebtoken');
const { UNAUTHORIZED, ERROR_MESSAGES, JWT_SECRET } = require("../utils/config");


const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    const err = new Error(ERROR_MESSAGES.UNAUTHORIZED);
    err.statusCode = UNAUTHORIZED;
    return next(err);
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    err.statusCode = UNAUTHORIZED;
    return next(err);
  };
};

module.exports = auth;