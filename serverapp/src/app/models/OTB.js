const mongoose = require('mongoose')

const otpSchema = new mongoose.Schema(
    {
        email: String,
        code: String,
        // eslint-disable-next-line no-undef
        expireIn: SVGAnimatedNumberList,
    },
    { collection: 'OTP' },
    { timestamps: true }
)

module.exports = mongoose.model('OTP', otpSchema)
