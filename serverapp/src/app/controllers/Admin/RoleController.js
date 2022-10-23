const shortid = require('shortid')
const slugify = require('slugify')
const { json } = require('express')
const Role = require('../../models/Role')
const ObjectId = require('mongodb').ObjectID
const NodeCache = require('node-cache')
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 })

class RoleController {
    async create(req, res, next) {
        const { codeRole, nameRole, descriptionRole, status } = req.body
        const role = new Role({
            codeRole,
            nameRole,
            descriptionRole,
            status,
            createdBy: req.user.id,
        })
        // eslint-disable-next-line no-shadow, consistent-return
        role.save((error, role) => {
            if (error) return res.status(400).json({ error })
            if (role) {
                res.status(201).json({ role })
            }
        })
    }

    getRoles = async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Headers', '*')
        res.header('Access-Control-Allow-Credentials', true)

        try {
            const roles = await Role.find({})
                .populate(
                    { path: 'user', select: '_id firstname lastname' }
                )
                .exec()
            myCache.set('allRoles', roles)
            res.status(200).json({ roles })
        } catch (error) {
            console.log(error)
        }
    }

    async updateRole(req, res, next) {
        Role.findOneAndUpdate(
            { _id: req.body._id },
            {
                $set: {
                    codeRole: req.body.codeRole,
                    nameRole: req.body.nameRole,
                    descriptionRole: req.body.descriptionRole,
                    status: req.body.status
                },
            },
            { new: true, upsert: true }
        ).exec((error, result) => {
            console.log(error)
            if (error) return res.status(400).json({ error })
            if (result) {
                res.status(201).json({ result })
            }
        })
    }

    deleteRoleById = (req, res) => {
        const { roleId } = req.body.payload
        if (roleId) {
            Role.deleteMany({ _id: roleId }).exec((error, result) => {
                if (error) return res.status(400).json({ error })
                if (result) {
                    res.status(202).json({ result })
                }
            })
        } else {
            res.status(400).json({ error: 'Params required' })
        }
    }

    async getAllRoles(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Headers', '*')
        res.header('Access-Control-Allow-Credentials', true)
        if (myCache.has('allRoles')) {
            res.status(200).json({ allRoles: myCache.get('allRoles') })
        } else {
            const allRoles = await Role.find({}).populate(
                { path: 'user', select: '_id firstname lastname' }
            )
            if (allRoles) {
                myCache.set('allRoles', allRoles)
                res.status(200).json({ allRoles })
            }
        }
    }

    getDataFilterRole = async (req, res, next) => {
        const options = {
            limit: 99,
            lean: true,
        }
        console.log(req.body)
        const searchModel = req.body
        const query = {}
        if (
            !!searchModel.Role_Name &&
            Array.isArray(searchModel.Role_Name) &&
            searchModel.Role_Name.length > 0
        ) {
            query.nameRole = { $in: searchModel.Role_Name }
        }
        if (
            !!searchModel.Status &&
            Array.isArray(searchModel.Status) &&
            searchModel.Status.length > 0
        ) {
            query.status = { $in: searchModel.Status }
        }
        Role.paginate({ $and: [query] }, options).then(function (result) {
            return res.json({
                result,
            })
        })
    }

    async permissionRole(req, res, next) {
        try {
            const { codeSreen, codeRole } = req.body
            Role.findOneAndUpdate(
                { codeRole },
                { $set: { codeSreen } },
                { new: true },
                (err, role) => {
                    if (err) {
                        res.status(400).json({ error: 'error' })
                    }
                    res.status(200).json({ message: 'success' })
                }
            )
        } catch (e) {
            res.status(400).json({ error: 'error' })
        }
    }
}
module.exports = new RoleController()
