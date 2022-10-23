const express = require('express')

const router = express.Router()
const PageController = require('../../app/controllers/Admin/PageController')
const { upload, adminMiddleware, requireSignin } = require('../../middleware')

router.get('/:category/:type', PageController.getPage)
router.post(
    '/create',
    requireSignin,
    adminMiddleware,
    upload.fields([{ name: 'banners' }, { name: 'products' }]),
    PageController.createPage
)
router.post(
    `/getPages`,
    requireSignin,
    adminMiddleware,
    PageController.getPages
)

router.post(
    `/getAllPages`,
    requireSignin,
    adminMiddleware,
    PageController.getAllPages
)

router.post(
    `/getDataFilterPage`,
    requireSignin,
    adminMiddleware,
    PageController.getDataFilterPage
)

module.exports = router
