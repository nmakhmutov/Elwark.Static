import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { CurrencyController } from './currency.controller';
import { currencyProviders } from './currency.providers';
import { CurrencyService } from './currency.service';

@Module({
    imports: [DatabaseModule],
    controllers: [CurrencyController],
    providers: [CurrencyService, ...currencyProviders],
    exports: [CurrencyService],
})
export class CurrencyModule {}
