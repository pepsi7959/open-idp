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
router.get('/.well-known/openid-configuration', oauthController.discovery);
router.all('/token', (req, res, next) => {
  var err = new Error('Method not allowed');
  err.status = 405;
  next(err);
});

module.exports = router;

