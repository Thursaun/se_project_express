const jwt = require("jsonwebtoken");
const { UNAUTHORIZED, ERROR_MESSAGES, JWT_SECRET } = require("../utils/config");
const handleError = require("../utils/errors");


const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(UNAUTHORIZED).send({ message: ERROR_MESSAGES.UNAUTHORIZED});
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    console.log('User::::::', req.user);
    next();
  } catch (err) {
    return handleError(err, res)
  };
};

module.exports = auth;