import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { ValidationException } from '../../exeptions/validation.exception';
import { nameof } from '../../utils';
import { CURRENCY_MODEL } from './currency.constants';
import { Currency } from './currency.interface';

@Injectable()
export class CurrencyService {
    constructor(@Inject(CURRENCY_MODEL) private readonly currencyModel: Model<Currency>) {}

    public async getAll(): Promise<Currency[]> {
        const result = await this.currencyModel.find();

        return result;
    }

    public async getByName(name: string): Promise<Currency> {
        const result = await this.currencyModel.findOne({
            [nameof<Currency>('name')]: {
                $regex: name,
                $options: 'i',
            },
        });

        if (result) return result;

        throw new NotFoundException(`Currency ${name} not found.`);
    }

    public async getByCode(code: string): Promise<Currency> {
        if (code.length !== 3) throw new ValidationException(`Currency code must be with 3 symbols`);

        const result = await this.currencyModel.findOne({
            [nameof<Currency>('code')]: {
                $regex: code,
                $options: 'i',
            },
        });

        if (result) return result;

        throw new NotFoundException(`Currency with code ${code} not found.`);
    }
}
