import { Controller, Get, Param } from '@nestjs/common';
import { ValidationException } from '../../exeptions/validation.exception';
import { LanguageDTO } from './language.dto';
import { LanguageService } from './language.service';

@Controller('language')
export class LanguageController {
    constructor(private readonly languageService: LanguageService) { }

    @Get()
    public async Get() {
        const result = await this.languageService.getMain();

        return result.map((x) => new LanguageDTO(x));
    }

    @Get('full')
    public async GetFull() {
        const result = await this.languageService.getAll();

        return result.map((x) => new LanguageDTO(x));
    }

    @Get('code/:code')
    public async GetByCode(@Param('code') code: string) {
        let result;

        switch (code.length) {
            case 2:
                result = await this.languageService.getByAlpha1Code(code);
                break;
            case 3:
                result = await this.languageService.getByAlpha3Code(code);
                break;
            default:
                throw new ValidationException(`Unknown language code format ${code}`);
        }

        return new LanguageDTO(result);
    }
}
