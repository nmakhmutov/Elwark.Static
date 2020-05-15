import { Country } from './country.interface';
import { ObjectType, Field, Int } from '@nestjs/graphql';

// https://restcountries.eu/rest/v2/all

@ObjectType()
export class CountryTranslationDto {
    @Field()
    public language: string;

    @Field()
    public common: string;

    @Field()
    public official: string;

    constructor(language: string, common: string, official: string) {
        this.language = language;
        this.common = common;
        this.official = official;
    }
}

@ObjectType()
export class CountryNameDto {
    @Field()
    public common: string;

    @Field()
    public official: string;

    @Field(() => [CountryTranslationDto])
    public native: CountryTranslationDto[];

    constructor(common: string, official: string, native: CountryTranslationDto[]) {
        this.common = common;
        this.official = official;
        this.native = native;
    }
}

@ObjectType()
export class CountryRegionalBlockDto {
    @Field()
    public acronym: string;

    @Field()
    public name: string;

    constructor(acronym: string, name: string) {
        this.acronym = acronym;
        this.name = name;
    }
}

@ObjectType()
export class CountryDto {
    @Field()
    public alpha2Code: string;

    @Field()
    public alpha3Code: string;

    @Field()
    public numericCode: string;

    @Field(() => Number)
    public area: number;

    @Field(() => [String])
    public borders: string[];

    @Field(() => [Int])
    public callingCodes: number[];

    @Field(() => String, { nullable: true })
    public capital: string | undefined;

    @Field(() => [String])
    public currencies: string[];

    @Field()
    public demonym: string;

    @Field()
    public flag: string;

    @Field()
    public independent: boolean;

    @Field()
    public landlocked: boolean;

    @Field(() => [String])
    public languages: string[];

    @Field()
    public latitude: number;

    @Field()
    public longitude: number;

    @Field(() => CountryNameDto)
    public name: CountryNameDto;

    @Field(() => [String])
    public timezones: string[];

    @Field(() => String, { nullable: true })
    public region: string | undefined;

    @Field(() => [CountryRegionalBlockDto])
    public regionalBlocs: CountryRegionalBlockDto[];

    @Field(() => String, { nullable: true })
    public subregion: string | undefined;

    @Field(() => [String])
    public topLevelDomain: string[];

    @Field(() => [CountryTranslationDto])
    public translations: CountryTranslationDto[];

    constructor(country: Country) {
        this.alpha2Code = country.alpha2Code;
        this.alpha3Code = country.alpha3Code;
        this.numericCode = country.numericCode;
        this.area = country.area;
        this.borders = country.borders;
        this.callingCodes = country.callingCodes;
        this.capital = country.capital;
        this.currencies = country.currencies;
        this.demonym = country.demonym;
        this.flag = `https://restcountries.eu/data/${country.flag}`;
        this.independent = country.independent;
        this.landlocked = country.landlocked;
        this.languages = country.languages;
        this.latitude = country.latitude;
        this.longitude = country.longitude;
        this.name = new CountryNameDto(
            country.name.common,
            country.name.official,
            country.name.native.map((x) => new CountryTranslationDto(x.language, x.common, x.official)),
        );
        this.region = country.region;
        this.timezones = country.timezones;
        this.regionalBlocs = country.regionalBlocs.map((x) => new CountryRegionalBlockDto(x.acronym, x.name));
        this.subregion = country.subregion;
        this.topLevelDomain = country.topLevelDomain;
        this.translations = country.translations.map(
            (x) => new CountryTranslationDto(x.language, x.common, x.official),
        );
    }
}
