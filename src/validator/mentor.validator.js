const joi = require('joi');

const SendRequestReqSchema = joi.object({
    mentor_id: joi.number().required()
})

const MentorReqSchema = joi.object({
    mentee_id: joi.number().required(),
    status: joi.string().required()
})

module.exports = {
    SendRequestReqSchema,
    MentorReqSchema
};

