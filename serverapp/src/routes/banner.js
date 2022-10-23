const express = require('express')
const BannerController = require('../app/controllers/BannerController')

const router = express.Router()
const { requireSignin } = require('../middleware')

router.post('/createBanner', requireSignin, BannerController.createBanner)
router.post(`/getDataFilterBanner`, requireSignin, BannerController.getDataFilterBanner)
router.post(`/getBanners`, requireSignin, BannerController.getBanners)
router.post(`/getAllBanners`, requireSignin, BannerController.getAllBanners)
router.post(
    '/updateBanner',
    // requireSignin,
    BannerController.updateBanner
)
router.delete(
    '/deleteBannerById',
    // requireSignin,
    // adminMiddleware,
    BannerController.deleteBannerById
)

module.exports = router
