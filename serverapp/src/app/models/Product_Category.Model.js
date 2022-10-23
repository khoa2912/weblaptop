const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment'),
    mongoosePaginate = require('mongoose-paginate')
mongoose.Promise = global.Promise
autoIncrement.Promise = global.Promise
const Product_CategorySchema = new Schema({
    Product_Category_Code: {
        type: String,
        trim: true,
    },
    Product_Category_Name: {
        type: String,
        trim: true,
    },
    Product_Category_Description: {
        type: String,
        trim: true,
    },
    Product_Category_Image: {
        type: Array,
    },
    CreatedBy: {
        type: Schema.Types.Number,
    },
    CreatedDate: {
        type: Date,
        default: Date.now,
    },
    Status: {
        type: String,
    },
})
Product_CategorySchema.plugin(autoIncrement.plugin, 'Product_Category')
Product_CategorySchema.plugin(mongoosePaginate)
module.exports = mongoose.model(
    'Product_Category',
    Product_CategorySchema,
    'Product_Category'
)
