const ApiError = require('../error/ApiError')

// eslint-disable-next-line
function apiErrorHandler (error, req, res, next) {
    //in prod don't use console.log or console.err because
    //it is not async
    //console.error(err)

    if (error instanceof ApiError) {
        return res.status(error.code).json({HTTP_Status: error.code , message: error.message, error: error.error, state: error.state});
    }
    if (error.status === 404) {
        return res.status(404).json({ error: 'API not found' });
    }
    return res.status(500).json({ error: 'Something went wrong' });
}

module.exports = apiErrorHandler;