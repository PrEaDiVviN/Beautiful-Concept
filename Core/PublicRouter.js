const express = require('express');
const router = express.Router();
const path = require('path');

router.use(express.static(__dirname + '\\..\\Public\\CSS'));
router.use(express.static(__dirname + '\\..\\Public\\HTML'));
router.use(express.static(__dirname + '\\..\\Public\\JS'));
router.use(express.static(__dirname + '\\..\\Public\\Images'));
module.exports = router