const express = require('express');
const router = express.Router();
const AuthFunctions = require('../services/authFunctions')
const authfunctions = new AuthFunctions;
require("dotenv").config();

router.post('/register',(req, res) => authfunctions.register(req, res));

router.post('/login', (req, res) => authfunctions.login(req, res));

module.exports = router;