const { createLogger, transports, format } = require('winston');
const { LOG_FILE, IS_PROD } = require('./constants');

const logger = createLogger({
  level: IS_PROD ? 'info' : 'silly',
});

logger.add(new transports.Console({
  format: format.combine(
    format.colorize(),
    format.simple(),
  ),
}));

if (IS_PROD) {
  logger.add(new transports.File({
    level: 'info',
    filename: LOG_FILE,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 3,
    colorize: false,
    format: format.combine(
      format.timestamp(),
      format.json(),
    ),
  }));
}

module.exports = logger;
