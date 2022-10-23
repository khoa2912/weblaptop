const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const roleSchema = new mongoose.Schema(
    {
        nameRole: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        codeRole: {
            type: String,
            required: true,
            unique: true,
        },
        permission: [String],
        descriptionRole: {
            type: String,
            trim: true,
        },
        listRole: [
            {
                actionId: { 
                    type: mongoose.Schema.Types.ObjectId, 
                    ref: 'Action', 
                    required: true, 
                },
            },
        ],
        status: {
            type: String,
            default: 'active',
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        updateAt: Date,
    },
    { collection: 'Role' },
    { timestamps: true }
)

roleSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Role', roleSchema)
