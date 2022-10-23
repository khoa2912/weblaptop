const express = require('express')

const router = express.Router()
const AuthController = require('../app/controllers/AuthController')
const {
    validateSigninRequest,
    isRequestValidated,
} = require('../validator/auth')
const { requireSignin } = require('../middleware')

const config = {
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
}

router.post(
    '/signup',
    validateSigninRequest,
    isRequestValidated,
    AuthController.signup
)
router.post(
    '/signin',
    validateSigninRequest,
    isRequestValidated,
    AuthController.signin
)
router.post('/refresh_token', AuthController.getAccessToken)
router.post('/forgot', AuthController.forgotPassword)
router.post('/reset', requireSignin, AuthController.resetPassword)
router.post('/google_login', AuthController.googleLogin)
router.post('/facebook_login', AuthController.facebookLogin)
router.get('/infor', requireSignin, AuthController.getUserInfor)
router.post('/activation', AuthController.activateEmail)
router.post('/updateProfile', requireSignin, AuthController.updateProfile)
router.post('/profile', requireSignin)
router.get('/', (req, res, next) =>
    res.status(200).json({ message: 'connected' })
)

module.exports = router
