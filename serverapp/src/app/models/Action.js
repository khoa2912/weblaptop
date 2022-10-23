const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const actionSchema = new mongoose.Schema(
    {
        nameAction: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            unique: true,
        },
        date: {
            type: Date,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { collection: 'Action' },
    { timestamps: true }
)
actionSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Action', actionSchema)