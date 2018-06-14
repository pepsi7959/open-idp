'use strict'
const _ = require('lodash');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4');
const OAuthToken = require('../models/oauth-token');
const OAuthAuthorizationCode = require('../models/oauth-authorization-code');
const OAuthClient = require('../models/oauth-client');
const KeyService = require('../services/key-service');
const keyService = new KeyService();
const User = require('../models/user');
const config = require('../config');

class OAuthService {

  async saveAuthorizationCode(code, client, user) {
    console.log('authcode', user);
    const savingCode = new OAuthAuthorizationCode({
      authorizationCode: code.authorizationCode,
      expiresAt: code.expiresAt,
      redirectUri: code.redirectUri,
      scope: code.scope,
      userId: user._id,
      clientId: client._id,
    });
    console.log('before save');
    const codeObj = await savingCode.save();
    console.log('auth code here');
    return codeObj.toObject(); 
  }

  async getAccessToken(client, user, scope) {
    console.log('access token');
    return {};
  }

  async getAuthorizationCode(code) {
    console.log('get auth code');
    const authCode = await OAuthAuthorizationCode.findOne({ authorizationCode: code }).lean();
    if (!authCode) return false;

    const { user, client } = await {
      user: await User.findById(authCode.userId).lean(),
      client: await OAuthClient.findById(authCode.clientId).lean(),
    };

    return {
      code: authCode.authorizationCode,
      expiresAt: authCode.expiresAt,
      redirectUri: authCode.redirectUri,
      scope: authCode.scope,
      client: client,
      user: user,
    }
  }

  async revokeAuthorizationCode(code){
    console.log('revoke auth code');
    const authCode = await OAuthAuthorizationCode.findOne({ authorizationCode: code.code });
    if (!authCode) return false;
    
    await authCode.remove();
    return true;
  }

  async validateScope(user, client, scope) {
    const scopes = scope.split(' ');
    if(!scopes.includes('openid')) return false;
    return scope; 
  }

  async getClient(clientId, clientSecret) {
    const criteria = { clientId: clientId };
    if (clientSecret) _.extend(criteria, { clientSecret: clientSecret });

    const client = await OAuthClient.findOne(criteria).lean();
    if (!client) throw new Error('Client not found');

    console.log(client);
    return {
      _id: client._id,
      name: client.name,
      clientId: client.clientId,
      redirectUris: client.redirectUris,
      grants: client.grants,
      scope: client.scope,
    }
  }

  async getUser(username, password) {
    const user = await User.authenticate(username, password);
    return user;
  }
  
  async saveToken(token, client, user) {
    console.log('this is user', user);
    const data = {
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      refreshToken: token.refreshToken,
      refreshTokenExpiresAt: token.refreshTokenExpiresAt,
      scope: token.scope,
      userId: user._id,
      clientId: client._id,
      clientUserId: client.userId,
    };

    let savingToken = new OAuthToken(data);
    savingToken = await savingToken.save();

    const returnedToken = {
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      refreshToken: token.refreshToken,
      refreshTokenExpiresAt: token.refreshTokenExpiresAt,
      scope: token.scope,
      client: client,
      user: user,
      id_token: await this._generateIdToken(token, client, user),
    }

    return returnedToken;
  }

  async _generateIdToken(token, client, user) {

    let scopes = token.scope.split(' ');
    if(!Array.isArray(scopes)) scopes = [scopes];
    const exp = Math.round((new Date().getTime() + 3600000) / 1000);
    const idToken = {
      iss: config.baseUrl,
      aud: client.clientId,
      sub: user.username,
      exp: exp,
    } 


    if(scopes.includes('profile_kyc')) {
      idToken.given_name = user.firstname;
      idToken.family_name = user.lastname;
      idToken.national_id = user.nationalId;
      idToken.passport_number = user.passportNumber;
      idToken.career = user.career;
      idToken.birthdate = user.birthdate;
      idToken.address = user.address;
      idToken.business_address = user.businessAddress;
      idToken.phone_number = user.phoneNumber
    }else if(scopes.includes('profile')) {
      idToken.given_name = user.firstname;
      idToken.family_name = user.lastname;
      idToken.national_id = user.nationalId;
      idToken.passport_number = user.passportNumber;
    }

    const key = await keyService.getKey();
    const kid = await keyService.getKid();
    return jwt.sign(idToken, key, { algorithm: 'RS256', keyid: kid });
  }
}

module.exports = OAuthService;
