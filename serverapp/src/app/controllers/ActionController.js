const shortid = require('shortid')
const slugify = require('slugify')
const { json } = require('express')
const Action = require('../models/Action')
// eslint-disable-next-line import/order
const ObjectId = require('mongodb')
const NodeCache = require('node-cache')

const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 })

// eslint-disable-next-line no-var
class ActionController {
    async createAction(req, res, next) {
        const { nameAction, description, date} = req.body
        console.log(req.body)

        const action = new Action({
            nameAction,
            description,
            date,
            createdBy: req.user.id,
        })
        // eslint-disable-next-line consistent-return
        action.save((error, action) => {
            if (error) return res.status(400).json({ error })
            if (action) {
                res.status(201).json({ action })
            }
        })
    }

    getActions = async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Headers', '*')
        res.header('Access-Control-Allow-Credentials', true)

        try {
            const actions = await Action.find({})
                .select(
                    '_id nameAction description date createdBy'
                )
                .populate(
                    { path: 'user', select: '_id firstname lastname' }
                )
                .exec()
            myCache.set('allActions', actions)
            res.status(200).json({ actions })
        } catch (error) {
            console.log(error)
        }
    }

    async getAllActions(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Headers', '*')
        res.header('Access-Control-Allow-Credentials', true)
        if (myCache.has('allActions')) {
            res.status(200).json({ allActions: myCache.get('allActions') })
        } else {
            const allActions = await Action.find({}).populate(
                { path: 'user', select: '_id firstname lastname' }
            )
            if (allActions) {
                myCache.set('allActions', allActions)
                res.status(200).json({ allActions })
            }
        }
    }

    async updateAction(req, res, next) {
        Action.findOneAndUpdate(
            { _id: req.body._id },
            {
                $set: {
                    nameAction: req.body.nameAction,
                    description: req.body.description,
                    date: req.body.date
                },
            },
            { new: true, upsert: true }
        ).exec((error, result) => {
            console.log(error)
            if (error) return res.status(400).json({ error })
            if (result) {
                res.status(201).json({ result })
            }
        })
    }

    deleteActionById = (req, res) => {
        const { actionId } = req.body.payload
        if (actionId) {
            Action.deleteMany({ _id: actionId }).exec((error, result) => {
                if (error) return res.status(400).json({ error })
                if (result) {
                    res.status(202).json({ result })
                }
            })
        } else {
            res.status(400).json({ error: 'Params required' })
        }
    }

    getDataFilterAction = async (req, res, next) => {
        const options = {
            limit: 99,
            lean: true,
        }
        console.log(req.body)
        const searchModel = req.body
        const query = {}
        if (
            !!searchModel.ActionName &&
            Array.isArray(searchModel.ActionName) &&
            searchModel.ActionName.length > 0
        ) {
            query.nameAction = { $in: searchModel.ActionName }
        }
        if (
            !!searchModel.Description &&
            Array.isArray(searchModel.Description) &&
            searchModel.Description.length > 0
        ) {
            query.description = { $in: searchModel.Description }
        }
        Action.paginate({ $and: [query] }, options).then(function (result) {
            return res.json({
                result,
            })
        })
    }

}
module.exports = new ActionController()
