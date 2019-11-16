import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { ValidationException } from '../../exeptions/validation.exception';
import { nameof } from '../../utils';
import { TIMEZONE_MODEL } from './timezone.constants';
import { Timezone } from './timezone.interface';

@Injectable()
export class TimezoneService {
    constructor(@Inject(TIMEZONE_MODEL) private readonly timezoneModel: Model<Timezone>) { }

    public async getAll(): Promise<Timezone[]> {
        const result = await this.timezoneModel.find();

        return result;
    }

    public async getByTimezone(zone: string): Promise<Timezone> {
        const result = await this.timezoneModel.findOne({
            [nameof<Timezone>('zoneName')]: zone
        });

        if (result)
            return result;

        throw new NotFoundException(`Timezone ${zone} not found.`);
    }

    public async getByCountry3Alpha(code: string): Promise<Timezone[]> {
        if (code.length !== 3)
            throw new ValidationException(`Country code must be with 3 symbols`);

        const result = await this.timezoneModel.find({
            [nameof<Timezone>('alpha3Code')]: {
                $regex: code,
                $options: 'i'

            }
        });

        if (result.length > 0)
            return result;

        throw new NotFoundException(`Timezones for country ${code} not found.`);
    }

    public async getByCountry2Alpha(code: string): Promise<Timezone[]> {
        if (code.length !== 2)
            throw new ValidationException(`Country code must be with 2 symbols`);

        const result = await this.timezoneModel.find({
            [nameof<Timezone>('alpha2Code')]: {
                $regex: code,
                $options: 'i'

            }
        });

        if (result.length > 0)
            return result;

        throw new NotFoundException(`Timezones for country ${code} not found.`);
    }
}
