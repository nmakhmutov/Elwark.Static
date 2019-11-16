import { Document } from 'mongoose';

export interface Language extends Document {
    readonly alpha3: string;
    readonly alpha2b?: string;
    readonly alpha2t?: string;
    readonly alpha1?: string;
    readonly name: string;
    readonly nativeName?: string;
    readonly type: string;
    readonly scope: string;
}
