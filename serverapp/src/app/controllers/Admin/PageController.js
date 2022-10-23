const Page = require('../../models/Page')

class PageController {
    createPage(req, res, next) {
        const { banners, products } = req.files
        if (banners.length > 0) {
            req.body.banners = banners.map((banner, index) => ({
                img: `${process.env.API}/public/${banner.filename}`,
                navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`,
            }))
        }
        if (products.length > 0) {
            req.body.products = products.map((product, index) => ({
                img: `${process.env.API}/public/${product.filename}`,
                navigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`,
            }))
        }
        const page = new Page({
            title,
            description,
            banners,
            products,
            category: req.body.category,
            createdBy: req.user._id,
        })
        // eslint-disable-next-line consistent-return
        Page.findOne({ category: req.body.category }).exec((error, page) => {
            if (error) return res.status(400).json({ error })
            if (page) {
                Page.findOneAndUpdate(
                    { category: req.body.category },
                    req.body
                    // eslint-disable-next-line consistent-return, no-shadow
                ).exec((error, updatedPage) => {
                    if (error) return res.status(400).json({ error })
                    if (updatedPage) {
                        return res.status(201).json({ page: updatedPage })
                    }
                })
            } else {
                // eslint-disable-next-line no-shadow
                const page = new Page(req.body)

                // eslint-disable-next-line consistent-return, no-shadow
                page.save((error, page) => {
                    if (error) return res.status(400).json({ error })
                    if (page) {
                        return res.status(201).json({ page })
                    }
                })
            }
        })
    }

    getPage(req, res) {
        const { category, type } = req.params
        if (type === 'page') {
            // eslint-disable-next-line consistent-return
            Page.findOne({ category }).exec((error, page) => {
                if (error) return res.status(400).json({ error })
                if (page) return res.status(200).json({ page })
            })
        }
    }

    getPages = async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Headers', '*')
        res.header('Access-Control-Allow-Credentials', true)

        try {
            const pages = await Page.find({})
                .select(
                    '_id title description banners products'
                )
                .populate(
                    { path: 'user', select: '_id firstname lastname' }
                )
                .exec()
            myCache.set('allPages', pages)
            res.status(200).json({ pages })
        } catch (error) {
            console.log(error)
        }
    }

    async getAllPages(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Headers', '*')
        res.header('Access-Control-Allow-Credentials', true)
        if (myCache.has('allPages')) {
            res.status(200).json({ allPages: myCache.get('allPages') })
        } else {
            const allPages = await Page.find({}).populate(
                { path: 'user', select: '_id firstname lastname' }
            )
            if (allPages) {
                myCache.set('allPages', allPages)
                res.status(200).json({ allPages })
            }
        }
    }

    getDataFilterPage = async (req, res, next) => {
        const options = {
            limit: 99,
            lean: true,
        }
        console.log(req.body)
        const searchModel = req.body
        const query = {}
        if (
            !!searchModel.Title &&
            Array.isArray(searchModel.Title) &&
            searchModel.Title.length > 0
        ) {
            query.title = { $in: searchModel.Title }
        }
        Page.paginate({ $and: [query] }, options).then(function (result) {
            return res.json({
                result,
            })
        })
    }
}

module.exports = new PageController()
