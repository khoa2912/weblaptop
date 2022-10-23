const express = require('express')
const {
    initialData,
} = require('../../app/controllers/Admin/InitialDataController')
const { requireSignin, adminMiddleware } = require('../../middleware')

const router = express.Router()

// router.post('/signin',(req,res,next)=>{
// })

router.post('/initialData', requireSignin, adminMiddleware, initialData)

module.exports = router
