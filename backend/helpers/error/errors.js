/**
 * Here is a repo of most common Errors that can be used accross application
 */
const HttpError = require("./http-error");

/* Public */
/**
 * Object exists but should not.
 */
class ExistsError extends HttpError {
  constructor(message, ...args) {
    super(409, message, ...args);
  }
}
/**
 * Object does not exist.
 */
class NotExistsError extends HttpError {
  constructor(message, ...args) {
    super(404, message, ...args);
  }
}
/**
 * Object does not exist.
 */
class InvalidFormError extends HttpError {
  constructor(fields, ...args) {
    super(422, "Invalid Form", fields, ...args);
  }
}
/**
 * Object access denied.
 */
class ForbiddenError extends HttpError {
  constructor(message, ...args) {
    super(403, message, ...args);
  }
}
/**
 * Object access denied.
 */
class BannedError extends HttpError {
  constructor(message, ...args) {
    super(418, "Your account is banned", ...args);
  }
}
/**
 * Internal Server Error
 */
class ServerError extends HttpError {
  constructor(message, ...args) {
    super(500, "Internal Server Error", ...args);
    console.error(message);
  }
}
/**
 * Database querying error
 */
class DatabaseError extends ServerError {}
/**
 * Unexpected instace error
 */
class InstanceError extends ServerError {}
/**
 * Model definition error
 */
class ModelError extends ServerError {}

/* Definition */
module.exports = {
  HttpError,

  ExistsError,
  NotExistsError,
  InvalidFormError,
  ForbiddenError,
  BannedError,

  ServerError,
  DatabaseError,
  InstanceError,
  ModelError,
};
