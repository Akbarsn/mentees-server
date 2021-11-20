const winston = require('winston');

const logger = new winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({
            filename: '../../logs/error.log',
            level: 'error'
        }),
        new winston.transports.File({
            filename: '../../logs/common.log'
        })
    ]
})

if (process.env.NODE_ENV !== 'Production') {
    logger.add(new winston.transports.Console({
        level: 'debug',
        colorize: true,
        format: winston.format.simple()
    }))
}

module.exports = logger