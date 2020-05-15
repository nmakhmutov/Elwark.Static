import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { CountryController } from './country.controller';
import { countryProviders } from './country.providers';
import { CountryService } from './country.service';
import { CountryResolver } from './country.resolver';

@Module({
    imports: [DatabaseModule],
    controllers: [CountryController],
    providers: [CountryService, CountryResolver, ...countryProviders],
    exports: [CountryService],
})
export class CountryModule {}
