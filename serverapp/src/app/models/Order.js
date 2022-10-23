const mongoose = require('mongoose')
// A.
const mongoosePaginate = require('mongoose-paginate')

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        addressId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserAddress',
            required: true,
        },
        totalAmount: {
            type: Number,
            required: true,
        },
        shipAmount: {
            type: Number,
            default: 0,
        },
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                },
                purchasedQty: {
                    type: Number,
                    required: true,
                },
            },
        ],
        paymentStatus: {
            type: String,
            enum: ['pending', 'completed', 'cancelled', 'refund'],
            required: true,
        },
        paymentType: {
            type: String,
            enum: ['cod', 'card'],
            required: true,
        },
        orderStatus: [
            {
                type: {
                    type: String,
                    enum: ['ordered', 'packed', 'shipped', 'delivered'],
                    default: 'ordered',
                },
                date: {
                    type: Date,
                },
                isCompleted: {
                    type: Boolean,
                    default: false,
                },
            },
        ],
    },
    { collection: 'Order' },
    { timestamps: true }
)
orderSchema.virtual('addressObject', {
    ref: 'UserAddress',
    localField: 'addressId',
    foreignField: 'address._id',
    justOne: true,
})
orderSchema.virtual('userObject', {
    ref: 'User',
    localField: 'user',
    foreignField: '_id',
    justOne: true,
})
orderSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Order', orderSchema)
