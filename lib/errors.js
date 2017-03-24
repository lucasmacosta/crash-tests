'use strict';

// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types
// for a discussion on custom error types
function ApiError(message, error) {
  Error.captureStackTrace(this, ApiError);
  this.name    = 'ApiError';
  this.message = message || 'Default Error Message';
  // To wrap the original error
  this.error   = error;
}

ApiError.prototype = Object.create(Error.prototype);
ApiError.prototype.constructor = ApiError;

// Function to generate subtypes of ApiError
var createCustomError = function (name, statusCode) {
  var customError = function () {
    ApiError.apply(this, arguments);
    this.name       = name;
    this.statusCode = statusCode;
  };

  customError.prototype = Object.create(ApiError.prototype);
  customError.prototype.constructor = customError;

  return customError;
};

module.exports = {
  ApiError           : ApiError,
  BadRequestError    : createCustomError('BadRequestError', 400),
  UnauthorizedError  : createCustomError('UnauthorizedError', 401),
  ForbiddenError     : createCustomError('ForbiddenError', 403),
  NotFoundError      : createCustomError('NotFoundError', 404),
  InternalServerError: createCustomError('InternalServerError', 500)
};
