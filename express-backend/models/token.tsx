import { Schema, model, models } from "mongoose"
const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 7200,     
    },
});

const Token = mongoose.model('Token', TokenSchema);

module.exports = Token;