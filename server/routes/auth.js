const express = require('express');
const router = express.Router();
const AuthFunctions = require('../services/authFunctions')
const authfunctions = new AuthFunctions;
require("dotenv").config();

router.post('/register',authfunctions.register);

router.post('/login', authfunctions.login);

module.exports = router;