/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject, Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import { Logger as WinstonLogger } from 'winston';
import { LOGGER_LEVEL, LOGGER_WINSTON_PROVIDER } from './logger.constants';

@Injectable()
export class LoggerService implements NestLoggerService {
    constructor(@Inject(LOGGER_WINSTON_PROVIDER) private logger: WinstonLogger) {}

    public log(level: LOGGER_LEVEL, msg: string, ...meta: any[]): void {
        this.logger.log(level, msg, ...meta);
    }

    public debug(msg: string, ...meta: any[]): void {
        this.logger.debug(msg, ...meta);
    }

    public error(msg: string, ...meta: any[]): void {
        this.logger.error(msg, ...meta);
    }

    public warn(msg: string, ...meta: any[]): void {
        this.logger.warn(msg, ...meta);
    }

    public info(msg: string, ...meta: any[]): void {
        this.logger.info(msg, ...meta);
    }

    public silly(msg: string, ...meta: any[]): void {
        this.logger.silly(msg, ...meta);
    }
}
