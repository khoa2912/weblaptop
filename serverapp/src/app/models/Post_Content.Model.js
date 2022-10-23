/*'use strict';*/

const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment'),
    mongoosePaginate = require('mongoose-paginate')
/**
 * User Schema
 */

autoIncrement.initialize(mongoose.connection)
mongoose.Promise = global.Promise
autoIncrement.Promise = global.Promise
const Post_ContentSchema = new Schema(
    {
        Post_Content_Code: {
            type: String,
            trim: true,
        },
        Post_Content_Name: {
            type: String,
            trim: true,
        },
        Post_Content_Link: {
            type: String,
            trim: true,
        },
        Alt_Image: {
            type: String,
            trim: true,
        },
        Post_Content_Description: {
            type: String,
            trim: true,
        },
        Post_Content_Content: {
            type: String,
            trim: true,
        },
        Post_Content_Image: {
            type: Array,
            ref: 'Post_Content_Image',
            default:
                'https://res.cloudinary.com/shoplaptop/image/upload/v1661569184/news-default_g3c2je.png',
        },
        Create_By: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        CreatedDate: {
            type: Date,
            default: Date.now,
        },
        Status: {
            type: String,
        },
    },
    { collection: 'Post_Content' },
    { timestamps: true }
)

// eslint-disable-next-line camelcase
Post_ContentSchema.plugin(autoIncrement.plugin, 'Post_Content')
// eslint-disable-next-line camelcase
Post_ContentSchema.plugin(mongoosePaginate)
module.exports = mongoose.model(
    'Post_Content',
    Post_ContentSchema,
    'Post_Content'
)
