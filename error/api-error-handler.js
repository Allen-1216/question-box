const ApiError = require('../error/ApiError')
const winston = require('winston');
const { combine, timestamp, printf } = winston.format;

//生成logger
const logger = winston.createLogger({
    level: 'info',
    format: combine(
      timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        printf((info) => `${info.timestamp} ${info.level} ${info.code} ${info.message}`)
      ),
    defaultMeta: { service: 'user-service'},
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });

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