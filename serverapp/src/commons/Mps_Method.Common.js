const jsonwebtoken = require('jsonwebtoken'),
    jsonQuery = require('json-query'),
    Mps_ConstantCommon = require('./Mps_Constant.Common');
const fs = require('fs');

const displayCurrencyFormat = /(\d)(?=(\d{3})+(?!\d))/g;

module.exports = {
    formatDate,
    formatDateNow,
    verifyToken,
    formatDocumentCode,
    formatMonthNow,
    formatYearNow,
    sortResult,
    transferFileToServer,
    deleteFileInServer,
    convertBaseToFile,
    convertHtmlToAsciiChart,
    getJsDateFromExcel,
    verifyUserToken,
    formatCurrency,
    generateQuery,
    generateQueryParam,
    generateSystemUniqueCode,
    roundUp,
    generateQueryFilter
};
function formatMonthNow() {
    const date_ob = new Date();
    return date_ob.getMonth() + 1;
}
function formatYearNow() {
    const date_ob = new Date();
    return date_ob.getFullYear();
}

async function verifyUserToken(userToken) {
    let user = {};
    if (userToken) {
        jsonwebtoken.verify(userToken.split(' ')[1], process.env.KEY, function (err, decode) {
            if (err) {
                user = {};
            }
            user = decode;
        });
    } else {
        user = {};
    }
    return user;
}

