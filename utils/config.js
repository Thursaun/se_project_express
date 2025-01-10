// JWT Token (Secet)
const JWT_SECRET = 'The boy who lived';

// HTTP Status Codes
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const UNAUTHORIZED_ACTION = 403;
const NOT_FOUND = 404;
const DEFAULT = 500;
const CONFLICT = 409;

// Error Messages
const ERROR_MESSAGES = {
  CONFLICT: 'A user with this email already exists',
  UNAUTHORIZED: 'User not authenticated',
  UNAUTHORIZED_ACTION: 'You are not authoized to delete this item',
  INVALID_FIELDS: 'All fields are required',
  NAME_LENGTH: 'Name must be between 2 and 30 characters',
  INVALID_WEATHER: 'Invalid weather type',
  INVALID_LOGIN: 'Email and password are required',
  ITEM_NOT_FOUND: 'Item not found',
  USER_NOT_FOUND: 'User not found',
  INVALID_ID_FORMAT: 'Invalid ID format',
  INTERNAL_SERVER_ERROR: 'Internal server error',
  VALIDATION_FAILED: 'Validation failed. Check input fields.',
};

module.exports = { BAD_REQUEST, UNAUTHORIZED, NOT_FOUND, DEFAULT, CONFLICT, ERROR_MESSAGES, JWT_SECRET };