import { Currency } from './currency.interface';

export class CurrencyDTO {
    public code: string;
    public decimalDigits: number;
    public name: {
        singular: string;
        plural: string;
    };
    public symbol: {
        common: string;
        native: string;
    };

    constructor(currency: Currency) {
        this.code = currency.code;
        this.decimalDigits = currency.decimalDigits;
        this.name = {
            singular: currency.name,
            plural: currency.namePlural,
        };
        this.symbol = {
            common: currency.symbol,
            native: currency.symbolNative,
        };
    }
}
