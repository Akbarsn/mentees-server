class GeneralError extends Error {
  constructor(code, message) {
    super();
    this.message = message;
  }

  getCode() {
    if (this instanceof BadRequest) {
      return 400;
    }
    if (this instanceof NotFound) {
      return 404;
    }
    if (this instanceof NoToken) {
      return 401;
    }
    if (this instanceof NotAcceptable) {
      return 406;
    }
    return 500;
  }
}

class BadRequest extends GeneralError {}
class NotFound extends GeneralError {}
class NoToken extends GeneralError {}
class NotAcceptable extends GeneralError {}

module.exports = {
  GeneralError,
  BadRequest,
  NotFound,
  NoToken,
  NotAcceptable,
};
