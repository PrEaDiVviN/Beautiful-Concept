const express = require('express');
const router = express.Router();
const LoginController = require('../ControllerFunctionality/LoginController.js');

router.post('/Login.html', (request, response) => LoginController.POST_LOGIN(request,response));

module.exports = router