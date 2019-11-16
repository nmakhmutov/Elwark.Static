import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { ValidationException } from '../../exeptions/validation.exception';
import { nameof } from '../../utils';
import { LANGUAGE_MODEL } from './language.constants';
import { Language } from './language.interface';

@Injectable()
export class LanguageService {
    constructor(@Inject(LANGUAGE_MODEL) private readonly languageModel: Model<Language>) { }

    public async getAll(): Promise<Language[]> {
        const result = await this.languageModel.find();

        return result;
    }

    public async getMain(): Promise<Language[]> {
        const result = await this.languageModel.find({
            [nameof<Language>('alpha1')]: {
                $ne: null
            }
        });

        return result;
    }

    public async getByAlpha3Code(code: string) {
        if (code.length !== 3)
            throw new ValidationException(`Language alpha 3 code must be with 3 symbols`);

        const result = await this.languageModel.findOne({
            [nameof<Language>('alpha3')]: {
                $regex: code,
                $options: 'i'
            }
        });

        if (result)
            return result;

        throw new NotFoundException(`Language with alpha 3 code ${code} not found.`);
    }

    public async getByAlpha1Code(code: string) {
        if (code.length !== 2)
            throw new ValidationException(`Language alpha 1 code must be with 2 symbols`);

        const result = await this.languageModel.findOne({
            [nameof<Language>('alpha1')]: {
                $regex: code,
                $options: 'i'
            }
        });

        if (result)
            return result;

        throw new NotFoundException(`Language with alpha 1 code ${code} not found.`);
    }
}
