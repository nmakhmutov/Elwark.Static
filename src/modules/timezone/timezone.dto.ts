import { Timezone } from './timezone.interface';

export class TimezoneDTO {
    public readonly zone: string;
    public readonly country: TimezoneCountryDTO;
    public readonly gmt: TimezoneGmtDTO;

    constructor(timezone: Timezone) {
        this.zone = timezone.zoneName;
        this.country = new TimezoneCountryDTO(timezone.alpha2Code, timezone.alpha3Code);
        this.gmt = new TimezoneGmtDTO(timezone.gmtOffset, timezone.gmtName);
    }
}

// tslint:disable-next-line: max-classes-per-file
export class TimezoneCountryDTO {
    constructor(public readonly alpha2: string, public readonly alpha3: string) { }
}

// tslint:disable-next-line: max-classes-per-file
export class TimezoneGmtDTO {
    constructor(public readonly offset: number, public readonly name: string) { }
}
