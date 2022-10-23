const mongoose = require("mongoose"),
  Mps_LabelFormat = require("./Mps_LabelFormat"),
  Mps_ConstantCommon = require("./Mps_Constant.Common"),
  moment = require("moment"),
  Mps_MethodCommon = require("./Mps_Method.Common");
mongoose.Promise = global.Promise;
module.exports = {
  checkValidateDataResult,
  getImportCode,
  checkValidateDataNoEmpty,

  convertValueImportToString,
  checkValidateFromToDateImport,
  subDate,
};
/**
 * @des Lọc dữ liệu khi import.
 * @param importDataModel Dữ liệu cần import.
 * @param dataErr Dữ liệu lỗi.
 * @param dbSearch Bang can tim kiem.
 * @param importCode Code lấy từ func getImportCode.
 * @param parameterType Lọai chỉ số hệ thống trong trường hợp có hoặc null nếu không phải.
 * @return returnCode.
 * @return data importDataModel - Dữ liệu đã lọc. dataErr - Dữ liệu có chứa lỗi.
 */
function checkValidateDataResult(
  dataResult,
  dbSearch,
  importCode,
  parameterType
) {
  const dbCode = importCode.dbCode;
  const valueCode = importCode.valueCode;
  const code = importCode.code;
  return new Promise((resolve) => {
    checkValidate(dataResult.dataErr, importCode, dbSearch, parameterType).then(
      (result) => {
        if (result.data !== undefined) {
          const data = result.data;
          const dataCode = [...new Set(data.map((m) => m[dbCode]))];
          dataResult.importDataModel = dataResult.importDataModel.filter((m) =>
            validateDataErr(m[valueCode], code, dataCode)
          );
          dataResult.dataErr = dataResult.dataErr.map((m) => {
            if (!validateDataErr(m[valueCode], code, dataCode)) {
              m[valueCode] = {
                value: m[valueCode],
                status: getStatusImport(m[valueCode], code),
              };
              m.err = true;
            }
            return m;
          });
        }
        const dataErr = dataResult.dataErr,
          importDataModel = dataResult.importDataModel;
        resolve({ dataErr, importDataModel });
      }
    );
  });
}

/**
 * @des Kiểm tra giá trị phải lỗi hay không.
 * @param data Dữ liệu cần kiểm tra.
 * @param code Điều kiện kiểm tra .
 * @param dataCode Danh sách kiểm tra.
 * @return boolean - Kết quả đúng sai..
 */
function validateDataErr(data, code, dataCode) {
  const clear =
    data === undefined || data === "undefined" || !data || data === "";
  const exist = dataCode.includes(data);
  switch (code) {
    case 0:
      return !clear && !exist;
    case 1:
      return !clear && exist;
    case 2:
      return clear || !exist;
    case 3:
      return clear || exist;
    default:
      return clear || exist;
  }
}

function getStatusImport(data, code) {
  const clear =
    data === undefined || data === "undefined" || !data || data === "";
  if (code < 2 && clear) return Mps_ConstantCommon.MPS_RESULTS.CLEAR;
  if (!(code % 2)) return Mps_ConstantCommon.MPS_RESULTS.DATA_EXIST;
  return Mps_ConstantCommon.MPS_RESULTS.DATA_NOT_EXIST;
}

function checkValidate(dataErr, importCode, dbSearch, parameterType) {
  const dbCode = importCode.dbCode;
  const valueCode = importCode.valueCode;
  const code = importCode.code;
  const uniqueCode = importCode.uniqueCode;
  return new Promise((resolve) => {
    let dataCode = dataErr
      .filter((m) => m[valueCode] !== "undefined")
      .map((m) => m[valueCode]);
    const query = {};
    if (!!parameterType) {
      query.System_Parameter_Type = parameterType;
      query.System_UniqueCode = {
        $in: [uniqueCode, Mps_ConstantCommon.DEFAULT_UNIQUECODE],
      };
    } else {
      query.System_UniqueCode = uniqueCode;
    }
    query[dbCode] = { $in: dataCode };
    dbSearch.find({ $and: [query] }).exec(function (err, data) {
      if (err) {
        resolve({
          returnCode: Mps_ConstantCommon.MPS_RESULTS.ERROR,
          data: err,
        });
      }
      if (!!data && data.length > 0) {
        if (!(code % 2))
          resolve({ returnCode: Mps_ConstantCommon.MPS_RESULTS.ERROR, data });
        else
          resolve({ returnCode: Mps_ConstantCommon.MPS_RESULTS.SUCCESS, data });
      } else {
        if (!(code % 2))
          resolve({ returnCode: Mps_ConstantCommon.MPS_RESULTS.SUCCESS, data });
        else
          resolve({ returnCode: Mps_ConstantCommon.MPS_RESULTS.ERROR, data });
      }
    });
  });
}

