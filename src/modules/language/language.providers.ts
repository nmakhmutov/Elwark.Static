import { Connection, Model } from 'mongoose';
import { DATABASE_CONNECTION } from '../../database/database.constants';
import { LANGUAGE_MODEL } from './language.constants';
import { LanguageSchema } from './language.schema';
import { Language } from './language.interface';

export const languageProviders = [
    {
        provide: LANGUAGE_MODEL,
        useFactory: (connection: Connection): Model<Language> => connection.model('languages', LanguageSchema),
        inject: [DATABASE_CONNECTION]
    }
];
