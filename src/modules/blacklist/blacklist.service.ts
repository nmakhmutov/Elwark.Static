import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { nameof } from '../../utils';
import { BLACKLIST_MODEL } from './blackist.constants';
import { Blacklist, BlacklistType } from './blacklist.interface';

@Injectable()
export class BlacklistService {
    constructor(@Inject(BLACKLIST_MODEL) private readonly blacklistModel: Model<Blacklist>) {}

    public async GetByType(type: BlacklistType): Promise<Blacklist[]> {
        const result = await this.blacklistModel.find({
            [nameof<Blacklist>('type')]: type,
        });

        return result;
    }

    public async IsContains(type: BlacklistType, value: string): Promise<boolean> {
        const result = await this.blacklistModel.count({
            [nameof<Blacklist>('type')]: type,
            [nameof<Blacklist>('value')]: {
                $regex: new RegExp('^' + value + '$', 'i'), // case insensitive
            },
        });

        return result > 0;
    }
}
