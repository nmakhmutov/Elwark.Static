import { Schema } from 'mongoose';

export const BlacklistSchema = new Schema({
    type: {
        type: Number,
        required: true,
        index: true,
        min: 1
    },
    value: {
        type: String,
        required: true
    }
});