async function verifyToken(userToken) {
    let user = null;
    if (userToken) {
        jsonwebtoken.verify(userToken.split(' ')[1], process.env.KEY, function (err, decode) {
            if (err) {
                user = null;
            }
            user = decode._id;
        });
    } else {
        user = null;
    }
    return user;
}
function formatDateNow() {
    const date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    const date = ('0' + date_ob.getDate()).slice(-2);

    // current month
    const month = ('0' + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    const year = date_ob.getFullYear();

    // current hours
    const hours = date_ob.getHours();

    // current minutes
    const minutes = date_ob.getMinutes();

    // current seconds
    const seconds = date_ob.getSeconds();

    // prints date in YYYY-MM-DD format
    //console.log(year + '-' + month + '-' + date);

    // prints date & time in YYYY-MM-DD HH:MM:SS format
    //console.log(year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds);
    const dateNow = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;
    return dateNow;
}

function formatDate(dateObject) {

    // current date
    // adjust 0 before single digit date
    const date = ('0' + dateObject.getDate()).slice(-2);

    // current month
    const month = ('0' + (dateObject.getMonth() + 1)).slice(-2);

    // current year
    const year = dateObject.getFullYear();

    // current hours
    const hours = dateObject.getHours();

    // current minutes
    const minutes = dateObject.getMinutes();

    // current seconds
    const seconds = dateObject.getSeconds();

    // prints date in YYYY-MM-DD format
    //console.log(year + '-' + month + '-' + date);

    // prints date & time in YYYY-MM-DD HH:MM:SS format
    //console.log(year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds);
    const dateNow = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;
    return dateNow;
}

function formatCodeDateNow() {
    const date_ob = new Date();
    const month = ('0' + (date_ob.getMonth() + 1)).slice(-2);
    const year = date_ob.getFullYear().toString().substr(-2);
    const dateNow = year + month;
    return dateNow;
}
function formatDocumentCode(type, currentCode) {
    let startIndex = 0;
    let prefix = '';
    let formatCodeLength;
    let currentSequence = 0;
    if (!currentCode) {
        currentCode = '';
    }
    const endIndex = currentCode.length + 1;
    switch (Number(type)) {
        case Mps_ConstantCommon.MPS_TRANSACTION_TYPE.Receipt:
            {
                startIndex = currentCode.length - Mps_ConstantCommon.MPS_DOCUMENT_CODE_LENGTH.Receipt;
                prefix = Mps_ConstantCommon.MPS_TRANSACTION_PREFIX.Receipt;
                formatCodeLength = Mps_ConstantCommon.MPS_DOCUMENT_CODE_LENGTH.Receipt;
                break;
            }
        case Mps_ConstantCommon.MPS_TRANSACTION_TYPE.Issue: {
            startIndex = currentCode.length - Mps_ConstantCommon.MPS_DOCUMENT_CODE_LENGTH.Issue;
            prefix = Mps_ConstantCommon.MPS_TRANSACTION_PREFIX.Issue;
            formatCodeLength = Mps_ConstantCommon.MPS_DOCUMENT_CODE_LENGTH.Issue;
            break;
        }
        case Mps_ConstantCommon.MPS_TRANSACTION_TYPE.TransferIssue: {
            startIndex = currentCode.length - Mps_ConstantCommon.MPS_DOCUMENT_CODE_LENGTH.TransferIssue;
            prefix = Mps_ConstantCommon.MPS_TRANSACTION_PREFIX.TransferIssue;
            formatCodeLength = Mps_ConstantCommon.MPS_DOCUMENT_CODE_LENGTH.TransferIssue;
            break;
        }
        case Mps_ConstantCommon.MPS_TRANSACTION_TYPE.TransferReceipt: {
            startIndex = currentCode.length - Mps_ConstantCommon.MPS_DOCUMENT_CODE_LENGTH.TransferReceipt;
            prefix = Mps_ConstantCommon.MPS_TRANSACTION_PREFIX.TransferReceipt;
            formatCodeLength = Mps_ConstantCommon.MPS_DOCUMENT_CODE_LENGTH.TransferReceipt;
            break;
        }
        case Mps_ConstantCommon.MPS_TRANSACTION_TYPE.Physical:
            startIndex = currentCode.length - Mps_ConstantCommon.MPS_DOCUMENT_CODE_LENGTH.Physical;
            prefix = Mps_ConstantCommon.MPS_TRANSACTION_PREFIX.Physical;
            formatCodeLength = Mps_ConstantCommon.MPS_DOCUMENT_CODE_LENGTH.Physical;
            break;
        case Mps_ConstantCommon.MPS_TRANSACTION_TYPE.Sales_RestaurantInvoice: {
            startIndex = currentCode.length - Mps_ConstantCommon.MPS_DOCUMENT_CODE_LENGTH.Sales_RestaurantInvoice;
            prefix = Mps_ConstantCommon.MPS_TRANSACTION_PREFIX.Sales_RestaurantInvoice;
            formatCodeLength = Mps_ConstantCommon.MPS_DOCUMENT_CODE_LENGTH.Sales_RestaurantInvoice;
            break;
        }
        case Mps_ConstantCommon.MPS_TRANSACTION_TYPE.Sales_RestaurantReturn: {
            startIndex = currentCode.length - Mps_ConstantCommon.MPS_DOCUMENT_CODE_LENGTH.Sales_RestaurantReturn;
            prefix = Mps_ConstantCommon.MPS_TRANSACTION_PREFIX.Sales_RestaurantReturn;
            formatCodeLength = Mps_ConstantCommon.MPS_DOCUMENT_CODE_LENGTH.Sales_RestaurantReturn;
            break;
        }
        case Mps_ConstantCommon.MPS_TRANSACTION_TYPE.Kitchen: {
            startIndex = currentCode.length - Mps_ConstantCommon.MPS_DOCUMENT_CODE_LENGTH.Kitchen;
            prefix = Mps_ConstantCommon.MPS_TRANSACTION_PREFIX.Kitchen;
            formatCodeLength = Mps_ConstantCommon.MPS_DOCUMENT_CODE_LENGTH.Kitchen;
            break;
        }
        case Mps_ConstantCommon.MPS_TRANSACTION_TYPE.Product_Price: {
            startIndex = currentCode.length - Mps_ConstantCommon.MPS_DOCUMENT_CODE_LENGTH.Product_Price;
            prefix = Mps_ConstantCommon.MPS_TRANSACTION_PREFIX.Product_Price;
            formatCodeLength = Mps_ConstantCommon.MPS_DOCUMENT_CODE_LENGTH.Product_Price;
            break;
        }


        default:
            {
                startIndex = currentCode.length - Mps_ConstantCommon.MPS_DOCUMENT_CODE_LENGTH.Other;
                prefix = Mps_ConstantCommon.MPS_TRANSACTION_PREFIX.Other;
                formatCodeLength = Mps_ConstantCommon.MPS_DOCUMENT_CODE_LENGTH.Other;
                break;
            }

    }


    currentSequence = Number(currentCode.substring(startIndex, endIndex));
    const nextSequence = (currentSequence + 1) + '';
    const newCode = prefix + formatCodeDateNow() + nextSequence.padStart(formatCodeLength, '0');
    return newCode;
}

function sortResult(data, Options) {
    if (!!Options.sort) {
        const sortAscending = Options.sortAscending === true ? 1 : -1;
        data.sort(function (a, b) {
            for (let sortValue of Options.sort) {
                if ((typeof jsonQuery(sortValue, { data: a }).value) === 'number') {
                    if (jsonQuery(sortValue, { data: a }).value - jsonQuery(sortValue, { data: b }).value !== 0) {
                        return (jsonQuery(sortValue, { data: a }).value - jsonQuery(sortValue, { data: b }).value) * sortAscending;
                    }
                } else {
                    const nameA = jsonQuery(sortValue, { data: a }).value ? jsonQuery(sortValue, { data: a }).value.toLowerCase() : ''; // bỏ qua hoa thường
                    const nameB = jsonQuery(sortValue, { data: b }).value ? jsonQuery(sortValue, { data: b }).value.toLowerCase() : ''; // bỏ qua hoa thường
                    if (nameA.localeCompare(nameB) !== 0) {
                        return nameA.localeCompare(nameB) * sortAscending;
                    }
                }
            }
        }
        )
    }
}

function formatCodeDateTimeNow() {
    const date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    const date = ('0' + date_ob.getDate()).slice(-2);

    // current month
    const month = ('0' + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    const year = date_ob.getFullYear();

    // current hours
    const hours = date_ob.getHours();

    // current minutes
    const minutes = date_ob.getMinutes();

    // current seconds
    const seconds = date_ob.getSeconds();

    // prints date in YYYY-MM-DD format
    //console.log(year + '-' + month + '-' + date);

    // prints date & time in YYYY-MM-DD HH:MM:SS format
    //console.log(year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds);
    const dateTimeNow = year + month + date + '-' + hours + minutes + seconds;
    return dateTimeNow;
}

function transferFileToServer() {
    const ftpClient = require('ftp-client');
    // Config FTP server
    const config = {
        host: process.env.FTP_HOSTNAME,
        port: process.env.FTP_PORT,
        user: process.env.FTP_USERNAME,
        password: process.env.FPT_PASSWORD
    };
    const option = {
        logging: 'basic'
    };
    try {
        const client = new ftpClient(config, option);
        client.connect(function () {
            client.upload(['assets/**'], `${process.env.FTP_UPLOAD_FOLDER}`, {
                baseDir: 'test',
                overwrite: 'older'
            }, function (result) {
                if (!result.errors || result.uploadedFiles.length !== 0 || result.uploadedDirs !== 0) {
                    for (const link of result.uploadedFiles) {
                        fs.unlinkSync(link); // xóa file trên server nodejs
                    }
                }
            });
        });
    } catch (er) {
        console.log(er)
    }

}

function deleteFileInServer(path) {
    const ftpClient = require('ftp-client');
    // Config FTP server
    const config = {
        host: process.env.FTP_HOSTNAME,
        port: process.env.FTP_PORT,
        user: process.env.FTP_USERNAME,
        password: process.env.FPT_PASSWORD
    };
    const option = {
        logging: 'basic'
    };
    const client = new ftpClient(config, option);
    client.connect(function () {
        client.ftp.delete(`${process.env.FTP_UPLOAD_FOLDER}/${path}`, function (err) {
            if (!!err) {
                console.log(err);
            }
        });
    });
}

async function convertBaseToFile(listFile, screenNo, user) {
    const fileObject = {
        name: String,
        size: Number,
        status: String,
        thumbUrl: String,
        type: String,
        uid: String,
        url: String
    };
    const result = [];
    for await (const file of listFile) {
        if (file.size > 0) {
            if (file.status === 'new') {
                fileObject.name = file.name;
                fileObject.size = file.size;
                fileObject.status = file.status;
                fileObject.thumbUrl = file.thumbUrl;
                fileObject.type = file.type;
                fileObject.uid = file.uid;
                fileObject.url = file.url;
                const OrgName = file.name.trim().replace(/ /g, '-');
                const base64Data = file.thumbUrl.split(';base64,').pop();
                const newName = `${formatCodeDateTimeNow()}-${OrgName}`;
                const newPath = `assets/${screenNo}/${newName}`;
                if (!fs.existsSync(`assets/${screenNo}`)) {
                    fs.mkdirSync(`assets/${screenNo}`);
                }
                fs.writeFile(newPath, base64Data, 'base64', function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
                result.push({
                    _id: null,
                    File_Manager_Type: screenNo,
                    File_Manager_Name: newName,
                    File_Manager_Path: newPath,
                    size: file.size,
                    type: file.type,
                    uid: file.uid,
                    CreatedBy: user
                });
            } else {
                result.push(file);
            }
        }
    }
    return result;
}

async function convertHtmlToAsciiChart(string) {
    const html = [`"`, `'`, `&`, `<`, `>`, ``, `¡`, `¢`, `£`, `¤`, `¥`, `¦`, `§`, `¨`, `©`, `ª`, `«`, `¬`, `­`, `®`, `¯`, `°`, `±`, `²`, `³`, `´`, `µ`, `¶`, `·`, `¸`, `¹`, `º`, `»`, `¼`, `½`, `¾`, `¿`, `×`, `÷`, `À`, `Á`, `Â`, `Ã`, `Ä`, `Å`, `Æ`, `Ç`, `È`, `É`, `Ê`, `Ë`, `Ì`, `Í`, `Î`, `Ï`, `Ð`, `Ñ`, `Ò`, `Ó`, `Ô`, `Õ`, `Ö`, `Ø`, `Ù`, `Ú`, `Û`, `Ü`, `Ý`, `Þ`, `ß`, `à`, `á`, `â`, `ã`, `ä`, `å`, `æ`, `ç`, `è`, `é`, `ê`, `ë`, `ì`, `í`, `î`, `ï`, `ð`, `ñ`, `ò`, `ó`, `ô`, `õ`, `ö`, `ø`, `ù`, `ú`, `û`, `ü`, `ý`, `þ`, `ÿ`];

    const ascii = [`&quot;`, `&apos;`, `&amp;`, `&lt;`, `&gt;`, `&nbsp;`, `&iexcl;`, `&cent;`, `&pound;`, `&curren;`, `&yen;`, `&brvbar;`, `&sect;`, `&uml;`, `&copy;`, `&ordf;`, `&laquo;`, `&not;`, `&shy;`, `&reg;`, `&macr;`, `&deg;`, `&plusmn;`, `&sup2;`, `&sup3;`, `&acute;`, `&micro;`, `&para;`, `&middot;`, `&cedil;`, `&sup1;`, `&ordm;`, `&raquo;`, `&frac14;`, `&frac12;`, `&frac34;`, `&iquest;`, `&times;`, `&divide;`, `&Agrave;`, `&Aacute;`, `&Acirc;`, `&Atilde;`, `&Auml;`, `&Aring;`, `&AElig;`, `&Ccedil;`, `&Egrave;`, `&Eacute;`, `&Ecirc;`, `&Euml;`, `&Igrave;`, `&Iacute;`, `&Icirc;`, `&Iuml;`, `&ETH;`, `&Ntilde;`, `&Ograve;`, `&Oacute;`, `&Ocirc;`, `&Otilde;`, `&Ouml;`, `&Oslash;`, `&Ugrave;`, `&Uacute;`, `&Ucirc;`, `&Uuml;`, `&Yacute;`, `&THORN;`, `&szlig;`, `&agrave;`, `&aacute;`, `&acirc;`, `&atilde;`, `&auml;`, `&aring;`, `&aelig;`, `&ccedil;`, `&egrave;`, `&eacute;`, `&ecirc;`, `&euml;`, `&igrave;`, `&iacute;`, `&icirc;`, `&iuml;`, `&eth;`, `&ntilde;`, `&ograve;`, `&oacute;`, `&ocirc;`, `&otilde;`, `&ouml;`, `&oslash;`, `&ugrave;`, `&uacute;`, `&ucirc;`, `&uuml;`, `&yacute;`, `&thorn;`, `&yuml;`];

    for (let i = 0; i < string.length; i++) {
        for (let j = 0; j < html.length; j++) {
            if (string[i] === html[j]) {
                string = string.replace(html[j], ascii[j]);
            }
        }
    }
    return string;
}

function getJsDateFromExcel(excelDateValue) {
    var date = new Date((excelDateValue - (25567 + 2)) * 86400 * 1000);
    var localTime = new Date(date.getTime() + (new Date()).getTimezoneOffset() * 60000);
    return localTime;
}

function generateSystemUniqueCode(System_UniqueCode, isParam=false) {
    if(!!isParam) {
        return { 
            System_UniqueCode: { $in: [System_UniqueCode, Mps_ConstantCommon.DEFAULT_UNIQUECODE ]},
        };
    }
    return { System_UniqueCode: System_UniqueCode }
}

function generateQuery(user, searchModel, isBranchExisted) {
    let query = {};
    switch (isBranchExisted) {
        case true:
            query = generateQueryWithBranch(user, searchModel);
            break;

        case false:
            query = generateQueryWithoutBranch(user, searchModel);
            break;

        default:
            query = { System_UniqueCode: user.System_UniqueCode }
            break;
    }
    return query;
}

function generateQueryParam(user, searchModel, isBranchExisted) {
    let query = {};
    switch (isBranchExisted) {
        case true:
            query = generateQueryWithBranch(user, searchModel, true);
            break;

        case false:
            query = generateQueryWithoutBranch(user, searchModel, true);
            break;

        default:
            query = { System_UniqueCode: { $in: [user.System_UniqueCode, '315893540'] }}
            break;
    }
    return query;
}

function generateQueryWithBranch(user, searchModel, isParam=false) {
    const query = generateSystemUniqueCode(user.System_UniqueCode, isParam);

    if (user.System_User_Permission === Mps_ConstantCommon.MPS_SYSTEM_PARAMETER.UserPermission.MemberLevel) {
        query.System_Branch = { $in: [user.System_Branch] };
        query.CreatedBy = { $in: [user._id] };
        if (searchModel.UpdatedBy && searchModel.UpdatedBy.length > 0) {
            query.UpdatedBy = { $in: [user._id] };
        }
    } else if (user.System_User_Permission === Mps_ConstantCommon.MPS_SYSTEM_PARAMETER.UserPermission.BranchLevel) {
        query.System_Branch = { $in: [user.System_Branch] };
        if (searchModel.CreatedBy && searchModel.CreatedBy.length > 0) {
            query.CreatedBy = { $in: searchModel.CreatedBy };
        }
        if (searchModel.UpdatedBy && searchModel.UpdatedBy.length > 0) {
            query.UpdatedBy = { $in: searchModel.UpdatedBy };
        }
    } else {
        if (searchModel.System_Branch && searchModel.System_Branch.length > 0) {
            query.System_Branch = { $in: searchModel.System_Branch };
        }
        if (searchModel.CreatedBy && searchModel.CreatedBy.length > 0) {
            query.CreatedBy = { $in: searchModel.CreatedBy };
        }
        if (searchModel.UpdatedBy && searchModel.UpdatedBy.length > 0) {
            query.UpdatedBy = { $in: searchModel.UpdatedBy };
        }
    }
    return query;
}

function generateQueryWithoutBranch(user, searchModel, isParam=false) {
    const query = generateSystemUniqueCode(user.System_UniqueCode, isParam);

    if (user.System_User_Permission === Mps_ConstantCommon.MPS_SYSTEM_PARAMETER.UserPermission.MemberLevel) {
        query.CreatedBy = { $in: [user._id] };
        if (searchModel.UpdatedBy && searchModel.UpdatedBy.length > 0) {
            query.UpdatedBy = { $in: [user._id] };
        }
    }
    else {
        if (searchModel.CreatedBy && searchModel.CreatedBy.length > 0) {
            query.CreatedBy = { $in: searchModel.CreatedBy };
        }
        if (searchModel.UpdatedBy && searchModel.UpdatedBy.length > 0) {
            query.UpdatedBy = { $in: searchModel.UpdatedBy };
        }
    }
    return query;
}

function roundUp(value, step) {
    step || (step = 1.0);
    var inv = 1.0 / step;
    return Math.round(value * inv) / inv;
}

function formatCurrency(value, delimiter, currency) {
    let amount = !!value ? value.toString().replace(displayCurrencyFormat, (!!delimiter ? `$1${delimiter}` : "$1,")) : 0;
    return !!currency ? `${amount} ${currency}` : amount;
}

function generateQueryFilter(user, searchModel) {
    const query = {
        System_UniqueCode: user.System_UniqueCode
    };

    if (user.System_User_Permission === Mps_ConstantCommon.MPS_SYSTEM_PARAMETER.UserPermission.MemberLevel) {
        query.System_Branch = { $in: [user.System_Branch] };
        if (searchModel.UpdatedBy && searchModel.UpdatedBy.length > 0) {
            query.UpdatedBy = { $in: [user._id] };
        }
    } else if (user.System_User_Permission === Mps_ConstantCommon.MPS_SYSTEM_PARAMETER.UserPermission.BranchLevel) {
        query.System_Branch = { $in: [user.System_Branch] };
        if (searchModel.CreatedBy && searchModel.CreatedBy.length > 0) {
            query.CreatedBy = { $in: searchModel.CreatedBy };
        }
        if (searchModel.UpdatedBy && searchModel.UpdatedBy.length > 0) {
            query.UpdatedBy = { $in: searchModel.UpdatedBy };
        }
    } else {
        if (searchModel.System_Branch && searchModel.System_Branch.length > 0) {
            query.System_Branch = { $in: searchModel.System_Branch };
        }
        if (searchModel.CreatedBy && searchModel.CreatedBy.length > 0) {
            query.CreatedBy = { $in: searchModel.CreatedBy };
        }
        if (searchModel.UpdatedBy && searchModel.UpdatedBy.length > 0) {
            query.UpdatedBy = { $in: searchModel.UpdatedBy };
        }
    }
    return query;
}