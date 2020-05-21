import { Resolver, Query, Args } from "@nestjs/graphql";
import { CountryService } from './country.service';
import { CountryDto as CountryDto } from './country.dto';
import { CountriesArgs } from "./country.args";

@Resolver(() => CountryDto)
export class CountryResolver {
    constructor(
        private readonly countryService: CountryService
    ) { }

    @Query(() => [CountryDto])
    async countries(@Args() args: CountriesArgs): Promise<CountryDto[]> {
        const result = args.codes
            ? this.countryService.getByCodes(args.codes)
            : this.countryService.getAll()

        return (await result).map(x => new CountryDto(x));
    }

    @Query(() => CountryDto)
    async country(@Args('code') code: string): Promise<CountryDto> {
        const result = await this.countryService.getByAlpha2Code(code);

        return new CountryDto(result);
    }
}