const mongoose = require('mongoose')
const moment = require('moment')

moment.locale('vi')
moment().format('LL')
const commentSchema = new mongoose.Schema(
    {
        productID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        content: {
            type: String,
            trim: true,
        },
        author: { type: String },
        Avatar: {
            type: Array,
            default:
                'https://res.cloudinary.com/shoplaptop/image/upload/v1661608973/1053244_rttpwr.png',
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        datetime: {
            type: Date,
            default: Date.now(),
        },
        like: {
            type: Number,
            default: 0,
        },
        disLike: {
            type: Number,
            default: 0,
        },
        updateAt: Date,
    },
    { collection: 'Comment' },
    { timestamps: true }
)

module.exports = mongoose.model('Comment', commentSchema)
