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
      new winston.transports.File({ filename: './logger/error.log', level: 'error' }),
      new winston.transports.File({ filename: './logger/combined.log' }),
    ],
  });
  module.exports = logger;