import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { blaklistProviders } from '../modules/blacklist/blacklist.providers';
import { countryProviders } from '../modules/country/country.providers';
import { currencyProviders } from '../modules/currency/currency.providers';
import { languageProviders } from '../modules/language/language.providers';
import { timezoneProviders } from '../modules/timezone/timezone.providers';
import { SeedService } from './seed.service';

@Module({
    imports: [DatabaseModule],
    providers: [
        SeedService,
        ...blaklistProviders,
        ...countryProviders,
        ...currencyProviders,
        ...languageProviders,
        ...timezoneProviders,
    ],
    exports: [SeedService],
})
export class SeedModule {}
