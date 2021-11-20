module.exports = {
  SuccessResponse: (res, data) => {
    return res.json({
      success: true,
      errorStack: null,
      data,
    });
  },
  ErrorResponse: (res, statusCode, error) => {
    return res.status(statusCode ?? 500).json({
      success: true,
      errorStack: {
        message: error,
      },
      data: null,
    });
  },
};
