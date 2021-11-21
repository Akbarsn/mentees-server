const sequelize = require("sequelize");
const { User, MentoringRequest, Room, UserHistory } = require("../model");
const validator = require("../validator/mentor.validator");
const log = require("../infra/log/winston");
const { SuccessResponse } = require("../util/response");
const { GeneralError } = require("../util/error");

const sortMentor = (user, mentors) => {
  const sortedMentor = [...mentors];

  mentors.forEach((e, idx) => {
    let score = 0;
    user.skill.split("|").forEach((element) => {
      if (e.skill.includes(element)) score++;
    });

    user.interest.split("|").forEach((element) => {
      if (e.interest.includes(element)) score++;
    });

    sortedMentor[idx].score = score;
  });

  sortedMentor.sort((a, b) => {
    if (a.score < b.score) {
      return 1;
    }
    if (a.score > b.score) {
      return -1;
    }
    return 0;
  });

  return sortedMentor;
};

module.exports = {
  GetBestRecommendedMentor: async (req, res, next) => {
    log.info("[Service] Get Recommended Mentor");

    try {
      const mentors = await User.findAll({
        where: {
          role: "Mentor",
        },
      });

      if (mentors) {
        const user = await User.findOne({
          where: {
            id: req.user.id,
          },
        });

        const recomMentor = sortMentor(user, mentors);

        return SuccessResponse(res, recomMentor[0]);
      } else {
        throw new GeneralError("No Mentor Available");
      }
    } catch (error) {
      next(error);
    }
  },

  GetSortedMentor: async (req, res, next) => {
    log.info("[Service] Get All Sorted Mentor");

    try {
      const mentors = await User.findAll({
        where: {
          role: "Mentor",
        },
      });

      if (mentors) {
        const user = await User.findOne({
          where: {
            id: req.user.id,
          },
        });

        const sortedMentor = sortMentor(user, mentors);

        return SuccessResponse(res, sortedMentor);
      } else {
        throw new GeneralError("No Mentor Available");
      }
    } catch (error) {
      next(error);
    }
  },

  GetMentorList: async (req, res, next) => {
    log.info("[Service] Get list mentor");

    try {
      const mentors = await MentoringRequest.findAll({
        where: {
          mentee_id: req.user.id,
          status: "Accept",
        }
      });

      const users = await User.findAll({
        where: {
          id: mentors.map((e) => e.mentor_id),
        },
      });

      return SuccessResponse(res, users);
    } catch (error) {
      next(error);
    }
  },

  GetMenteeList: async (req, res, next) => {
    log.info("[Service] Get list mentee");

    try {
      const mentors = await MentoringRequest.findAll({
        where: {
          mentor_id: req.user.id,
          status: "Accept",
        }
      });

      const users = await User.findAll({
        where: {
          id: mentors.map((e) => e.mentee_id),
        },
      });

      return SuccessResponse(res, users);
    } catch (error) {
      next(error);
    }
  },

  GetPendingMenteeRequest: async (req, res, next) => {
    log.info("[Service] Get list pending mentee");

    try {
      const mentors = await MentoringRequest.findAll({
        where: {
          mentor_id: req.user.id,
          status: "Waiting",
        },
      });

      const users = await User.findAll({
        where: {
          id: mentors.map((e) => e.mentee_id),
        },
      });

      return SuccessResponse(res, users);
    } catch (error) {
      next(error);
    }
  },

  SendRequest: async (req, res, next) => {
    log.info("[Service] Send Request");

    try {
      const value = await validator.SendRequestReqSchema.validateAsync(
        req.body
      );

      const response = await MentoringRequest.create({
        mentee_id: req.user.id,
        mentor_id: value.mentor_id,
        status: "Waiting",
      });

      if (response) {
        return SuccessResponse(res, response);
      } else {
        throw new GeneralError("Query failed");
      }
    } catch (error) {
      next(error);
    }
  },

  AnswerRequest: async (req, res, next) => {
    log.info("[Service] Accept Request");

    try {
      const value = await validator.MentorReqSchema.validateAsync(req.body);

      if (value.status == "Accept") {
        const room = await Room.create({
          questioner: value.mentee_id,
          answerer: req.user.id,
          type: "Mentor",
        });

        await UserHistory.bulkCreate([
          {
            user_id: req.user.id,
            room_id: room.id,
            type: "Mentor",
          },
          {
            user_id: value.mentee_id,
            room_id: room.id,
            type: "Mentor",
          },
        ]);
      }

      const response = await MentoringRequest.update(
        {
          status: value.status,
        },
        {
          where: {
            mentor_id: req.user.id,
            mentee_id: value.mentee_id,
          },
        }
      );

      if (response) {
        return SuccessResponse(res, response);
      } else {
        throw new GeneralError("Query failed");
      }
    } catch (error) {
      next(error);
    }
  },
};
