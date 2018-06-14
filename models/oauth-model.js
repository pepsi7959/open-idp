'use strict'

const OAuthService = require('../services/oauth-service');
const oauthService = new OAuthService();

module.exports = {
  getAccessToken: oauthService.getAccessToken,
  getClient: oauthService.getClient,
  getUser: oauthService.getUser,
  saveToken: oauthService.saveToken 
}