function checkValidateDataNoEmpty(data, valueCheck) {
  data.importDataModel.filter((m) => {
    let result = [true];
    valueCheck.forEach((element) => {
      result[0] = !!m[element] && m[element] !== "undefined";
    });
    return result[0];
  });
  data.dataErr.map((m) => {
    valueCheck.forEach((element) => {
      m[element] =
        !!m[element] && m[element] !== "undefined"
          ? m[element]
          : { value: m[element], status: Mps_ConstantCommon.MPS_RESULTS.CLEAR };
    });
    return m;
  });
}

function convertValueImportToString(data, convertValue) {
  data.dataNoEmpty.map((m) => {
    convertValue.forEach((element) => {
      m[element] = m[element] !== undefined ? `${m[element]}` : null;
    });
    return m;
  });
}

/**
 * @des Kiểm tra giá trị phải lỗi hay không.
 * @param clear Dữ liệu chấp nhận trống không? có true.
 * @param exist Dữ liệu kiểm tra tồn tại trong db? có true.
 * @return int - Kết quả 0 -> 3.
 */
function getImportCode(dbCode, valueCode, uniqueCode, clear, exist) {
  let code = clear ? 2 : 0;
  code += exist ? 1 : 0;
  return { dbCode, valueCode, uniqueCode, code };
}

function checkValidateDate(date, valueCheckDate, valueCheckHour) {
  if (!valueCheckDate && !valueCheckHour) {
    return Mps_ConstantCommon.MPS_RESULTS.ERROR;
  } else {
    let fromDate = "",
      toDate = "";
    let returnCode = Mps_ConstantCommon.MPS_RESULTS.SUCCESS;
    if (!!valueCheckDate && !valueCheckHour) {
      valueCheckDate.forEach((e) => {
        if (!date[e]) returnCode = Mps_ConstantCommon.MPS_RESULTS.CLEAR;
      });
      fromDate += moment
        .utc(`${date[valueCheckDate[0]]}`, Mps_LabelFormat.displayDateFormat)
        .format(Mps_LabelFormat.displayDateHourFormat);
      toDate += moment
        .utc(`${date[valueCheckDate[1]]}`, Mps_LabelFormat.displayDateFormat)
        .format(Mps_LabelFormat.displayDateHourFormat);
    }
    if (!valueCheckDate && !!valueCheckHour) {
      valueCheckHour.forEach((e) => {
        if (!date[e]) returnCode = Mps_ConstantCommon.MPS_RESULTS.CLEAR;
      });
      fromDate += moment
        .utc(
          `${date[valueCheckHour[0]]}`,
          Mps_LabelFormat.displayTimeMinuteFormat
        )
        .format(Mps_LabelFormat.displayDateHourFormat);
      toDate += moment
        .utc(
          `${date[valueCheckHour[1]]}`,
          Mps_LabelFormat.displayTimeMinuteFormat
        )
        .format(Mps_LabelFormat.displayDateHourFormat);
    }
    if (!!valueCheckDate && !!valueCheckHour) {
      valueCheckDate.forEach((e) => {
        if (!date[e]) returnCode = Mps_ConstantCommon.MPS_RESULTS.CLEAR;
      });
      valueCheckHour.forEach((e) => {
        if (!date[e]) returnCode = Mps_ConstantCommon.MPS_RESULTS.CLEAR;
      });
      fromDate += moment
        .utc(
          `${date[valueCheckDate[0]]}` + " " + `${date[valueCheckHour[0]]}`,
          Mps_LabelFormat.displayDateHourFormat
        )
        .format(Mps_LabelFormat.displayDateHourFormat);
      toDate += moment
        .utc(
          `${date[valueCheckDate[1]]}` + " " + `${date[valueCheckHour[1]]}`,
          Mps_LabelFormat.displayDateHourFormat
        )
        .format(Mps_LabelFormat.displayDateHourFormat);
    }
    if (returnCode !== Mps_ConstantCommon.MPS_RESULTS.SUCCESS) {
      return Mps_ConstantCommon.MPS_RESULTS.CLEAR;
    }
    if (
      moment
        .utc(fromDate, Mps_LabelFormat.displayDateHourFormat)
        .isBefore(
          moment.utc(toDate, Mps_LabelFormat.displayDateHourFormat).add(1, "s")
        )
    ) {
      return Mps_ConstantCommon.MPS_RESULTS.SUCCESS;
    } else {
      return Mps_ConstantCommon.MPS_RESULTS
        .LOGIC_REPEATTIME_WITH_STARTDATE_ENDDATE;
    }
  }
}

