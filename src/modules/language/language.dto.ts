import { Language } from './language.interface';

export class LanguageISO639DTO {
    constructor(
        public readonly alpha3: string,
        public readonly alpha2b?: string,
        public readonly alpha2t?: string,
        public readonly alpha1?: string,
    ) {}
}

// tslint:disable-next-line: max-classes-per-file
export class LanguageNameDTO {
    constructor(public readonly common: string, public readonly native?: string) {}
}

// tslint:disable-next-line: max-classes-per-file
export class LanguageDTO {
    public name: LanguageNameDTO;
    public iso639: LanguageISO639DTO;
    public type: string;
    public scope: string;

    constructor(language: Language) {
        this.name = new LanguageNameDTO(language.name, language.nativeName);
        this.iso639 = new LanguageISO639DTO(language.alpha3, language.alpha2b, language.alpha2t, language.alpha1);
        this.type = language.type;
        this.scope = language.scope;
    }
}
