import { Connection } from 'mongoose';
import { DATABASE_CONNECTION } from '../../database/database.constants';
import { TIMEZONE_MODEL } from './timezone.constants';
import { TimezoneSchema } from './timezone.schema';

export const timezoneProviders = [
    {
        provide: TIMEZONE_MODEL,
        useFactory: (connection: Connection) => connection.model('timezones', TimezoneSchema),
        inject: [DATABASE_CONNECTION]
    }
];
