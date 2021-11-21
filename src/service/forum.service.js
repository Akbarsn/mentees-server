const { Question, Room } = require("../model");
const validator = require("../validator/forum.validator");
const log = require("../infra/log/winston");
const { SuccessResponse } = require("../util/response");
const { GeneralError } = require("../util/error");

module.exports = {
  CreateQuestion: async (req, res, next) => {
    log.info("[Service] Create question");

    try {
      const value = await validator.CreateQuestionReqSchema.validateAsync(
        req.body
      );

      const room = await Room.create({
        questioner: req.user.id,
        type: "Forum",
      });

      const question = await Question.create({
        ...value,
        room_id: room.id,
      });

      if (question) {
        return SuccessResponse(res, {
          room,
          question,
        });
      } else {
        throw new GeneralError("Query failed");
      }
    } catch (error) {
      next(error);
    }
  },

  GetByID: async (req, res, next) => {
    log.info("[Service] Get question by ID");

    try {
      const question = await Question.findOne({
        where: {
          id: req.params.id,
        },
      });

      const room = await Room.findOne({
        where: {
          id: question.room_id,
        },
      });

      return SuccessResponse(res, {
        question,
        room,
      });
    } catch (error) {
      next(error);
    }
  },
};
