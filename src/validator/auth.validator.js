const joi = require('joi');

const loginReqSchema = joi.object({
    username: joi.string().alphanum().required(),
    password: joi.string().alphanum().required()
})

const registerReqSchema = joi.object({
    username: joi.string().alphanum().required(),
    email: joi.string().email().required(),
    first_name: joi.string().required(),
    last_name: joi.string().required(),
    password: joi.string().alphanum().required(),
    gender: joi.string().required(),
    birth_date: joi.date().required(),
    nationality: joi.string().required(),
    current_study: joi.string().required(),
    university: joi.string().required(),
    major: joi.string().required(),
    interest: joi.string().required(),
    skill: joi.string().required(),
    achievement: joi.string(),
    bio: joi.string().required(),
    role: joi.string().required()
})

module.exports = {
    loginReqSchema,
    registerReqSchema
};
