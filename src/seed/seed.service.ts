import { Inject, Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { Model } from 'mongoose';
import { join } from 'path';
import { BLACKLIST_MODEL } from '../modules/blacklist/blackist.constants';
import { Blacklist } from '../modules/blacklist/blacklist.interface';
import { LoggerService } from '../modules/core/logger/logger.service';
import { COUNTRY_MODEL } from '../modules/country/country.constants';
import { Country } from '../modules/country/country.interface';
import { CURRENCY_MODEL } from '../modules/currency/currency.constants';
import { Currency } from '../modules/currency/currency.interface';
import { LANGUAGE_MODEL } from '../modules/language/language.constants';
import { Language } from '../modules/language/language.interface';
import { TIMEZONE_MODEL } from '../modules/timezone/timezone.constants';
import { Timezone } from '../modules/timezone/timezone.interface';

@Injectable()
export class SeedService {
    private readonly baseDir = join(__dirname, '..', '..', 'public', 'setup');

    constructor(
        private readonly loggerService: LoggerService,
        @Inject(BLACKLIST_MODEL) private readonly blacklistModel: Model<Blacklist>,
        @Inject(COUNTRY_MODEL) private readonly countryModel: Model<Country>,
        @Inject(CURRENCY_MODEL) private readonly currencyModel: Model<Currency>,
        @Inject(LANGUAGE_MODEL) private readonly languageModel: Model<Language>,
        @Inject(TIMEZONE_MODEL) private readonly timezoneModel: Model<Timezone>
    ) { }

    public async Seed() {
        const tasks: Array<Promise<void>> = [];

        if (await this.blacklistModel.countDocuments({}) === 0)
            tasks.push(this.SeedBlacklist());

        if (await this.countryModel.countDocuments({}) === 0)
            tasks.push(this.SeedCountry());

        if (await this.languageModel.countDocuments({}) === 0)
            tasks.push(this.SeedLanguages());

        if (await this.timezoneModel.countDocuments({}) === 0)
            tasks.push(this.SeedTimezone());

        if (await this.currencyModel.countDocuments({}) === 0)
            tasks.push(this.SeedCurrency());

        if (tasks.length > 0) {
            await Promise.all(tasks);
            this.loggerService.info('Seed ended');
        }
    }

    private async SeedBlacklist(): Promise<void> {
        this.loggerService.info('Seed blacklist');

        const data = await readFileSync(join(this.baseDir, 'blacklist.json'), { encoding: 'utf8' });
        const blackist = JSON.parse(data) as Blacklist[];

        const result = await this.blacklistModel.insertMany(blackist);
        for (const item of result)
            this.loggerService.info(`Blocked: ${item.id} ${item.value}`);
    }

    private async SeedCountry(): Promise<void> {
        this.loggerService.info('Seed countries');

        const data = await readFileSync(join(this.baseDir, 'countries.json'), { encoding: 'utf8' });
        const countries = JSON.parse(data) as Country[];

        const result = await this.countryModel.insertMany(countries);
        for (const country of result)
            this.loggerService.info(`Country: ${country.id} ${country.alpha3Code}`);
    }

    private async SeedCurrency(): Promise<void> {
        this.loggerService.info('Seed currencies');

        const data = await readFileSync(join(this.baseDir, 'currencies.json'), { encoding: 'utf8' });
        const currencies = JSON.parse(data) as Currency[];

        const result = await this.currencyModel.insertMany(currencies);
        for (const currency of result)
            this.loggerService.info(`Currency: ${currency.id} ${currency.name}`);
    }

    private async SeedLanguages(): Promise<void> {
        this.loggerService.info('Seed languages');

        const data = await readFileSync(join(this.baseDir, 'languages.json'), { encoding: 'utf8' });
        const languages = JSON.parse(data) as Language[];

        const result = await this.languageModel.insertMany(languages);
        for (const language of result)
            this.loggerService.info(`Language: ${language.id} ${language.name}`);
    }

    private async SeedTimezone(): Promise<void> {
        this.loggerService.info('Seed timezones');

        const data = await readFileSync(join(this.baseDir, 'timezones.json'), { encoding: 'utf8' });
        const timezones = (JSON.parse(data) as Timezone[]);

        const result = await this.timezoneModel.insertMany(timezones);
        for (const timezone of result)
            this.loggerService.info(`Timezone: ${timezone.id} ${timezone.zoneName}`);
    }
}
