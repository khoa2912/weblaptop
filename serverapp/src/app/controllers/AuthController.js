const Users = require('../models/User')
const { mongooseToObject } = require('../../util/mongoose')
const jwt = require('jsonwebtoken')
const { validationResult, Result } = require('express-validator')
const bcrypt = require('bcrypt')
const shortid = require('shortid')

const generateJwtToken = (_id, role) =>
    jwt.sign({ _id, role }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    })
require('dotenv').config()
const fetch = require('node-fetch')
const { google } = require('googleapis')
const sendMail = require('./SendmailController')
const User = require('../models/User')

const { OAuth2 } = google.auth
const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID)

const { CLIENT_URL } = process.env
class UserController {
    // [POST] /buyer/signup
    signup(req, res) {
        User.findOne({ email: req.body.email }).exec(async (error, user) => {
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('Access-Control-Allow-Headers', '*')
            res.header('Access-Control-Allow-Credentials', true)
            if (user)
                return res.status(409).json({
                    error: 'datontai',
                })
            const { firstName, lastName, email, password } = req.body
            const hash_password = await bcrypt.hash(password, 10)

            const _user = {
                firstName,
                lastName,
                email,
                hash_password,
                userName: shortid.generate(),
            }
            const activation_token = createActivationToken(_user)
            const url = `${CLIENT_URL}/user/activate/${activation_token}`
            sendMail(email, url, 'Verify your email address')

            res.status(201).json({
                message:
                    'Đăng ký thành công. Vui lòng truy cập email để kích hoạt!!!',
            })
        })
    }

    // [POST] /buyer/signin
    signin(req, res, next) {
        try {
            User.findOne({ email: req.body.email }).exec(
                async (error, user) => {
                    if (error)
                        return res.status(400).json({ error: 'datontai' })
                    if (user) {
                        const validPassword = await bcrypt.compare(
                            req.body.password,
                            user.hash_password
                        )

                        if (validPassword && user.role === 'user') {
                            const refresh_token = createRefreshToken({
                                id: user._id,
                                role: user.role,
                                pass: req.body.password,
                            })
                            res.setHeader('Access-Control-Allow-Origin', '*')
                            res.setHeader('Access-Control-Allow-Headers', '*')
                            res.header('Access-Control-Allow-Credentials', true)
                            res.cookie('refreshtoken', 'haha', {
                                httpOnly: true,
                                path: '/buyer/refresh_token',
                                maxAge: 30 * 24 * 60 * 60 * 1000,
                                // 7 days
                            })

                            res.json({
                                message: 'Đăng nhập thành công!',
                                token: refresh_token,
                            })
                            /* const { firstName, lastName, email, role, fullName, _id } = user;
             res.status(200).json({
              token: access_token,
              user: {
                firstName,
                lastName,
                email,
                role,
                fullName,
                _id,
              },
            });  */
                        } else {
                            return res.status(400).json({
                                message: 'Sai mật khẩu vui lòng nhập lại!!!',
                            })
                        }
                    } else {
                        return res.status(400).json({
                            message: 'Có gì đó không ổn rồi quý khách ơi',
                        })
                    }
                }
            )
        } catch (error) {
            console.log(error)
        }
    }

    updateProfile(req, res) {
        const { userId, email } = req.body.data.payload
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Headers', '*')
        res.header('Access-Control-Allow-Credentials', true)

        const updateProfile = User.findOneAndUpdate(
            { _id: userId },
            { $set: { email } },
            { new: true }
        ).exec((error, result) => {
            if (error) return res.status(400).json({ error })
            if (result) {
                return res.status(201).json({ updateProfile })
            }
        })
    }

