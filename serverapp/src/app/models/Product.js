const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        regularPrice: {
            type: Number,
            required: true,
        },
        salePrice: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        descriptionTable: [
            {
                baohanh: { type: String },
                Series: { type: String },
                color: {
                    type: String,
                },
                cpu: {
                    type: String,
                },
                cardDohoa: {
                    type: String,
                },
                ram: {
                    type: String,
                },
                manhinh: {
                    type: String,
                },
                ocung: {
                    type: String,
                },
                hedieuhanh: {
                    type: String,
                },
                khoiluong: {
                    type: String,
                },
            },
        ],
        quantity: {
            type: Number,
            required: true,
        },
        quantitySold: {
            type: Number,
            default: 0,
        },
        tag: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tag',
            required: true,
        }],
        offer: {
            type: Number,
        },
        productPicture: [{ img: { type: String } }],
        reviews: [
            {
                userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                review: String,
            },
        ],
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        updateAt: Date,
    },
    { collection: 'Product' },
    { timestamps: true }
)
productSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Product', productSchema)
