import { Connection, Model } from 'mongoose';
import { DATABASE_CONNECTION } from '../../database/database.constants';
import { BLACKLIST_MODEL } from './blackist.constants';
import { BlacklistSchema } from './blacklist.schema';
import { Blacklist } from './blacklist.interface';

export const blaklistProviders = [
    {
        provide: BLACKLIST_MODEL,
        useFactory: (connection: Connection): Model<Blacklist> => connection.model('blacklist', BlacklistSchema),
        inject: [DATABASE_CONNECTION],
    },
];
