const express = require('express')
const router = express.Router()
const RegisterController = require('../ControllerFunctionality/RegisterController')

router.post('/Register.html', (request, response) => RegisterController.POST_REGISTER(request,response));

module.exports = router