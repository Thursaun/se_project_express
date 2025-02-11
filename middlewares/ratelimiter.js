const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many request from this IP, please try again again after 15 minutes",
});

module.exports = limiter;