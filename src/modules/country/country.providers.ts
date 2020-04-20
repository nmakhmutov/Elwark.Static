import { Connection, Model } from 'mongoose';
import { DATABASE_CONNECTION } from '../../database/database.constants';
import { COUNTRY_MODEL } from './country.constants';
import { CountrySchema } from './country.schema';
import { Country } from './country.interface';

export const countryProviders = [
    {
        provide: COUNTRY_MODEL,
        useFactory: (connection: Connection): Model<Country> => connection.model('countries', CountrySchema),
        inject: [DATABASE_CONNECTION],
    },
];
