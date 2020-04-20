import { Global, Module } from '@nestjs/common';
import { loggerProviders } from './logger.providers';
import { LoggerService } from './logger.service';
import { HttpLoggerExceptionInterceptor } from './loggerException.interceptor';

@Global()
@Module({
    providers: [...loggerProviders, LoggerService, HttpLoggerExceptionInterceptor],
    exports: [LoggerService, HttpLoggerExceptionInterceptor],
})
export class LoggerModule {}
