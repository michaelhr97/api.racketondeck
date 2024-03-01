const winston = require('winston');

// Define log levels
const logLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'blue',
  },
};

// Create logger instance
const logger = winston.createLogger({
  levels: logLevels.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    // Custom formatter to stringify JSON objects
    winston.format.printf((info) => {
      if (info.message instanceof Object) {
        info.message = JSON.stringify(info.message, null, 2);
      }
      return `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`;
    })
  ),
  transports: [
    // Console transport
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.colorize({ all: true }),
    }),
    // File transport
    new winston.transports.File({
      level: 'info',
      filename: 'logs/app.log',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      format: winston.format.combine(winston.format.json()),
    }),
  ],
});

module.exports = logger;
