const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
            minLength: 3,
            maxLength: 20,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            minLength: 3,
            maxLength: 20,
        },
        userName: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            // index:true,
            lowercase: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
        },
        // eslint-disable-next-line camelcase
        hash_password: {
            type: String,
            required: true,
        },
        role: {
            // type: mongoose.Schema.Types.ObjectId,
            // ref: 'Role',
            type: String,
            
        },
        contactNumber: {
            type: String,
        },
        profilePicture: {
            type: String,
        },
        status: {
            type: String,
            default: 'enable',
        },
    },
    { collection: 'User' },
    { timestamps: true }
)

/* userSchema.virtual('password')
    .set(function(password){
        this.hashPassword=bcrypt.hashSync(password,10)
    }) */
userSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`
})
userSchema.methods = {
    async authenticate(password) {
        // eslint-disable-next-line no-return-await
        return await bcrypt.compare(password, this.hash_password)
    },
}
userSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('User', userSchema)
