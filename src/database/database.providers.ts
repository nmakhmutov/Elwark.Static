import * as mongoose from 'mongoose';
import { LoggerService } from '../modules/core/logger/logger.service';
import { DATABASE_CONNECTION } from './database.constants';

export const databaseProviders = [
    {
        provide: DATABASE_CONNECTION,
        useFactory: async (loggerService: LoggerService): Promise<typeof mongoose> => {
            const connection = () => mongoose.connect(process.env.MONGODB_URL!, {
                user: process.env.MONGODB_USER,
                pass: process.env.MONGODB_PASSWORD,
                dbName: process.env.MONGODB_DATABASE_NAME,
                useCreateIndex: true,
                useNewUrlParser: true,
                useFindAndModify: false,
                appname: 'elwark.storage'
            });

            mongoose.connection.on('connected', () => loggerService.info(`Mongoose default connection is open to , ${process.env.MONGODB_URL}`));
            mongoose.connection.on('disconnected', () => loggerService.warn('Mongoose default connection is disconnected'));
            mongoose.connection.on('error', (error) => loggerService.error(`Mongoose default connection has occured ${error} error`));

            return connection();
        },
        inject: [LoggerService]
    }
];
