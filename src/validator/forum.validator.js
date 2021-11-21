const joi = require("joi")

const CreateQuestionReqSchema = joi.object({
    title: joi.string().required(),
    content: joi.string().required()
})

module.exports = {
    CreateQuestionReqSchema,
}