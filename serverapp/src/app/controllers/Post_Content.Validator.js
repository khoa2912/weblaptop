const mongoose = require('mongoose'),
    Post_Content = mongoose.model('Post_Content'),
    // System_ParameterSchema = require('../../models/System_Parameter/System_Parameter.Model'),
    Mps_ConstantCommon = require('../../commons/Mps_Constant.Common')

mongoose.Promise = global.Promise
module.exports.checkBeforeCreate = function (model) {
    //Kiểm tra mã duy nhất
    const query = {}
    query.Post_Content_Code = model.Post_Content_Code
    query.System_UniqueCode = model.System_UniqueCode
    return new Promise((resolve) => {
        Post_Content.find({ $and: [query] }, function (err, task) {
            if (err) {
                resolve(Mps_ConstantCommon.MPS_RESULTS.ERROR)
            }
            if (task.length > 0) {
                resolve(Mps_ConstantCommon.MPS_RESULTS.DATA_EXIST)
            } else {
                resolve(Mps_ConstantCommon.MPS_RESULTS.SUCCESS)
            }
        })
    })
}

module.exports.checkBeforeUpdate = function (model) {
    const query = {}
    query.Post_Content_Code = model.Post_Content_Code
    query.System_UniqueCode = model.System_UniqueCode
    return new Promise((resolve) => {
        Post_Content.find({ $and: [query] }, function (err, task) {
            if (err) {
                resolve(Mps_ConstantCommon.MPS_RESULTS.ERROR)
            }
            if (task.length === 0) {
                resolve(Mps_ConstantCommon.MPS_RESULTS.DATA_NOT_EXIST)
            } else {
                resolve(Mps_ConstantCommon.MPS_RESULTS.SUCCESS)
            }
        })
    })
}

module.exports.checkBeforeDelete = function (models) {
    let deleteDataModel = []
    const errorResults = []
    //Thực hiện kiểm tra dữ liệu trước khi xóa.
    // const checkValidDelete1 = await checkValidDelete1(models);
    // if (checkValidDelete1.returnCode !== Mps_ConstantCommon.MPS_RESULTS.SUCCESS) {
    // 	let valueExist = [...new Set(checkValidDelete1.data.map(m => m._doc.FieldName))];
    // 	deleteDataModel = await models.filter(m => !valueExist.includes(m.FieldName));
    // 	//Thêm records vào danh sách lỗi
    // 	if (!!valueExist && valueExist.length > 0) {
    // 		errorResults.push({
    // 			database: 'Tên collection kiểm tra',
    // 			valueExist
    // 		});
    // 	}
    // } else {
    // 	deleteDataModel = models;
    // }
    deleteDataModel = models
    return {
        returnCode:
            !!deleteDataModel && deleteDataModel.length > 0
                ? Mps_ConstantCommon.MPS_RESULTS.SUCCESS
                : Mps_ConstantCommon.MPS_RESULTS.ERROR,
        data: { errorResults, successResults: deleteDataModel },
    }
}

module.exports.checkRelatedBusiness = function () {
    //To do
    return Mps_ConstantCommon.MPS_RESULTS.SUCCESS
}

module.exports.checkBeforeImport = async function (models) {
    const dataNoEmpty = models.filter((value) => value != null)
    const dataExist = dataNoEmpty.filter(
        (value, index, array) =>
            index !==
            array.findIndex(
                (t) => t.Post_Content_Code === value.Post_Content_Code
            )
    )
    const codeExist = dataExist.map((value) => value.Post_Content_Code)
    const dataModel = dataNoEmpty.filter(
        (value) =>
            !codeExist.includes(value.Post_Content_Code) &&
            value.Post_Content_Code &&
            value.Post_Content_Name
    )
    const errorResults = []
    let importDataModel = []

    //Kiểm tra mã duy nhất
    const checkCodeUniqueResult = await checkCodeUnique(models)
    if (
        checkCodeUniqueResult.returnCode !==
        Mps_ConstantCommon.MPS_RESULTS.SUCCESS
    ) {
        const rule0 = [
            ...new Set(
                checkCodeUniqueResult.data.map((m) => m.Post_Content_Code)
            ),
        ]
        //Lọc lại những record thỏa điều kiện.
        importDataModel = dataModel.filter(
            (m) => !rule0.includes(m.Post_Content_Code)
        )
        //Thêm records vào danh sách lỗi
        errorResults.push(checkCodeUniqueResult)
    } else {
        importDataModel = dataModel
    }

    //Kiểm tra mã trạng thái hợp lệ
    // const checkValidStatusCodeResult = await checkValidStatusCode(models);
    // if (checkValidStatusCodeResult.returnCode === Mps_ConstantCommon.MPS_RESULTS.SUCCESS) {
    // 	//Lọc lại những record thỏa điều kiện.
    // 	const statusCodes = [...new Set(checkValidStatusCodeResult.data.map(m => m.System_Parameter_Code))];
    // 	importDataModel = importDataModel.filter(m => (statusCodes.includes(m.Status)));
    // } else {
    // 	//Lọc lại những record thỏa điều kiện.
    // 	const statusCodes = [...new Set(checkValidStatusCodeResult.data.map(m => m.System_Parameter_Code))];
    // 	importDataModel = importDataModel.filter(m => (statusCodes.includes(m.Status)));
    // 	//Thêm records vào danh sách lỗi
    // 	errorResults.push(checkValidStatusCodeResult);
    // }

    // //Kiểm tra theo business rule 1
    // const checkValidateRule1Result = await checkValidateRule1(models);
    // if(checkValidateRule1Result.returnCode !== Mps_ConstantCommon.MPS_RESULTS.SUCCESS){
    // 	//Lọc lại những record thỏa điều kiện.
    // 	const rule1 = [...new Set(checkValidateRule1Result.data.map(m=> m.Post_Content_Code))];
    // 	importDataModel = importDataModel.filter(m=> !(rule1.includes(m.Post_Content_Code)));
    // 	//Thêm records vào danh sách lỗi
    // 	errorResults.push(checkValidateRule1Result);
    // }

    // //Kiểm tra theo business rule n
    // const checkValidateRuleNResult = await checkValidateRuleN(models);
    // if(checkValidateRuleNResult.returnCode !== Mps_ConstantCommon.MPS_RESULTS.SUCCESS){
    // 	//Lọc lại những record thỏa điều kiện.
    // 	const ruleN = [...new Set(checkCodeUniqueResult.data.map(m=> m.Post_Content_Code))];
    // 	importDataModel = importDataModel.filter(m=> !(ruleN.includes(m.Post_Content_Code)));
    // 	//Thêm records vào danh sách lỗi
    // 	errorResults.push(checkValidateRuleNResult);
    // }

    return {
        returnCode:
            !!importDataModel && importDataModel.length > 0
                ? Mps_ConstantCommon.MPS_RESULTS.SUCCESS
                : Mps_ConstantCommon.MPS_RESULTS.ERROR,
        data: { errorResults, sucessResults: importDataModel },
    }
    //To do
}

