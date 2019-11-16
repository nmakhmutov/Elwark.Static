import { Schema } from 'mongoose';

export const CountrySchema = new Schema({
    alpha2Code: {
        type: String,
        minlength: 2,
        maxlength: 2,
        uppercase: true,
        required: true,
        unique: true,
        index: true
    },
    alpha3Code: {
        type: String,
        minlength: 3,
        maxlength: 3,
        uppercase: true,
        required: true,
        unique: true,
        index: true
    },
    numericCode: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    area: {
        type: Number,
        min: 0
    },
    borders: {
        type: [String],
        default: []
    },
    callingCodes: {
        type: [Number],
        default: [],
        required: true
    },
    capital: {
        type: String
    },
    currencies: {
        type: [String],
        default: []
    },
    demonym: {
        type: String
    },
    flag: {
        type: String,
        required: true
    },
    independent: {
        type: Boolean,
        required: true
    },
    landlocked: {
        type: Boolean,
        required: true
    },
    languages: {
        type: [String],
        required: true,
        default: []
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    name: {
        common: {
            type: String,
            required: true
        },
        official: {
            type: String,
            required: true
        },
        native: {
            type: Map,
            of: {
                common: String,
                official: String
            }
        }
    },
    timezones: {
        type: [String],
        default: []
    },
    region: {
        type: String
    },
    regionalBlocs: {
        type: [{
            acronym: String,
            name: String
        }],
        default: []
    },
    subregion: {
        type: String
    },
    topLevelDomain: {
        type: [String],
        default: []
    },
    translations: {
        type: Map,
        of: {
            common: String,
            official: String
        }
    }
});
