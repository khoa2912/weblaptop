const shortid = require('shortid')
const slugify = require('slugify')
const { json } = require('express')
const Banner = require('../models/Banner')
// eslint-disable-next-line import/order
const ObjectId = require('mongodb')
const NodeCache = require('node-cache')
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 })

// eslint-disable-next-line no-var
class BannerController {
    async createBanner(req, res, next) {
        const { nameBanner, codeBanner, image, slug } = req.body
        console.log(req.body)

        const banner = new Banner({
            nameBanner,
            codeBanner,
            image,
            slug,
            createdBy: req.user.id,
        })
        // eslint-disable-next-line consistent-return
        banner.save((error, banner) => {
            if (error) return res.status(400).json({ error })
            if (banner) {
                res.status(201).json({ banner })
            }
        })
    }

    getBanners = async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Headers', '*')
        res.header('Access-Control-Allow-Credentials', true)

        try {
            const banners = await Banner.find({})
                .select(
                    '_id nameBanner codeBanner image slug createdBy'
                )
                .populate(
                    { path: 'user', select: '_id firstname lastname' }
                )
                .exec()
            myCache.set('allBanners', banners)
            res.status(200).json({ banners })
        } catch (error) {
            console.log(error)
        }
    }

    async getAllBanners(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Headers', '*')
        res.header('Access-Control-Allow-Credentials', true)
        if (myCache.has('allBanners')) {
            res.status(200).json({ allBanners: myCache.get('allBanners') })
        } else {
            const allBanners = await Banner.find({}).populate(
                { path: 'user', select: '_id firstname lastname' }
            )
            if (allBanners) {
                myCache.set('allBanners', allBanners)
                res.status(200).json({ allBanners })
            }
        }
    }

    async updateBanner(req, res, next) {
        Banner.findOneAndUpdate(
            { _id: req.body._id },
            {
                $set: {
                    nameBanner: req.body.nameBanner,
                    codeBanner: req.body.codeBanner,
                    image: req.body.image,
                    slug: req.body.slug
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

    deleteBannerById = (req, res) => {
        const { bannerId } = req.body.payload
        if (bannerId) {
            Banner.deleteMany({ _id: bannerId }).exec((error, result) => {
                if (error) return res.status(400).json({ error })
                if (result) {
                    res.status(202).json({ result })
                }
            })
        } else {
            res.status(400).json({ error: 'Params required' })
        }
    }

    getDataFilterBanner = async (req, res, next) => {
        const options = {
            limit: 99,
            lean: true,
        }
        console.log(req.body)
        const searchModel = req.body
        const query = {}
        if (
            !!searchModel.BannerName &&
            Array.isArray(searchModel.BannerName) &&
            searchModel.BannerName.length > 0
        ) {
            query.nameBanner = { $in: searchModel.BannerName }
        }

        if (
            !!searchModel.Banner_Code &&
            Array.isArray(searchModel.Banner_Code) &&
            searchModel.Banner_Code.length > 0
        ) {
            query.codeBanner = { $in: searchModel.Banner_Code }
        }

        Banner.paginate({ $and: [query] }, options).then(function (result) {
            return res.json({
                result,
            })
        })
    }

}
module.exports = new BannerController()
