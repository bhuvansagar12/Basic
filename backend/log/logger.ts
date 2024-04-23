import winston from 'winston';
const { combine, timestamp , printf } = winston.format;

// const customFormat = printf(({ level, message, timestamp, url, response, statusCode }) => {
//     return `${timestamp} ${level}: ${message} - URL: ${url}, Response: ${response}, Status Code: ${statusCode}`;
// });

const Consoletransport = new winston.transports.Console({
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint()
    )
})

const Logger = winston.createLogger({
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD hh:mm:ss.SSS A',
        }), //customFormat,
        winston.format.json()
    ),
    transports: Consoletransport
});

export { Logger };