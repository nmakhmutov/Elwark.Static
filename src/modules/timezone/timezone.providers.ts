import { Connection, Model } from 'mongoose';
import { DATABASE_CONNECTION } from '../../database/database.constants';
import { TIMEZONE_MODEL } from './timezone.constants';
import { TimezoneSchema } from './timezone.schema';
import { Timezone } from './timezone.interface';

export const timezoneProviders = [
    {
        provide: TIMEZONE_MODEL,
        useFactory: (connection: Connection): Model<Timezone> => connection.model('timezones', TimezoneSchema),
        inject: [DATABASE_CONNECTION],
    },
];
