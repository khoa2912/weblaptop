const express = require('express')
const TagController = require('../app/controllers/TagController')

const router = express.Router()
const { requireSignin } = require('../middleware')

router.post('/createTag', requireSignin, TagController.createTag)
router.post(`/getDataFilterTag`, requireSignin, TagController.getDataFilterTag)
router.post(`/getTags`, requireSignin, TagController.getTags)
router.post(`/getAllTags`, requireSignin, TagController.getAllTags)
router.post(
    '/updateTag',
    // requireSignin,
    TagController.updateTag
)
router.delete(
    '/deleteTagById',
    // requireSignin,
    // adminMiddleware,
    TagController.deleteTagById
)

module.exports = router