function checkCodeUnique(models) {
    //To do
    return new Promise((resolve) => {
        const codes = [...new Set(models.map((m) => m.Post_Content_Code))]
        const query = {}
        query.Post_Content_Code = { $in: codes }
        query.System_UniqueCode = models.System_UniqueCode
        Post_Content.find({ $and: [query] }).exec(function (err, data) {
            if (err) {
                resolve({
                    returnCode: Mps_ConstantCommon.MPS_RESULTS.ERROR,
                    data: err,
                })
            }
            if (!!data && data.length > 0) {
                resolve({
                    returnCode: Mps_ConstantCommon.MPS_RESULTS.DATA_EXIST,
                    data,
                })
            } else {
                resolve({
                    returnCode: Mps_ConstantCommon.MPS_RESULTS.SUCCESS,
                    data,
                })
            }
        })
    })
}

//  function checkValidStatusCode(models) {
// 	return new Promise(resolve => {
// 		const status = [...new Set(models.map(m => m.Status))];
// 		System_ParameterSchema.find({ System_Parameter_Code: { $in: status } })
// 			.exec(
// 				function (err, data) {
// 					if (err) {
// 						resolve({ returnCode: Mps_ConstantCommon.MPS_RESULTS.ERROR, err });
// 					}
// 					if (!!data && data.length > 0) {
// 						resolve({ returnCode: Mps_ConstantCommon.MPS_RESULTS.SUCCESS, data });
// 					} else {
// 						resolve({ returnCode: Mps_ConstantCommon.MPS_RESULTS.ERROR, data });
// 					}
// 				}
// 			);
// 	});
// }

function checkValidateRule1(models) {
    //To do
    return Mps_ConstantCommon.MPS_RESULTS.SUCCESS
    // return new Promise(resolve => {
    // 	const codes = [...new Set(models.map(m=> m.[Field muốn kiểm tra]))];
    // 	Post_Content.find({điều kiện kiểm tra}})
    // 	  .exec(
    // 		  function(err, data) {
    // 			if (err) {
    // 			  resolve({returnCode: Mã lỗi, data:err});
    // 			}
    // 			if(!!data && data.length > 0){
    // 				resolve({returnCode: Mã lỗi, data:data});
    // 			}else{
    // 				resolve({returnCode: Mps_ConstantCommon.MPS_RESULTS.SUCCESS, data:data});
    // 			}

    // 		  }
    // 	  )
    //   });
}

function checkValidateRuleN(models) {
    //To do
    return Mps_ConstantCommon.MPS_RESULTS.SUCCESS
    // return new Promise(resolve => {
    // 	const codes = [...new Set(models.map(m=> m.[Field muốn kiểm tra]))];
    // 	Post_Content.find({điều kiện kiểm tra}})
    // 	  .exec(
    // 		  function(err, data) {
    // 			if (err) {
    // 			  resolve({returnCode: Mã lỗi, data:err});
    // 			}
    // 			if(!!data && data.length > 0){
    // 				resolve({returnCode: Mã lỗi, data:data});
    // 			}else{
    // 				resolve({returnCode: Mps_ConstantCommon.MPS_RESULTS.SUCCESS, data:data});
    // 			}

    // 		  }
    // 	  )
    //   });
}
