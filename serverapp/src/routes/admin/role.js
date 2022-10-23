const router = require('express').Router()
const RoleController = require('../../app/controllers/Admin/RoleController')
const {
    requireSignin,
    userMiddleware,
    adminMiddleware,
} = require('../../middleware')
router.delete(
    '/deleteRoleById',
    // requireSignin,
    // adminMiddleware,
    RoleController.deleteRoleById
)
router.post(
    '/updateRole',
    // requireSignin,
    RoleController.updateRole
)
router.post('/create', requireSignin, adminMiddleware, RoleController.create)
router.post('/getRoles', requireSignin, adminMiddleware, RoleController.getRoles)
router.post('/getAllRoles', requireSignin, adminMiddleware, RoleController.getAllRoles)
router.post('/getDataFilterRole', requireSignin, adminMiddleware, RoleController.getDataFilterRole)
router.get('/permission', requireSignin, RoleController.permissionRole)
module.exports = router
