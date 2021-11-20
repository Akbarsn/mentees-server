const { User } = require("../model");
const log = require("../infra/log/winston");
const { SuccessResponse } = require("../util/response");

module.exports = {
  GetProfile: async (req, res, next) => {
    try {
      log.info("[Service] Get Profile");

      const user = await User.findOne({
        where: {
          id: req.user.id,
        },
      });

      return SuccessResponse(res, user);
    } catch (error) {
      next(error);
    }
  }
};
