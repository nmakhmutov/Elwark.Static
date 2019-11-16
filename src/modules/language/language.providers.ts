import { Connection } from 'mongoose';
import { DATABASE_CONNECTION } from '../../database/database.constants';
import { LANGUAGE_MODEL } from './language.constants';
import { LanguageSchema } from './language.schema';

export const languageProviders = [
    {
        provide: LANGUAGE_MODEL,
        useFactory: (connection: Connection) => connection.model('languages', LanguageSchema),
        inject: [DATABASE_CONNECTION]
    }
];
