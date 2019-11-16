import { Document } from 'mongoose';

export enum BlacklistType {
    Password = 1,
    Email = 2
}
export interface Blacklist extends Document {
    type: BlacklistType;
    value: string;
}
