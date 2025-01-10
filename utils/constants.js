// HTTP Status Codes
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const DEFAULT = 500;

// Error Messages
const ERROR_MESSAGES = {
  UNAUTHORIZED: 'User not authenticated',
  INVALID_FIELDS: 'All fields are required',
  NAME_LENGTH: 'Name must be between 2 and 30 characters',
  INVALID_WEATHER: 'Invalid weather type',
  ITEM_NOT_FOUND: 'Item not found',
  USER_NOT_FOUND: 'User not found',
  INVALID_ID_FORMAT: 'Invalid ID format',
  INTERNAL_SERVER_ERROR: 'Internal server error',
  VALIDATION_FAILED: 'Validation failed. Check input fields.',
};

module.exports = { BAD_REQUEST, UNAUTHORIZED, NOT_FOUND, DEFAULT, ERROR_MESSAGES, };