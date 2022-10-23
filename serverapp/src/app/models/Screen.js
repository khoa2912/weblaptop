const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const screenSchema = new mongoose.Schema(
    {
        screenName: {
            type: String,
            required: true,
            trim: true,
        },
        screenCode: {
            type: String,
            required: true,
            unique: true,
        },
        screenDescription: {
            type: String,
            trim: true,
        },
        status: {
            type: String,
            default: 'active',
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        updateAt: Date,
    },
    { collection: 'Screen' },
    { timestamps: true }
)
screenSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Screen', screenSchema)
