const httpStatus = require("http-status");

class HttpError extends Error {
  constructor(status, message, ...args) {
    super(message, ...args);
    this.message = message || httpStatus[status] || httpStatus[500];
    this.status = status;

    if (args[0]) {
      [this.errors] = args;
    }
  }

  static middleware(req, res, next) {
    res.sendHttpError = (error) => sendHttpError(error, res);
    next();
  }

  toJSON() {
    return {
      status: this.status,
      message: this.message,
      errors: this.errors,
    };
  }
}

module.exports = HttpError;

/* Private */
function sendHttpError(error, res) {
  if (error instanceof Error && error instanceof HttpError === false) {
    console.error(
      error.stack
        .split("\n")
        .map((e) => e.trim())
        .slice(0, 7)
    );
  }
  if (error instanceof HttpError === false) {
    let statusCode = 500;
    let status = httpStatus[500];
    if (typeof error === "number" && error in httpStatus) {
      statusCode = error;
      status = httpStatus[error];
    }
    error = new HttpError(statusCode, status);
  }

  res.statusMessage = error.message;
  res.statusCode = error.status;
  res.json(error);
}
