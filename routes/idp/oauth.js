'use strict'

const express = require('express');
const router = express.Router();
const OAuthController = require('../../controllers/idp/oauth-controller');
const AuthController = require('../../controllers/idp/auth-controller');

const authController = new AuthController();
const oauthController = new OAuthController();

router.get('/authorize', authController.isAuthenticated, oauthController.authorize);
router.post('/token', oauthController.token);
router.get('/.well-known/jwks.json', oauthController.jwks);

module.exports = router;
