const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const bannerSchema = new mongoose.Schema(
    {
        nameBanner: {
            type: String,
            required: true,
            trim: true,
        },
        codeBanner: {
            type: String,
            required: true,
            unique: true,
        },
        image: {
            type: String,
        },
        slug: {
            type: String,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { collection: 'Banner' },
    { timestamps: true }
)
bannerSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Banner', bannerSchema)
