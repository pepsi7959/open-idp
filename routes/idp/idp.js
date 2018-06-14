'use strict'

const express = require('express');
const router = express.Router();
const AuthController = require('../../controllers/idp/auth-controller');
const IdpController = require('../../controllers/idp/idp-controller');

const idpController = new IdpController();
const authController = new AuthController();

router.use(authController.isAuthenticated);
router.get('/', idpController.index);

module.exports = router;
