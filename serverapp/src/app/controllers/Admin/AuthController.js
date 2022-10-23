// const Users = require('../models/User');
// const { mongooseToObject } = require('../../util/mongoose');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const shortid = require('shortid')
const User = require('../../models/User')
const NodeCache = require('node-cache')
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 })

function generateSortOptions(sortFields, sortAscending = true) {
    const sort = {}
    const sortType = sortAscending ? 1 : -1
    return new Promise((resolve) => {
        if (!!sortFields && sortFields.length > 0) {
            sortFields.forEach((field) => {
                switch (field) {
                    case 'RoleName': {
                        sort.RoleName = sortType
                        break
                    }
                    case 'StatusName': {
                        sort.StatusName = sortType
                        break
                    }
                    default:
                        break
                }
            })
            resolve(sort)
        } else {
            resolve({})
        }
    })
}

class AuthController {
    async createUser(req, res, next) {
        const { firstName, lastName, email, hash_password, role, contactNumber, profilePicture, status } = req.body
        console.log(req.body)

        const password = await bcrypt.hash(hash_password, 10)

        const user = new User ({
            firstName,
            lastName,
            userName:email,
            email,
            hash_password:password,
            role,
            contactNumber,
            profilePicture,
            status,
            createdBy: req.user.id,
        })
        // eslint-disable-next-line consistent-return
        user.save((error, user) => {
            if (error) return res.status(400).json({ error })
            if (user) {
                res.status(201).json({ user })
            }
        })
    }

