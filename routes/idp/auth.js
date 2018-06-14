'use strict'

const express = require('express');
const router = express.Router();
const AuthController = require('../../controllers/idp/auth-controller');
const controller = new AuthController();

router.get('/login', controller.login);
router.get('/logout', controller.logout);
router.post('/authenticate', controller.authenticate);
router.post('/authorize', controller.authorize);
router.get('/otp', controller.loginOtp);

module.exports = router;
