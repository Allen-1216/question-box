const ApiError = require('../error/ApiError')

function apiErrorHandler (err, req, res) {
    //in prod don't use console.log or console.err because
    //it is not async
    //console.error(err)

    if(err instanceof ApiError){
        res.status(err.code).json(err.message);
        return;
    }
    if(err.status === 404){
        res.status(404).json('API not found');
        return;
    }
    res.status(500).json('something went wrong')
}

module.exports = apiErrorHandler;