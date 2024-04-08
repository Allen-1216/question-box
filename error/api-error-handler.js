const ApiError = require('../error/ApiError')
const logger = require('../logger/logging');




// eslint-disable-next-line
function apiErrorHandler (error, req, res, next) {
    //in prod don't use console.log or console.err because
    //it is not async
    //console.error(err)

    if (error instanceof ApiError) {
      logger.error(error);
        return res.status(error.code).json({HTTP_Status: error.code , message: error.message});
    }
    logger.error(error);
    return res.status(500).json({ error: 'Something went wrong' });
}

module.exports = apiErrorHandler;