function checkValidateFromToDateImport(
  data,
  valueCheckDate,
  valueCheckHour,
  valueParameter,
  bolleanCheckDH
) {
  if (bolleanCheckDH) {
    data.importDataModel = data.importDataModel.filter((d) => {
      if (d[valueParameter.value] === valueParameter.code) {
        return (
          checkValidateDate(d, valueCheckDate, valueCheckHour) ===
          Mps_ConstantCommon.MPS_RESULTS.SUCCESS
        );
      } else {
        return (
          checkValidateDate(d, valueCheckDate, null) ===
          Mps_ConstantCommon.MPS_RESULTS.SUCCESS
        );
      }
    });
    data.dataErr.map((d) => {
      if (d[valueParameter.value] === valueParameter.code) {
        const returnCode = checkValidateDate(d, valueCheckDate, valueCheckHour);
        if (returnCode !== Mps_ConstantCommon.MPS_RESULTS.SUCCESS) {
          d.err = true;
          if (returnCode === Mps_ConstantCommon.MPS_RESULTS.CLEAR) {
            valueCheckDate.forEach((e) => {
              if (!d[e])
                d[e] = {
                  value: d[e],
                  status: Mps_ConstantCommon.MPS_RESULTS.CLEAR,
                };
            });
            valueCheckHour.forEach((e) => {
              if (!d[e])
                d[e] = {
                  value: d[e],
                  status: Mps_ConstantCommon.MPS_RESULTS.CLEAR,
                };
            });
          } else {
            valueCheckDate.forEach((e) => {
              d[e] = {
                value: d[e],
                status:
                  Mps_ConstantCommon.MPS_RESULTS
                    .LOGIC_REPEATTIME_WITH_STARTDATE_ENDDATE,
              };
            });
            valueCheckHour.forEach((e) => {
              d[e] = {
                value: d[e],
                status:
                  Mps_ConstantCommon.MPS_RESULTS
                    .LOGIC_REPEATTIME_WITH_STARTDATE_ENDDATE,
              };
            });
          }
        }
      } else {
        const returnCode = checkValidateDate(d, valueCheckDate, null);
        if (returnCode !== Mps_ConstantCommon.MPS_RESULTS.SUCCESS) {
          d.err = true;
          if (returnCode === Mps_ConstantCommon.MPS_RESULTS.CLEAR) {
            valueCheckDate.forEach((e) => {
              if (!d[e])
                d[e] = {
                  value: d[e],
                  status: Mps_ConstantCommon.MPS_RESULTS.CLEAR,
                };
            });
          } else {
            valueCheckDate.forEach((e) => {
              d[e] = {
                value: d[e],
                status:
                  Mps_ConstantCommon.MPS_RESULTS
                    .LOGIC_REPEATTIME_WITH_STARTDATE_ENDDATE,
              };
            });
          }
        }
      }
      return d;
    });
    data.importDataModel.map((d) => {
      valueCheckDate.forEach((element) => {
        d[element] = convertString2Date(
          d[element],
          Mps_LabelFormat.displayDateFormat,
          "01-01-2020"
        );
      });
      d[valueCheckHour[0]] = convertString2Date(
        d[valueCheckHour[0]],
        Mps_LabelFormat.displayTimeMinuteFormat,
        "00:00"
      );
      d[valueCheckHour[1]] = convertString2Date(
        d[valueCheckHour[1]],
        Mps_LabelFormat.displayTimeMinuteFormat,
        "23:59"
      );
      return d;
    });
  } else {
    data.importDataModel = data.importDataModel.filter((d) => {
      if (d[valueParameter.value] === valueParameter.code) {
        return (
          checkValidateDate(d, null, valueCheckHour) ===
          Mps_ConstantCommon.MPS_RESULTS.SUCCESS
        );
      } else {
        return (
          checkValidateDate(d, valueCheckDate, null) ===
          Mps_ConstantCommon.MPS_RESULTS.SUCCESS
        );
      }
    });
    data.dataErr.map((d) => {
      if (d[valueParameter.value] === valueParameter.code) {
        const returnCode = checkValidateDate(d, null, valueCheckHour);
        if (returnCode !== Mps_ConstantCommon.MPS_RESULTS.SUCCESS) {
          d.err = true;
          if (returnCode === Mps_ConstantCommon.MPS_RESULTS.CLEAR) {
            valueCheckHour.forEach((e) => {
              if (!d[e])
                d[e] = {
                  value: d[e],
                  status: Mps_ConstantCommon.MPS_RESULTS.CLEAR,
                };
            });
          } else {
            valueCheckHour.forEach((e) => {
              d[e] = {
                value: d[e],
                status:
                  Mps_ConstantCommon.MPS_RESULTS
                    .LOGIC_REPEATTIME_WITH_STARTDATE_ENDDATE,
              };
            });
          }
        }
      } else {
        const returnCode = checkValidateDate(d, valueCheckDate, null);
        if (returnCode !== Mps_ConstantCommon.MPS_RESULTS.SUCCESS) {
          d.err = true;
          if (returnCode === Mps_ConstantCommon.MPS_RESULTS.CLEAR) {
            valueCheckDate.forEach((e) => {
              if (!d[e])
                d[e] = {
                  value: d[e],
                  status: Mps_ConstantCommon.MPS_RESULTS.CLEAR,
                };
            });
          } else {
            valueCheckDate.forEach((e) => {
              d[e] = {
                value: d[e],
                status:
                  Mps_ConstantCommon.MPS_RESULTS
                    .LOGIC_REPEATTIME_WITH_STARTDATE_ENDDATE,
              };
            });
          }
        }
      }
      return d;
    });
    data.importDataModel.map((d) => {
      valueCheckDate.forEach((element) => {
        d[element] = convertString2Date(
          d[element],
          Mps_LabelFormat.displayDateFormat,
          "01-01-2020"
        );
      });
      d[valueCheckHour[0]] = convertString2Date(
        d[valueCheckHour[0]],
        Mps_LabelFormat.displayTimeMinuteFormat,
        "00:00"
      );
      d[valueCheckHour[1]] = convertString2Date(
        d[valueCheckHour[1]],
        Mps_LabelFormat.displayTimeMinuteFormat,
        "23:59"
      );
      return d;
    });
  }
}

function convertString2Date(stringDate, format, defaultValue) {
  if (stringDate !== undefined && moment.utc(stringDate, format).isValid) {
    return moment.utc(stringDate, format).toDate();
  }
  return moment.utc(defaultValue, format).toDate();
}

function subDate(date1, date2, isDate) {
  const fromDate = moment(date1);
  const toDate = moment(date2);
  if (isDate) {
    return fromDate.diff(toDate, "day") + 1;
  }
  return fromDate.diff(toDate, "hour");
}
