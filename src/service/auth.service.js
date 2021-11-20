const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const envDriver = require("../infra/env/env_driver");
const { User } = require("../model");
const validator = require("../validator/auth.validator");
const { GeneralError, BadRequest, NotAcceptable } = require("../util/error");
const { SuccessResponse } = require("../util/response");
const log = require("../infra/log/winston");

const JWT_SECRET = envDriver.GetJWTEnv().Secret;

module.exports = {
  LoginService: async (req, res, next) => {
    log.info("[Service] Login");

    try {
      const value = await validator.loginReqSchema.validateAsync(req.body);

      const user = await User.findOne({
        where: {
          username: value.username,
        },
      });

      if (user) {
        const checkPassword = await bcrypt.compare(
          value.password,
          user.password
        );
        if (checkPassword) {
          const payload = {
            id: user.id,
          };

          const token = jwt.sign(payload, JWT_SECRET);
          if (token) {
            return SuccessResponse(res, { user, token });
          } else {
            throw new GeneralError("Token not generated");
          }
        } else {
          throw new NotAcceptable("Wrong password");
        }
      } else {
        throw new NotAcceptable("Username not found");
      }
    } catch (error) {
      next(error);
    }
  },

  RegisterService: async (req, res, next) => {
    log.info("[Service] Register");

    try {
      const value = await validator.registerReqSchema.validateAsync(req.body);

      const hashedPassword = await bcrypt.hash(value.password, 12);

      if (hashedPassword) {
        const objToSave = {
          ...value,
          password: hashedPassword,
        };

        const response = await User.create(objToSave);
        console.log(response);
        if (response) {
          return SuccessResponse(res, objToSave);
        } else {
          throw new GeneralError("Inserting error");
        }
      } else {
        throw new GeneralError("Hashing error");
      }
    } catch (error) {
      next(error);
    }
  },
};
