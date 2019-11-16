import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SeedModule } from '../seed/seed.module';
import { BlacklistModule } from './blacklist/blacklist.module';
import { LoggerMiddleware } from './core/logger/logger.middleware';
import { LoggerModule } from './core/logger/logger.module';
import { HttpLoggerExceptionInterceptor } from './core/logger/loggerException.interceptor';
import { UtilsModule } from './core/utils/utils.module';
import { CountryModule } from './country/country.module';
import { CurrencyModule } from './currency/currency.module';
import { ImageModule } from './image/image.module';
import { LanguageModule } from './language/language.module';
import { TimezoneModule } from './timezone/timezone.module';

@Module({
    imports: [
        LoggerModule,
        UtilsModule,

        CountryModule,
        CurrencyModule,
        BlacklistModule,
        LanguageModule,
        TimezoneModule,
        ImageModule,
        SeedModule
    ],
    providers: [{
        provide: APP_INTERCEPTOR,
        useClass: HttpLoggerExceptionInterceptor
    }]
})
export class ApiModule implements NestModule {
    public configure(consumer: MiddlewareConsumer): void | MiddlewareConsumer {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes('*');
    }
}
