const Category = require('../../models/Category')
const Product = require('../../models/Product')
const Order = require('../../models/Order')
const User = require('../../models/User')
const NodeCache = require('node-cache')
const Address = require('../../models/Address')
const mongoose = require('../../../util/mongoose')
const { ObjectId } = require('mongodb')
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 })
function createCategories(categories, parentId = null) {
    const categoryList = []
    let category
    if (parentId == null) {
        category = categories.filter((cat) => cat.parentId === undefined)
    } else {
        category = categories.filter((cat) => cat.parentId === parentId)
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const cate of category) {
        categoryList.push({
            // eslint-disable-next-line no-underscore-dangle
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId,
            type: cate.type,
            // eslint-disable-next-line no-underscore-dangle
            children: createCategories(categories, cate._id),
        })
    }
    return categoryList
}

/* exports.initialData = async (req, res) => {
    const categories = await Category.find({}).exec()
    const products = await Product.find({})
                                    .select('_id name regularPrice salePrice quantity quantitySold slug description descriptionTable productPicture category')
                                    .populate({path:'category', select:'_id name'})
                                    .exec()
    res.status(200).json({
        categories:createCategories(categories),
        products
    })
} */
exports.initialData = async (req, res) => {
    const users = await User.find({}).exec()
    const categories = await Category.find({}).exec()
    const products = await Product.find({ createdBy: req.user.id })
        .select(
            '_id name regularPrice salePrice quantity quantitySold slug description descriptionTable productPicture category'
        )
        .populate({ path: 'category', select: '_id name' })
        .exec()
    const options = {
        lean: true,
        populate: [
            { path: 'items.productId' },
            { path: 'addressObject' },
            { path: 'userObject' },
        ],
    }
    const orders = await Order.paginate({}, options).then((result) => result)
    console.log(orders)
    res.status(200).json({
        categories: createCategories(categories),
        products,
        orders: orders.docs,
        users,
    })
}
