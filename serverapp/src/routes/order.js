const router = require('express').Router()
const { requireSignin, userMiddleware } = require('../middleware')
const OrderController = require('../app/controllers/OrderController')

router.post(
    '/addOrder',
    requireSignin,
    userMiddleware,
    OrderController.addOrder
)
router.post(
    '/updateCompletedOrder',
    requireSignin,
    OrderController.updateCompletedOrder
)
router.post('/cancelOrder', requireSignin, OrderController.cancelOrder)
router.get('/getOrders', requireSignin, OrderController.getOrders)
router.post('/getDataFilterOrder', OrderController.getDataFilterOrder)
router.post(
    '/getOrder',
    requireSignin,
    userMiddleware,
    OrderController.getOrder
)
module.exports = router
