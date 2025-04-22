import * as winston from 'winston'
import { Logger } from 'drizzle-orm'

const { combine, timestamp, printf, colorize, align } = winston.format;

export const logger = winston.createLogger({
    level: 'info',
    format: combine(
        colorize({ all: true }),
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        align(),
        printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
    ),
    transports: [new winston.transports.Console()]
})

export const drizzleLogger: Logger = {
    logQuery(query: string, params: unknown[]) {

    },
}
