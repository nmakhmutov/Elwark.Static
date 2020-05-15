import { Controller, Get, Param, Query } from '@nestjs/common';
import { ValidationException } from '../../exeptions/validation.exception';
import { CountryDto } from './country.dto';
import { Country } from './country.interface';
import { CountryService } from './country.service';

@Controller('countries')
export class CountryController {
    constructor(private readonly countryService: CountryService) { }

    @Get()
    public async GetByCodes(@Query('codes') codes: string[]): Promise<CountryDto[]> {
        const result = codes
            ? await this.countryService.getByCodes(codes)
            : await this.countryService.getAll();

        return result.map((x) => new CountryDto(x));
    }

    @Get('code/:code')
    public async GetByCode(@Param('code') code: string): Promise<CountryDto> {
        const result = await this.GetCountryByCode(code);

        return new CountryDto(result);
    }

    @Get('capital/:capital')
    public async GetByCapital(@Param('capital') capital: string): Promise<CountryDto> {
        const result = await this.countryService.getByCapital(capital);

        return new CountryDto(result);
    }

    @Get('name/:name')
    public async GetByName(@Param('name') name: string): Promise<CountryDto> {
        const result = await this.countryService.getByCommonName(name);

        return new CountryDto(result);
    }

    @Get('region/:region')
    public async GetByRegion(@Param('region') region: string): Promise<CountryDto[]> {
        const result = await this.countryService.getByRegion(region);

        return result.map((x) => new CountryDto(x));
    }

    @Get('currency/:currency')
    public async GetByCurrency(@Param('currency') currency: string): Promise<CountryDto[]> {
        const result = await this.countryService.getByCurrency(currency);

        return result.map((x) => new CountryDto(x));
    }

    private GetCountryByCode(code: string): Promise<Country> {
        const numberCode = Number(code);

        if (!isNaN(numberCode)) return this.countryService.getByNumericCode(numberCode);

        switch (code.length) {
            case 2:
                return this.countryService.getByAlpha2Code(code);

            case 3:
                return this.countryService.getByAlpha3Code(code);

            default:
                throw new ValidationException(`Unknown country code format ${code}`);
        }
    }
}
