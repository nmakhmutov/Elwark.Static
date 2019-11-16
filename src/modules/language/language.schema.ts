import { Schema } from 'mongoose';

export const LanguageSchema = new Schema({
    alpha1: {
        type: String
    },
    alpha2b: {
        type: String
    },
    alpha2t: {
        type: String
    },
    alpha3: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    nativeName: {
        type: String
    },
    type: {
        type: String,
        required: true
    },
    scope: {
        type: String,
        required: true
    }
});
