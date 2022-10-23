const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const tagSchema = new mongoose.Schema(
    {
        tagName: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        tagSlug: {
            type: String,
            required: true,
            unique: true,
        },
        createdTime: {
            type: Date,
            default: Date.now()
        },    
        updatedTime: {
            type: Date,
        },
        parentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tag',
            // required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { collection: 'Tag' },
    { timestamps: true }
)
tagSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Tag', tagSchema)