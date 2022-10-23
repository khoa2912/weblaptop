const express = require('express')

const router = express.Router()
const { validationResult } = require('express-validator')
const User = require('../../app/models/User')
const AdminAuthController = require('../../app/controllers/Admin/AuthController')
const {
    validateSigninRequest,
    isRequestValidated,
} = require('../../validator/auth')
const { requireSignin } = require('../../middleware')

// router.post('/signin',(req,res,next)=>{
// })

router.post(
    '/signup',
    validateSigninRequest,
    isRequestValidated,
    AdminAuthController.signup
)
router.post(
    '/signin',
    validateSigninRequest,
    isRequestValidated,
    AdminAuthController.signin
)
router.delete(
    '/deleteAccountById',
    // requireSignin,
    // adminMiddleware,
    AdminAuthController.deleteAccountById
)
router.post(
    '/updateUser',
    // requireSignin,
    AdminAuthController.updateUser
)
router.post('/refresh_token', AdminAuthController.getAccessToken)
router.get('/infor', requireSignin, AdminAuthController.getUserInfor)
router.post('/setstatus', AdminAuthController.setStatusUser)
router.post('/getUsers', AdminAuthController.getUsers)
router.post('/getAllUsers', AdminAuthController.getAllUsers)
router.post('/createUser', requireSignin, AdminAuthController.createUser)
router.post('/getDataFilterUser', AdminAuthController.getDataFilterUser)
router.post('/signout', requireSignin, AdminAuthController.signout)
router.post('/profile', requireSignin)

module.exports = router
