import { Country } from './country.interface';

// https://restcountries.eu/rest/v2/all

export class CountryTranslationDTO {
    constructor(public language: string, public common: string, public official: string) { }
}

export class CountryNameDTO {
    constructor(public common: string, public official: string, public native: CountryTranslationDTO[]) { }
}

export class CountryRegionalBlockDTO {
    constructor(public acronym: string, public name: string) { }
}

export class CountryDTO {
    public alpha2Code: string;
    public alpha3Code: string;
    public numericCode: string;
    public area: number;
    public borders: string[];
    public callingCodes: number[];
    public capital: string | undefined;
    public currencies: string[];
    public demonym: string;
    public flag: string;
    public independent: boolean;
    public landlocked: boolean;
    public languages: string[];
    public latitude: number; // широта
    public longitude: number; // долгота
    public name: CountryNameDTO;
    public timezones: string[];
    public region: string | undefined;
    public regionalBlocs: CountryRegionalBlockDTO[];
    public subregion: string | undefined;
    public topLevelDomain: string[];
    public translations: CountryTranslationDTO[];

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
        this.name = new CountryNameDTO(
            country.name.common,
            country.name.official,
            country.name.native.map((x) => new CountryTranslationDTO(x.language,  x.common, x.official))
        );
        this.region = country.region;
        this.timezones = country.timezones;
        this.regionalBlocs = country.regionalBlocs.map((x) => new CountryRegionalBlockDTO(x.acronym, x.name));
        this.subregion = country.subregion;
        this.topLevelDomain = country.topLevelDomain;
        this.translations = country.translations.map((x) => new CountryTranslationDTO(x.language, x.common, x.official));
    }
}