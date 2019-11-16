import { Document } from 'mongoose';

export interface CountryName {
    common: string;
    official: string;
}

export interface RegionalBlock {
    acronym: string;
    name: string;
}

export interface Country extends Document {
    readonly alpha2Code: string;
    readonly alpha3Code: string;
    readonly numericCode: string;
    readonly area: number;
    readonly borders: string[];
    readonly callingCodes: number[];
    readonly capital?: string;
    readonly currencies: string[];
    readonly demonym: string;
    readonly flag: string;
    readonly independent: boolean;
    readonly landlocked: boolean;
    readonly languages: string[];
    readonly latitude: number; // широта
    readonly longitude: number; // долгота
    readonly name: {
        common: string;
        official: string;
        native: { [code: string]: CountryName }
    };
    readonly timezones: string[];
    readonly region?: string;
    readonly regionalBlocs: RegionalBlock[];
    readonly subregion?: string;
    readonly topLevelDomain: string[];
    readonly translations: { [code: string]: CountryName };
}
