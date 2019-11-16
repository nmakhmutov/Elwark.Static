import { Connection } from 'mongoose';
import { DATABASE_CONNECTION } from '../../database/database.constants';
import { COUNTRY_MODEL } from './country.constants';
import { CountrySchema } from './country.schema';

export const countryProviders = [
  {
    provide: COUNTRY_MODEL,
    useFactory: (connection: Connection) => connection.model('countries', CountrySchema),
    inject: [DATABASE_CONNECTION]
  }
];
