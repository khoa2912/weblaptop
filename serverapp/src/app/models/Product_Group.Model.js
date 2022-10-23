const mongoose = require('mongoose')

const { Schema } = mongoose
const autoIncrement = require('mongoose-auto-increment')
const mongoosePaginate = require('mongoose-paginate')

mongoose.Promise = global.Promise
autoIncrement.Promise = global.Promise
const Product_GroupSchema = new Schema({
    Product_Group_Code: {
        type: String,
        trim: true,
    },
    Product_Group_Name: {
        type: String,
        trim: true,
    },
    Product_Group_Parent: {
        type: String,
        trim: true,
    },
    Product_Group_Image: {
        type: Array,
    },
    Product_Group_Category: {
        type: String,
        trim: true,
    },
    Product_Group_Description: {
        type: String,
        trim: true,
    },

    CreatedBy: {
        type: Schema.Types.Number,
        ref: 'System_User',
    },
    CreatedDate: {
        type: Date,
        default: Date.now,
    },
    Status: {
        type: String,
    },
})
Product_GroupSchema.plugin(autoIncrement.plugin, 'Product_Group')
Product_GroupSchema.plugin(mongoosePaginate)
module.exports = mongoose.model(
    'Product_Group',
    Product_GroupSchema,
    'Product_Group'
)
