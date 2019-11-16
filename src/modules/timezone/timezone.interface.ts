import { Document } from 'mongoose';

export interface Timezone extends Document {
    readonly alpha2Code: string;
    readonly alpha3Code: string;
    readonly zoneName: string;
    readonly gmtOffset: number;
    readonly gmtName: string;
}