    async updateUser(req, res, next) {
        const password = await bcrypt.hash(req.body.hash_password, 10)
        User.findOneAndUpdate(
            { _id: req.body._id },
            {
                $set: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    hash_password: password,
                    role: req.body.role,
                    contactNumber: req.body.contactNumber,
                    profilePicture: req.body.profilePicture,
                    status: req.body.status,
                },
            },
            { new: true, upsert: true }
        ).exec((error, user) => {
            console.log(error)
            if (error) return res.status(400).json({ error })
            if (user) {
                res.status(201).json({ user })
            }
        })
    }

    // [POST] /buyer/signup
    signup(req, res, next) {
        User.findOne({ email: req.body.email }).exec(async (error, user) => {
            if (user)
                return res.status(400).json({
                    message: 'Admin already registered',
                })
            const { role, firstName, lastName, email, password } = req.body
            // eslint-disable-next-line camelcase
            const hash_password = await bcrypt.hash(password, 10)
            // eslint-disable-next-line no-underscore-dangle
            const _user = new User({
                role,
                firstName,
                lastName,
                email,
                // eslint-disable-next-line camelcase
                hash_password,
                userName: shortid.generate(),
                role: 'admin',
            })
            // eslint-disable-next-line no-shadow
            _user.save((error, data) => {
                if (error) {
                    return res
                        .status(400)
                        .json({ message: 'Something went wrong' })
                }

                if (data) {
                    return res.status(201).json({
                        message: 'Admin created Successfully...!',
                    })
                }
            })
        })
    }

    //[POST] /admin/signin
    signin(req, res) {
        User.findOne({ email: req.body.email }).exec(async (error, user) => {
            if (error) return res.status(400).json({ error })
            if (user) {
                const isPassword = user.authenticate(req.body.password)
                if (
                    isPassword &&
                    (user.role === 'admin' || user.role === 'super-admin')
                ) {
                    const refresh_token = createRefreshToken({
                        id: user._id,
                        role: user.role,
                    })

                    res.status(200).json({
                        message: 'Login success!',
                        token: refresh_token,
                    })
                } else {
                    return res.status(400).json({
                        message: 'Invalid Password',
                    })
                }
            } else {
                return res.status(400).json({ message: 'Something went wrong' })
            }
        })
    }

    signout(req, res, next) {
        res.clearCookie('token')
        res.status(200).json({
            message: 'Signout successfully...!',
        })
    }

    // eslint-disable-next-line consistent-return
    getAccessToken(req, res) {
        try {
            // eslint-disable-next-line camelcase
            const rf_token = req.body.refreshtoken

            // eslint-disable-next-line camelcase
            if (!rf_token)
                return res.status(400).json({ msg: 'Please login now!' })
            jwt.verify(
                rf_token,
                process.env.REFRESH_TOKEN_SECRET,
                // eslint-disable-next-line consistent-return
                (err, user) => {
                    if (err)
                        return res
                            .status(400)
                            .json({ msg: 'Please login now!' })

                    // eslint-disable-next-line no-use-before-define, camelcase
                    const access_token = createAccessToken({
                        id: user.id,
                        role: user.role,
                    })

                    // eslint-disable-next-line camelcase
                    res.json({ access_token })
                }
            )
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }

    // eslint-disable-next-line consistent-return
    async getUserInfor(req, res) {
        try {
            const user = await User.findById(req.user.id).select('-password')
            res.json(user)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }

    getUsers = async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Headers', '*')
        res.header('Access-Control-Allow-Credentials', true)

        try {
            const users = await User.find({})
                .exec()
            myCache.set('allUsers', users)
            res.status(200).json({ users })
        } catch (error) {
            console.log(error)
        }
    }

    async getAllUsers(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Headers', '*')
        res.header('Access-Control-Allow-Credentials', true)
        if (myCache.has('allUsers')) {
            res.status(200).json({ allUsers: myCache.get('allUsers') })
        } else {
            const allUsers = await User.find({}).populate(
                
            )
            if (allUsers) {
                myCache.set('allUsers', allUsers)
                res.status(200).json({ allUsers })
            }
        }
    }

    deleteAccountById = (req, res) => {
        const { userId } = req.body.payload
        if (userId) {
            User.deleteMany({ _id: userId }).exec((error, result) => {
                if (error) return res.status(400).json({ error })
                if (result) {
                    res.status(202).json({ result })
                }
            })
        } else {
            res.status(400).json({ error: 'Params required' })
        }
    }

    getDataFilterUser = async (req, res, next) => {
        const options = {
            limit: 99,
            lean: true,
        }
        console.log(req.body)
        const searchModel = req.body
        const query = {}

        if (
            !!searchModel.RoleName &&
            Array.isArray(searchModel.RoleName) &&
            searchModel.RoleName.length > 0
        ) {
            query.role = { $in: searchModel.RoleName }
        }

        if (
            !!searchModel.StatusName &&
            Array.isArray(searchModel.StatusName) &&
            searchModel.StatusName.length > 0
        ) {
            query.status = { $in: searchModel.StatusName }
        }

        if (
            !!searchModel.Account_Name &&
            Array.isArray(searchModel.Account_Name) &&
            searchModel.Account_Name.length > 0
        ) {
            query._id = { $in: searchModel.Account_Name }
        }

        if (
            !!searchModel.Email &&
            Array.isArray(searchModel.Email) &&
            searchModel.Email.length > 0
        ) {
            query.email = { $in: searchModel.Email }
        }

        User.paginate({ $and: [query] }, options).then(function (result) {
            return res.json({
                result,
            })
        })
    }

    search = async function (req, res) {
        const query = {}
        const { page } = req.body.searchOptions
        const limit = parseInt(req.body.searchOptions.limit, 99)
        const sortFields = req.body.searchOptions.sort
        const sortAscending = req.body.searchOptions.sortAscending
        //Tạo điều kiện sắp xếp
        const sort = await generateSortOptions(sortFields, sortAscending)
        const options = {
            //select:   'Status',
            sort,
            page,
            limit,
            lean: true,
        }

        const searchModel = req.body.searchModel

        if (
            !!searchModel.StatusName &&
            searchModel.StatusName.length > 0
        ) {
            query.StatusName = { $in: searchModel.StatusName }
        }

        if (
            !!searchModel.RoleName &&
            searchModel.RoleName.length > 0
        ) {
            query.RoleName = { $in: searchModel.RoleName }
        }

        User.paginate({ $and: [query] }, options).then(function (result) {
            return res.json({
                returnCode: 1,
                result,
            })
        })
    }

    setStatusUser(req, res) {
        // eslint-disable-next-line consistent-return
        User.findOne({ _id: req.body.id }).exec(async (error, user) => {
            try {
                const { id } = req.body
                if (user.status === 'disable') {
                    const updateStatus = User.findOneAndUpdate(
                        { _id: id },
                        { $set: { status: 'enable' } },
                        { new: true }
                        // eslint-disable-next-line no-shadow, consistent-return
                    ).exec((error, result) => {
                        if (error) return res.status(400).json({ error })
                        if (result) {
                            return res.status(201).json({ updateStatus })
                        }
                    })
                } else {
                    const updateStatus = User.findOneAndUpdate(
                        { _id: id },
                        { $set: { status: 'disable' } },
                        { new: true }
                        // eslint-disable-next-line no-shadow, consistent-return
                    ).exec((error, result) => {
                        if (error) return res.status(400).json({ error })
                        if (result) {
                            return res.status(201).json({ updateStatus })
                        }
                    })
                }
            } catch (err) {
                return res.status(500).json({ msg: err.message })
            }
        })
    }
}
const createAccessToken = (payload) =>
    jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d',
    })

const createRefreshToken = (payload) =>
    jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '15d',
    })
module.exports = new AuthController()
