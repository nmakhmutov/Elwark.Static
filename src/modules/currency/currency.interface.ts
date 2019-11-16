import { Document } from 'mongoose';

export interface Currency extends Document {
    readonly code: string;
    readonly decimalDigits: number;
    readonly name: string;
    readonly namePlural: string;
    readonly symbol: string;
    readonly symbolNative: string;
}
