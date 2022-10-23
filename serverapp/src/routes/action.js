const express = require('express')
const ActionController = require('../app/controllers/ActionController')

const router = express.Router()
const { requireSignin } = require('../middleware')

router.post('/createAction', requireSignin, ActionController.createAction)
router.post(`/getDataFilterAction`, requireSignin, ActionController.getDataFilterAction)
router.post(`/getActions`, requireSignin, ActionController.getActions)
router.post(`/getAllActions`, requireSignin, ActionController.getAllActions)
router.post(
    '/updateAction',
    // requireSignin,
    ActionController.updateAction
)
router.delete(
    '/deleteActionById',
    // requireSignin,
    // adminMiddleware,
    ActionController.deleteActionById
)

module.exports = router