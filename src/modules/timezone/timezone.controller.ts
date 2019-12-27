import { Controller, Get, Param } from '@nestjs/common';
import { ValidationException } from '../../exeptions/validation.exception';
import { TimezoneDTO } from './timezone.dto';
import { TimezoneService } from './timezone.service';

@Controller('timezones')
export class TimezoneController {
    constructor(private readonly timezoneService: TimezoneService) { }

    @Get()
    public async GetAll() {
        const result = await this.timezoneService.getAll();

        return result.map((x) => new TimezoneDTO(x));
    }

    @Get('zone/:zone')
    public async GetByZone(@Param('zone') zone: string) {
        const result = await this.timezoneService.getByTimezone(zone);

        return new TimezoneDTO(result);
    }

    @Get('contry/:code')
    public async GetByCode(@Param('code') code: string) {
        let result;
        switch (code.length) {
            case 2:
                result = await this.timezoneService.getByCountry2Alpha(code);
                break;
            case 3:
                result = await this.timezoneService.getByCountry3Alpha(code);
                break;
            default:
                throw new ValidationException(`Incorrect country code ${code}`);
        }

        return result.map((x) => new TimezoneDTO(x));
    }
}
