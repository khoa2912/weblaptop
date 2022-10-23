const express = require('express')

const router = express.Router()
const ScreenHandlers = require('../app/controllers/ScreenController')
const { requireSignin } = require('../middleware')

router.post('/createScreen', requireSignin, ScreenHandlers.createScreen)
router.post('/getScreens', requireSignin, ScreenHandlers.getScreens)
router.post('/getDataFilterScreen', requireSignin, ScreenHandlers.getDataFilterScreen)
router.delete(
    '/deleteScreenById',
    // requireSignin,
    // adminMiddleware,
    ScreenHandlers.deleteScreenById
)
router.post(
    '/updateScreen',
    // requireSignin,
    ScreenHandlers.updateScreen
)
router.post('/getAllScreens', requireSignin, ScreenHandlers.getAllScreens)
router.get('/screens', requireSignin, ScreenHandlers.getAllScreens)
module.exports = router
