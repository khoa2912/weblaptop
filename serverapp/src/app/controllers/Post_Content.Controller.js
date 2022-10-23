/*'use strict';*/

const mongoose = require('mongoose'),
    Post_Content = require('../models/Post_Content.Model'),
    Post_Content_Validate = require('./Post_Content.Validator'),
    Mps_ConstantCommon = require('../../commons/Mps_Constant.Common'),
    Mps_MethodCommon = require('../../commons/Mps_Method.Common')
mongoose.Promise = global.Promise
function generateSortOptions(sortFields, sortAscending = true) {
    const sort = {}
    //1: Tăng dần, -1: giảm dần.
    const sortType = sortAscending ? 1 : -1
    return new Promise((resolve) => {
        if (!!sortFields && sortFields.length > 0) {
            sortFields.forEach((field) => {
                switch (field) {
                    case 'Post_Content_Code': {
                        sort.Post_Content_Code = sortType
                        break
                    }
                    case 'Post_Content_Name': {
                        sort.Post_Content_Name = sortType
                        break
                    }
                    case 'Post_Content_Link': {
                        sort.Post_Content_Link = sortType
                        break
                    }
                    case 'Post_Content_Description': {
                        sort.Post_Content_Description = sortType
                        break
                    }
                    case 'CreatedBy': {
                        sort.CreatedBy = sortType
                        break
                    }
                    case 'CreatedDate': {
                        sort.CreatedDate = sortType
                        break
                    }
                    case 'UpdatedBy': {
                        sort.UpdatedBy = sortType
                        break
                    }
                    case 'UpdatedDate': {
                        sort.UpdatedDate = sortType
                        break
                    }
                    case 'AltImage': {
                        sort.AltImage = sortType
                        break
                    }
                    case 'Post_Content_Schema': {
                        sort.Post_Content_Schema = sortType
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
exports.search = async function (req, res) {
    const query = {}
    const { page, language } = req.body.searchOptions
    const limit = parseInt(req.body.searchOptions.limit, 10)
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
    if (!!searchModel.Post_Content_Code) {
        query.Post_Content_Code = {
            $regex: new RegExp(searchModel.Post_Content_Code, 'i'),
        }
    }
    if (!!searchModel.Post_Content_Name) {
        query.Post_Content_Name = {
            $regex: new RegExp(searchModel.Post_Content_Name, 'i'),
        }
    }
    if (!!searchModel.Post_Content_Link) {
        query.Post_Content_Link = {
            $regex: new RegExp(searchModel.Post_Content_Link, 'i'),
        }
    }
    if (!!searchModel.Alt_Image) {
        query.Alt_Image = { $regex: new RegExp(searchModel.Alt_Image, 'i') }
    }
    if (!!searchModel.Post_Content_Schema) {
        query.Post_Content_Schema = {
            $regex: new RegExp(searchModel.Post_Content_Schema, 'i'),
        }
    }
    if (!!searchModel.Post_Content_Description) {
        query.Post_Content_Description = {
            $regex: new RegExp(searchModel.Post_Content_Description, 'i'),
        }
    }

    if (!!searchModel.Post_Content_Content) {
        query.Post_Content_Content = {
            $regex: new RegExp(searchModel.Post_Content_Content, 'i'),
        }
    }
    if (
        !!searchModel.Post_Content_Category &&
        searchModel.Post_Content_Category.length > 0
    ) {
        query.Post_Content_Category = { $in: searchModel.Post_Content_Category }
    }

    if (!!searchModel.Status && searchModel.Status.length > 0) {
        query.Status = { $in: searchModel.Status }
    }
    if (!!searchModel.CreatedDate && searchModel.CreatedDate.length === 2) {
        const dateFrom = new Date(searchModel.CreatedDate[0])
        const startDate = new Date(
            dateFrom.getFullYear(),
            dateFrom.getMonth(),
            dateFrom.getDate(),
            0,
            0,
            0
        )
        const dateTo = new Date(searchModel.CreatedDate[1])
        const endDate = new Date(
            dateTo.getFullYear(),
            dateTo.getMonth(),
            dateTo.getDate(),
            23,
            59,
            59
        )
        query.CreatedDate = { $gte: startDate, $lte: endDate }
    }
    if (!!searchModel.UpdatedDate && searchModel.UpdatedDate.length === 2) {
        const dateFrom = new Date(searchModel.UpdatedDate[0])
        const startDate = new Date(
            dateFrom.getFullYear(),
            dateFrom.getMonth(),
            dateFrom.getDate(),
            0,
            0,
            0
        )
        const dateTo = new Date(searchModel.UpdatedDate[1])
        const endDate = new Date(
            dateTo.getFullYear(),
            dateTo.getMonth(),
            dateTo.getDate(),
            23,
            59,
            59
        )
        query.UpdatedDate = { $gte: startDate, $lte: endDate }
    }

    Post_Content.paginate({ $and: [query] }, options).then(function (result) {
        return res.json({
            returnCode: 1,
            result,
        })
    })
}
exports.uploadImage = async function (req, res) {
    if (req.files.length > 0) {
        res.json(req.files[0])
    }
}
exports.getDataFilter = async function (req, res) {
    const page = req.body.page
    const limit = parseInt(req.body.limit, 10)
    const options = {
        select: '_id Post_Content_Code Post_Content_Name',
        lean: true,
        page,
        limit,
    }
    const query1 = {}
    const query2 = {}
    const query3 = {}
    const query4 = {}
    const queryStatus = {}
    const searchModel = req.body.searchModel
    //Tạo query get data theo permission
    if (!!searchModel.Status && !Array.isArray(searchModel.Status)) {
        queryStatus.Status = searchModel.Status
    }
    if (!!searchModel.Status && Array.isArray(searchModel.Status)) {
        queryStatus.Status = { $in: searchModel.Status }
    }
    if (!!searchModel.Value) {
        const str = searchModel.Value
        query1.Post_Content_Code = { $regex: new RegExp(str, 'i') }
        query2.Post_Content_Name = { $regex: new RegExp(str, 'i') }
        query3.Alt_Image = { $regex: new RegExp(str, 'i') }
        query4.Post_Content_Schema = { $regex: new RegExp(str, 'i') }
    }
    Post_Content.find(
        { $and: [queryStatus, { $or: [query1, query2, query3, query4] }] },
        'Post_Content_Code',
        function (err, result) {
            if (!err) {
                return res.json({
                    returnCode: 1,
                    result,
                })
            } else {
                return res.status(400).send({
                    returnCode: -1,
                    data: err,
                })
            }
        }
    )
    Post_Content.paginate(
        { $and: [queryStatus, { $or: [query1, query2] }] },
        options
    ).then(function (results) {
        return res.json({
            returnCode: 1,
            results,
        })
    })
}

exports.getById = async function (req, res) {
    const query = { _id: !!req.params._id ? req.params._id : 0 }

    Post_Content.find({ $and: [query] }, function (err, result) {
        if (!err) {
            return res.json({
                returnCode: 1,
                result,
            })
        } else {
            return {
                returnCode: -1,
                result,
                err: err.message,
            }
        }
    })
}

exports.create = async function (req, res) {
    const model = new Post_Content(req.body)
    model._id = null
    model.Create_By = req.user.id
    model.CreatedDate = Mps_MethodCommon.formatDateNow()
    model.save(function (err, result) {
        if (err) {
            return res.status(400).send({
                returnCode: -1,
                data: err,
            })
        } else {
            return res.json({
                returnCode: 1,
                data: result,
            })
        }
    })
}

exports.update = async function (req, res) {
    const model = req.body
    const query = { _id: model._id }
    const queryUpdate = {
        Post_Content_Name: model.Post_Content_Name,
        Post_Content_Link: model.Post_Content_Link,
        Alt_Image: model.Alt_Image,
        Post_Content_Schema: model.Post_Content_Schema,
        Post_Content_Description: model.Post_Content_Description,
        Post_Content_Image: model.Post_Content_Image,
        Post_Content_Category: model.Post_Content_Category,
        Post_Content_Content: model.Post_Content_Content,
        UpdatedBy: req.user.id,
        UpdatedDate: Mps_MethodCommon.formatDateNow(),
    }

    const newValues = { $set: queryUpdate }

    Post_Content.findOneAndUpdate(query, newValues, function (err, result) {
        if (err) {
            return res.status(400).send({
                returnCode: Mps_ConstantCommon.MPS_RESULTS.ERROR,
                data: err,
            })
        } else {
            return res.json({
                returnCode: Mps_ConstantCommon.MPS_RESULTS.SUCCESS,
                data: result,
            })
        }
    })
}

exports.delete = async function (req, res) {
    const dataModel = req.body.model
    if (!!req.body.model) {
        const validationResult = await Post_Content_Validate.checkBeforeDelete(
            dataModel
        )
        if (
            validationResult.returnCode !==
            Mps_ConstantCommon.MPS_RESULTS.SUCCESS
        ) {
            return res.json({
                returnCode: Mps_ConstantCommon.MPS_RESULTS.ERROR,
                validationResult,
            })
        } else {
            Post_Content.deleteMany({ _id: dataModel }, function (err, result) {
                if (err) {
                    return res.json({
                        returnCode: Mps_ConstantCommon.MPS_RESULTS.ERROR,
                        data: err,
                    })
                } else {
                    // end ghi log
                    return res.json({
                        returnCode: Mps_ConstantCommon.MPS_RESULTS.SUCCESS,
                        result,
                        validationResult,
                    })
                }
            }).exec()
        }
    }
}

//Import data
exports.import = async function (req, res) {
    const user = await Mps_MethodCommon.verifyUserToken(
        req.headers.authorization
    )
    if (user === null || user === undefined) {
        return res.json({
            returnCode: Mps_ConstantCommon.MPS_RESULTS.ERROR,
            data: Mps_ConstantCommon.MPS_RESULTS.PERMISSION,
        })
    }
    //ghi log
    user.url = req.url
    user.headers = req.headers
    Log.create(
        user,
        Mps_ConstantCommon.MPS_SCREEN_NO.Post_Content,
        Mps_ConstantCommon.MPS_LOG_ACTION.Import,
        Mps_ConstantCommon.MPS_LOG_TYPE.Info,
        req.body
    )
    //end ghi log

    const dataModel = req.body.model
    dataModel.System_UniqueCode = user.System_UniqueCode
    const validationResult = await Post_Content_Validate.checkBeforeImport(
        dataModel
    )
    if (
        validationResult.returnCode !== Mps_ConstantCommon.MPS_RESULTS.SUCCESS
    ) {
        Log.create(
            user,
            Mps_ConstantCommon.MPS_SCREEN_NO.Post_Content,
            Mps_ConstantCommon.MPS_LOG_ACTION.Import,
            Mps_ConstantCommon.MPS_LOG_TYPE.Error,
            validationResult
        )
        return res.json({
            returnCode: Mps_ConstantCommon.MPS_RESULTS.IMPORT_ERROR,
            validationResult,
        })
    }
    const importDataModel = validationResult.data.sucessResults
    importDataModel.forEach(function (row) {
        row._id = null
        const model = new Post_Content(row)
        model._id = null
        model.System_UniqueCode = user.System_UniqueCode
        model.System_Branch = user.System_Branch
        model.CreatedBy = user._id
        model.CreatedDate = Mps_MethodCommon.formatDateNow()
        model.UpdatedDate = ''
        model.save(function (err, result) {
            //ghi log
            if (err) {
                Log.create(
                    user,
                    Mps_ConstantCommon.MPS_SCREEN_NO.Post_Content,
                    Mps_ConstantCommon.MPS_LOG_ACTION.Import,
                    Mps_ConstantCommon.MPS_LOG_TYPE.Error,
                    err
                )
            } else {
                Log.create(
                    user,
                    Mps_ConstantCommon.MPS_SCREEN_NO.Post_Content,
                    Mps_ConstantCommon.MPS_LOG_ACTION.Import,
                    Mps_ConstantCommon.MPS_LOG_TYPE.Sucess,
                    result
                )
            }
        })
    })
    return res.json({
        returnCode: Mps_ConstantCommon.MPS_RESULTS.SUCCESS,
        result: [],
    })
}
