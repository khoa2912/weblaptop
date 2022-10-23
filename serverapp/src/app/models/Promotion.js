/*'use strict';*/

const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment'),
    mongoosePaginate = require('mongoose-paginate')
/**
 * User Schema
 */

mongoose.Promise = global.Promise
autoIncrement.Promise = global.Promise
const PromotionSchema = new Schema(
    {
        Promotion_Code: {
            type: String,
            trim: true,
        },
        Promotion_Name: {
            type: String,
            trim: true,
        },
        option: {
            type: Schema.Types.Number,
            trim: true,
        },
        Value: {
            type: Schema.Types.Number,
            default: 0,
        },
        Product: {
            type: Array,
        },
        Product_Group: {
            type: Array,
            trim: true,
        },
        Branch: {
            type: String,
            trim: true,
        },
        Effective_Date: {
            type: Array,
        },
        TimeStart: {
            type: Date,
        },
        TimeEnd: {
            type: Date,
        },
        Content: {
            type: String,
        },
        CreatedBy: {
            type: Schema.Types.Number,
        },
        CreatedDate: {
            type: Date,
            default: Date.now,
        },
    },
    { collection: 'Promotion' },
    { timestamps: true }
)
PromotionSchema.virtual('CreatedByObject', {
    ref: 'System_User',
    localField: 'CreatedBy',
    foreignField: '_id',
    justOne: true,
})
PromotionSchema.virtual('ProductObject', {
    ref: 'Product',
    localField: 'Product',
    foreignField: 'Product_Code',
    justOne: false,
})

PromotionSchema.plugin(autoIncrement.plugin, 'Promotion')
PromotionSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Promotion', PromotionSchema, 'Promotion')