    activateEmail(req, res) {
        try {
            const { activation_token } = req.body
            const user = jwt.verify(
                activation_token,
                process.env.ACTIVATION_TOKEN_SECRET
            )
            res.setHeader('X-Foo', 'bar')
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('Access-Control-Allow-Headers', '*')
            res.header('Access-Control-Allow-Credentials', true)
            if (user) {
                const { firstName, lastName, email, hash_password, userName } =
                    user

                const _user = new User({
                    firstName,
                    lastName,
                    email,
                    hash_password,
                    userName,
                })
                _user.save((error, user) => {
                    if (error) {
                        console.log(error)
                        return res.status(400).json({
                            message: 'Có gì đó không ổn rồi khách ơi',
                        })
                    }
                    res.status(201).json({
                        message: 'Tài khoản đã được đăng ký thành công!!',
                    })
                })
            }
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    }

    getAccessToken(req, res) {
        try {
            const rf_token = req.body.refreshtoken
            if (!rf_token)
                return res.status(400).json({ msg: 'Please login now!' })
            jwt.verify(
                rf_token,
                process.env.REFRESH_TOKEN_SECRET,
                (err, user) => {
                    if (err)
                        return res
                            .status(400)
                            .json({ msg: 'Please login now!' })
                    const access_token = createAccessToken({
                        id: user.id,
                        role: user.role,
                        pass: user.pass,
                    })
                    res.json({ access_token })
                }
            )
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }

    async getUserInfor(req, res) {
        try {
            const user = await Users.findById(req.user.id).select('-password')
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('Access-Control-Allow-Headers', '*')
            res.header('Access-Control-Allow-Credentials', true)

            user.hash_password = req.user.pass
            res.json(user)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }

    async forgotPassword(req, res) {
        try {
            const { email } = req.body
            const user = await Users.findOne({ email })
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('Access-Control-Allow-Headers', '*')
            res.header('Access-Control-Allow-Credentials', true)
            if (!user)
                return res
                    .status(400)
                    .json({ msg: 'This email does not exist.' })

            const access_token = createAccessToken({ id: user._id })
            const url = `${CLIENT_URL}/user/reset/${access_token}`

            sendMail(email, url, 'Reset your password')
            res.json({ msg: 'Re-send the password, please check your email.' })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }

    async resetPassword(req, res) {
        try {
            const { password } = req.body
            res.setHeader('Access-Control-Allow-Origin', '*')
            res.setHeader('Access-Control-Allow-Headers', '*')
            res.header('Access-Control-Allow-Credentials', true)
            const passwordHash = await bcrypt.hash(password, 12)
            await Users.findOneAndUpdate(
                { _id: req.user.id },
                {
                    hash_password: passwordHash,
                }
            ).exec()

            res.json({ msg: 'Password successfully changed!' })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }

    async googleLogin(req, res) {
        try {
            const { tokenId } = req.body

            const verify = await client.verifyIdToken({
                idToken: tokenId,
                audience: process.env.MAILING_SERVICE_CLIENT_ID,
            })

            const { email_verified, email, given_name, family_name } =
                verify.payload

            const password = email + process.env.GOOGLE_SECRET

            const passwordHash = await bcrypt.hash(password, 12)

            if (!email_verified)
                return res
                    .status(400)
                    .json({ msg: 'Email verification failed.' })

            const user = await Users.findOne({ email })

            if (user) {
                const isMatch = await bcrypt.compare(
                    password,
                    user.hash_password
                )
                if (!isMatch)
                    return res
                        .status(400)
                        .json({ msg: 'Password is incorrect.' })

                const refresh_token = createRefreshToken({
                    id: user._id,
                    role: user.role,
                })
                res.json({ msg: 'Login success!', token: refresh_token })
            } else {
                const newUser = new Users({
                    firstName: given_name,
                    lastName: family_name,
                    email,
                    hash_password: passwordHash,
                    userName: shortid.generate(),
                })

                await newUser.save()

                const refresh_token = createRefreshToken({ id: newUser._id })
                res.cookie('refreshtoken', refresh_token, {
                    httpOnly: true,
                    path: '/user/refresh_token',
                    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                })

                res.json({ msg: 'Login success!', token: refresh_token })
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }

    async facebookLogin(req, res) {
        try {
            const { accessToken, userID } = req.body

            const URL = `https://graph.facebook.com/v2.9/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`

            const data = await fetch(URL)
                .then((res) => res.json())
                .then((res) => res)

            const { email, name } = data

            const password = email + process.env.FACEBOOK_SECRET

            const passwordHash = await bcrypt.hash(password, 12)

            const user = await Users.findOne({ email })

            if (user) {
                const isMatch = await bcrypt.compare(
                    password,
                    user.hash_password
                )
                if (!isMatch)
                    return res
                        .status(400)
                        .json({ msg: 'Password is incorrect.' })

                const refresh_token = createRefreshToken({
                    id: user._id,
                    role: user.role,
                })

                res.json({ msg: 'Login success!', token: refresh_token })
            } else {
                const newUser = new Users({
                    firstName: name.split(' ')[0],
                    lastName: name.split(' ')[1] + name.split(' ')[2],
                    email,
                    hash_password: passwordHash,
                    userName: shortid.generate(),
                })

                await newUser.save()

                const refresh_token = createRefreshToken({
                    id: newUser._id,
                    role: 'user',
                })
                res.cookie('refreshtoken', refresh_token, {
                    httpOnly: true,
                    path: '/user/refresh_token',
                    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
                })

                res.json({ msg: 'Login success!', token: refresh_token })
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

const createActivationToken = (payload) =>
    jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
        expiresIn: '5m',
    })

const createAccessToken = (payload) =>
    jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '40m',
    })

const createRefreshToken = (payload) =>
    jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '90d',
    })
module.exports = new UserController()
