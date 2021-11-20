const jwt = require("jsonwebtoken");
const envDriver = require("../infra/env/env_driver");
const { NoToken, GeneralError } = require("../util/error");

const JWT_SECRET = envDriver.GetJWTEnv().Secret;

module.exports = {
  async CheckToken(req, res, next) {
    const header = req.headers.authorization;
    try {
      if (header) {
        const token = header.split(" ")[1];

        if (token) {
          const payload = jwt.verify(token, JWT_SECRET);

          if (payload) {
            req.user = payload;
            next();
          } else {
            throw new GeneralError("Payload not found");
          }
        } else {
          throw new NoToken("Token missing or invalid");
        }
      } else {
        throw new NoToken("Token missing or invalid");
      }
    } catch (error) {
      next(error);
    }
  },
};
