import { Connection } from 'mongoose';
import { DATABASE_CONNECTION } from '../../database/database.constants';
import { CURRENCY_MODEL } from './currency.constants';
import { CurrencySchema } from './currency.schema';

export const currencyProviders = [
  {
    provide: CURRENCY_MODEL,
    useFactory: (connection: Connection) => connection.model('currencies', CurrencySchema),
    inject: [DATABASE_CONNECTION]
  }
];
