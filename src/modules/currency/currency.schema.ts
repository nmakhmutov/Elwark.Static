import { Schema } from 'mongoose';

export const CurrencySchema = new Schema({
    code: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 3,
        uppercase: true,
        index: true,
        unique: true,
    },
    decimalDigits: {
        type: Number,
        required: true,
        min: 0,
        max: 10,
    },
    name: {
        type: String,
        required: true,
    },
    namePlural: {
        type: String,
        required: true,
    },
    symbol: {
        type: String,
        required: true,
    },
    symbolNative: {
        type: String,
        required: true,
    },
});
