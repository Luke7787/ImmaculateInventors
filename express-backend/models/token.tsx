import { Schema, model, models } from "mongoose"

const TokenSchema = new Schema({
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
        default: Date.now()
    },
    resetAt: {
        type: Date
    }
})

const Token = models.Token || model("Token", TokenSchema)

export default Token