import { Controller, Get, Param } from '@nestjs/common';
import { CurrencyDTO } from './currency.dto';
import { CurrencyService } from './currency.service';

@Controller('currencies')
export class CurrencyController {
    constructor(private readonly currencyService: CurrencyService) {}

    @Get()
    public async Get(): Promise<CurrencyDTO[]> {
        const result = await this.currencyService.getAll();

        return result.map((x) => new CurrencyDTO(x));
    }

    @Get('code/:code')
    public async GetByCode(@Param('code') code: string): Promise<CurrencyDTO> {
        const result = await this.currencyService.getByCode(code);

        return new CurrencyDTO(result);
    }

    @Get('name/:name')
    public async GetByName(@Param('name') name: string): Promise<CurrencyDTO> {
        const result = await this.currencyService.getByName(name);

        return new CurrencyDTO(result);
    }
}
