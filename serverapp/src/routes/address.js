const express = require('express')
const AddressController = require('../app/controllers/AddressController')
const { userMiddleware, requireSignin } = require('../middleware')

const router = express.Router()

router.post(
    '/create',
    requireSignin,
    userMiddleware,
    AddressController.addAddress
)
router.post(
    '/getaddress',
    requireSignin,
    userMiddleware,
    AddressController.getAddress
)
router.post(
    '/deleteAddress',
    requireSignin,
    userMiddleware,
    AddressController.deleteAddress
)
module.exports = router
