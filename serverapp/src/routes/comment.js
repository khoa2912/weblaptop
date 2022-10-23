const express = require('express')
const CommentController = require('../app/controllers/CommentController')

const router = express.Router()
const { requireSignin } = require('../middleware')

router.post('/createComment', requireSignin, CommentController.create)
router.post('/comments', CommentController.getAllComment)
module.exports = router
