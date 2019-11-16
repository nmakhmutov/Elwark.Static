import { Schema } from 'mongoose';

export const TimezoneSchema = new Schema({
    alpha2Code: {
        type: String,
        minlength: 2,
        maxlength: 2,
        uppercase: true,
        required: true,
        index: true
    },
    alpha3Code: {
        type: String,
        minlength: 3,
        maxlength: 3,
        uppercase: true,
        required: true,
        index: true
    },
    zoneName: {
        type: String,
        required: true,
        unique: true
    },
    gmtName: {
        type: String,
        required: true
    },
    gmtOffset: {
        type: String,
        required: true
    }
});
