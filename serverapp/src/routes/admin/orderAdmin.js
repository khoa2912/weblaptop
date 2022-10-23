const express = require('express')
const { requireSignin, adminMiddleware } = require('../../middleware')
const OrderAdminController = require('../../app/controllers/Admin/OrderAdminController')

const router = express.Router()

router.post(
    '/updateOrderStatus',
    requireSignin,
    adminMiddleware,
    OrderAdminController.updateOrderStatus
)
router.post(
    `/getCustomerOrders`,
    requireSignin,
    adminMiddleware,
    OrderAdminController.getCustomerOrders
)
router.post(
    `/testSearch`,
    requireSignin,
    adminMiddleware,
    OrderAdminController.search
)
router.post(
    `/getAllOrder`,
    requireSignin,
    adminMiddleware,
    OrderAdminController.getAllOrders
)
router.post(
    `/searchOrder`,
    requireSignin,
    adminMiddleware,
    OrderAdminController.searchOrders
)

router.post(
    `/getDataFilterOrder`,
    requireSignin,
    adminMiddleware,
    OrderAdminController.getDataFilterOrder
)

router.post(
    `/getOrders`,
    requireSignin,
    adminMiddleware,
    OrderAdminController.getOrders
)

router.delete(
    '/deleteOrderById',
    requireSignin,
    adminMiddleware,
    OrderAdminController.deleteOrderById
)

module.exports = router
