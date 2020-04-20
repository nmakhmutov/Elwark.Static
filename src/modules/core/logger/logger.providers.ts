import { format } from 'logform';
import { createLogger, transports, Logger } from 'winston';
import { LOGGER_WINSTON_PROVIDER } from './logger.constants';

export const loggerProviders = [
    {
        provide: LOGGER_WINSTON_PROVIDER,
        useFactory: (): Logger => {
            const LOG_LEVEL = process.env.LOG_LEVEL;

            return createLogger({
                level: LOG_LEVEL,
                format: format.combine(
                    format.timestamp(),
                    format.printf((nfo) => `${nfo.timestamp} ${nfo.level}: ${nfo.message}`),
                ),
                transports: [
                    new transports.Console({
                        format: format.colorize({ all: true }),
                    }),
                ],
            });
        },
    },
];
