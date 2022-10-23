const express = require('express')

const router = express.Router()
// eslint-disable-next-line camelcase
const Post_ContentHandlers = require('../app/controllers/Post_Content.Controller')
const { requireSignin } = require('../middleware')

// eslint-disable-next-line camelcase
router.post('/createPost', requireSignin, Post_ContentHandlers.create)

module.exports = router
