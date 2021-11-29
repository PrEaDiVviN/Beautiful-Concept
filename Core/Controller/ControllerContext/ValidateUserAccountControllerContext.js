const express = require('express')
const router = express.Router()
const ValidateUserAccountController = require('../ControllerFunctionality/ValidateUserAccountController.js')

router.get('/Activate-Account/:username', (request, response) => ValidateUserAccountController.GET_ACTIVATE(request, response));

router.post('/Activate-Account/:username', (request, response) => ValidateUserAccountController.POST_ACTIVATE(request,response));

module.exports = router