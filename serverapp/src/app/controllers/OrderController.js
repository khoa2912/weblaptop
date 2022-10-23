const Order = require('../models/Order')
const Cart = require('../models/Cart')
const shortid = require('shortid')
const slugify = require('slugify')
const Address = require('../models/Address')
const { isValidObjectId } = require('mongoose')
var ObjectId = require('mongodb').ObjectId

class OrderController {
    create(req, res, next) {
        let itemTable = [
            {
                productId: req.body.productId,
                purchasedQty: req.body.purchasedQty
            },
        ]

        let orderStatusTable = [
            {
                isCompleted: req.body.isCompleted,
                type: req.body.type
            },
        ]

        const order = new Order({
            addressId: req.body.addressId,
            totalAmount: req.body.totalAmount,
            items: itemTable,
            paymentStatus: req.body.paymentStatus,
            quanpaymentTypetity: req.body.paymentType,
            user: req.body.user,
            orderStatus: orderStatusTable,
        })

        

        ord.save((error, order) => {
            if (error) return res.status(400).json({ error })
            if (order) {
                return res.status(201).json({ order })
            }
        })
    }

    addOrder = (req, res) => {
        Cart.deleteOne({ user: req.user._id }).exec((error, result) => {
            if (error) return res.status(400).json({ error })
            if (result) {
                req.body.user = req.user._id
                req.body.orderStatus = [
                    {
                        type: 'ordered',
                        date: new Date(),
                        isCompleted: true,
                    },
                    {
                        type: 'packed',
                        isCompleted: false,
                    },
                    {
                        type: 'shipped',
                        isCompleted: false,
                    },
                    {
                        type: 'delivered',
                        isCompleted: false,
                    },
                ]
                const order = new Order(req.body)
                order.user = req.user.id
                order.save((error, order) => {
                    if (error) return res.status(400).json({ error })
                    if (order) {
                        res.status(201).json({ order })
                    }
                })
            }
        })
    }

    // getOrders = async (req, res) => {
    //     res.setHeader('Access-Control-Allow-Origin', '*')
    //     res.setHeader('Access-Control-Allow-Headers', '*')
    //     res.header('Access-Control-Allow-Credentials', true)

    //     try {
    //         const orders = await Order.find({})
    //             .select(
    //                 '_id addressId totalAmount items paymentStatus quanpaymentTypetity user orderStatus'
    //             )
    //             .populate(
    //                 { path: 'category', select: '_id name' },
    //                 { path: 'user', select: '_id firstname lastname' }
    //             )
    //             .exec()
    //         myCache.set('allOrders', orders)
    //         res.status(200).json({ orders })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    getOrders = (req, res) => {
        Order.find({ user: req.user.id })
            .select('_id addressId totalAmount items paymentStatus quanpaymentTypetity user orderStatus')
            .populate(
                { path: 'category', select: '_id name' },
                { path: 'user', select: '_id firstname lastname' }
            )
            .exec((error, orders) => {
                if (error) return res.status(400).json({ error })
                if (orders) {
                    res.status(200).json({ orders })
                }
            })
    }

    getOrder = (req, res) => {
        Order.findOne({ _id: req.body.orderId })
            .populate('items.productId', '_id name productPicture salePrice')
            .lean()
            .exec((error, order) => {
                if (error) return res.status(400).json({ error })
                if (order) {
                    Address.findOne({
                        user: req.user.id,
                    }).exec((error, address) => {
                        if (error) return res.status(400).json({ error })
                        order.address = address.address.find(
                            (adr) =>
                                adr._id.toString() == order.addressId.toString()
                        )
                        res.status(200).json({
                            order,
                        })
                    })
                }
            })
    }
    cancelOrder = (req, res) => {
        Order.findOneAndUpdate(
            { _id: req.body.data.payload.orderId },
            { $set: { paymentStatus: 'cancelled' } },
            { new: true, upsert: true }
        ).exec((error, result) => {
            if (error) return res.status(400).json({ error })
            if (result) {
                res.status(202).json({ result })
            }
        })
    }

    getDataFilterOrder = async (req, res, next) => {
        const options = {
            limit: 99,
            lean: true,
            populate: [
                {
                    path: 'user',
                    select: '_id firstname lastname',
                },
            ],
        }
        console.log(req.body)
        const searchModel = req.body
        const query = {}
        if (
            !!searchModel.TotalAmount &&
            Array.isArray(searchModel.TotalAmount) &&
            searchModel.TotalAmount.length > 0
        ) {
            query._id = { $in: searchModel.TotalAmount }
        }

        if (!!searchModel.UserId && searchModel.UserId.length > 0) {
            query.user = { $in: searchModel.UserId }
        }

        // if (!!searchModel.Status && searchModel.Status.length > 0) {
        //     query.Status = { $in: searchModel.Status }
        // }
        Order.paginate({ $and: [query] }, options).then(function (result) {
            return res.json({
                result,
            })
        })
    }
    searchOrders = async (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Headers', '*')
        res.header('Access-Control-Allow-Credentials', true)
        const { q, sortOrder, sortBy, userId } = req.body.data.payload
        const listQuery = []
        if (q !== '') {
            const searchName = q
            const rgx = (pattern) => new RegExp(`.*${pattern}.*`)
            const searchNameRgx = rgx(searchName)

            if (userId) {
                const searchQuery = {
                    $match: {
                        name: { $regex: searchNameRgx, $options: 'i' },
                        category: ObjectId(userId),
                    },
                }
                listQuery.push(searchQuery)
            } else {
                const searchQuery = {
                    $match: { name: { $regex: searchNameRgx, $options: 'i' } },
                }
                listQuery.push(searchQuery)
            }
        }
        if (sortBy) {
            const order = sortOrder === 'asc' ? 1 : -1
            listQuery.push({ $sort: { [sortBy]: order } })
        }
        try {
            const ordersFilter = await Order.aggregate(listQuery).exec()
            if (ordersFilter) {
                res.status(200).json({ productsSearch: ordersFilter })
            }
        } catch (error) {
            console.log(error)
        }
    }

    updateCompletedOrder = (req, res) => {
        Order.findOneAndUpdate(
            { _id: req.body.data.payload.orderId },
            { $set: { paymentStatus: 'completed' } },
            { new: true, upsert: true }
        ).exec((error, result) => {
            if (error) return res.status(400).json({ error })
            if (result) {
                res.status(202).json({ result })
            }
        })
    }
}
module.exports = new OrderController()
