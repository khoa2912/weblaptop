const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        type: {
            type: String,
        },
        categoryImage: {
            type: String,
        },
        parentId: {
            type: String,
        },
    },
    { collection: 'Category' },
    { timestamps: true }
)
categorySchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Category', categorySchema)
