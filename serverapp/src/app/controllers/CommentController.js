const shortid = require('shortid')
const slugify = require('slugify')
const { json } = require('express')
const Comment = require('../models/Comment')
// eslint-disable-next-line import/order
const ObjectId = require('mongodb').ObjectID
const NodeCache = require('node-cache')

const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 })
// eslint-disable-next-line no-var
class CommentController {
    async create(req, res, next) {
        console.log(req)
        const { content, productID, Avatar, author } = req.body.payload
        console.log(productID)
        const comment = new Comment({
            productID,
            content,
            Avatar,
            author,
            createdBy: req.user.id,
        })
        // eslint-disable-next-line consistent-return
        comment.save((error, display) => {
            if (error) return res.status(400).json({ error })
            if (display) {
                res.status(201).json({ display })
            }
        })
    }

    async getAllComment(req, res, next) {
        try {
            const allComment = await Comment.find({
                productID: req.body.productID,
            }).populate({ path: 'createdBy' })
            if (allComment) {
                res.status(200).json({ allComment })
            }
        } catch (err) {
            res.status(400).json({ error: 'error' })
        }
    }
}
module.exports = new CommentController()
