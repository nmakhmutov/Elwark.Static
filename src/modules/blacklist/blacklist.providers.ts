import { Connection } from 'mongoose';
import { DATABASE_CONNECTION } from '../../database/database.constants';
import { BLACKLIST_MODEL } from './blackist.constants';
import { BlacklistSchema } from './blacklist.schema';

export const blaklistProviders = [
  {
    provide: BLACKLIST_MODEL,
    useFactory: (connection: Connection) => connection.model('blacklist', BlacklistSchema),
    inject: [DATABASE_CONNECTION]
  }
];
