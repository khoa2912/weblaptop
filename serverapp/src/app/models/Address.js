const mongoose = require('mongoose')

// C
const addressSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 50,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    mobileNumber: {
        type: String,
        required: true,
        trim: true,
    },
    provinceName: {
        type: String,
        required: true,
    },
    provinceID: {
        type: String,
        required: true,
    },
    districtName: {
        type: String,
        required: true,
        trim: true,
    },
    districtID: {
        type: String,
        required: true,
        trim: true,
    },
    wardID: {
        type: String,
        required: true,
        trim: true,
    },
    wardName: {
        type: String,
        required: true,
        trim: true,
    },
})

// B
const userAddressSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        address: [addressSchema],
    },
    { collection: 'Address' },

    { timestamps: true }
)

mongoose.model('Address', addressSchema)
module.exports = mongoose.model('UserAddress', userAddressSchema)
