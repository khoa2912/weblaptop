//Khởi tạo nhóm quyền quản trị hệ thống mặc định.
function initDefaultRole(uniqueCode) {
    return { _id: null, System_UniqueCode: uniqueCode , System_Role_Code: 'Administrator', System_Role_Name: 'Administrator', System_Role_Description: 'Quản trị hệ thống' , Status: '1009-001' }
}

//Khởi tạo quyền truy cập chức năng quản trị thống mặc định.
function initDefaultPermission(uniqueCode, roleId) {
    return [
        { _id: null, System_UniqueCode: uniqueCode,  System_Permission_Role: roleId, System_Permission_Screen: 2, System_Permission_Action: '1' },
        { _id: null, System_UniqueCode: uniqueCode,  System_Permission_Role: roleId, System_Permission_Screen: 2, System_Permission_Action: '2' },
        { _id: null, System_UniqueCode: uniqueCode,  System_Permission_Role: roleId, System_Permission_Screen: 2, System_Permission_Action: '3' },
        { _id: null, System_UniqueCode: uniqueCode,  System_Permission_Role: roleId, System_Permission_Screen: 2, System_Permission_Action: '4' },
        { _id: null, System_UniqueCode: uniqueCode,  System_Permission_Role: roleId, System_Permission_Screen: 2, System_Permission_Action: '6' },
        { _id: null, System_UniqueCode: uniqueCode,  System_Permission_Role: roleId, System_Permission_Screen: 2, System_Permission_Action: '9' },
        ];        
}

//Thời giam sử dụng thử
const defaultTrialTime = 15;

module.exports = {
    initDefaultRole,
    initDefaultPermission,
    defaultTrialTime
};