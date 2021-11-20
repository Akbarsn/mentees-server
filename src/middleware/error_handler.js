const { GeneralError } = require('../util/error')
const { ErrorResponse } = require('../util/response')

const handleErrors = (err, req, res, next) => {
    if (err instanceof GeneralError) {
        return ErrorResponse(res, err.getCode(), err)
    }

    return ErrorResponse(res, 500, err)
}

const handleNotFound = (req, res) => {
    return ErrorResponse(res, 404, "Endpoint not found")
}

module.exports = { handleErrors, handleNotFound }