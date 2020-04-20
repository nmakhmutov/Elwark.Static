import { Connection, Model } from 'mongoose';
import { DATABASE_CONNECTION } from '../../database/database.constants';
import { CURRENCY_MODEL } from './currency.constants';
import { CurrencySchema } from './currency.schema';
import { Currency } from './currency.interface';

export const currencyProviders = [
    {
        provide: CURRENCY_MODEL,
        useFactory: (connection: Connection): Model<Currency> => connection.model('currencies', CurrencySchema),
        inject: [DATABASE_CONNECTION],
    },
];
