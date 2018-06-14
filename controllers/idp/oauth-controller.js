'use strict'

const OAuthService = require('../../services/oauth-service');
const KeyService = require('../../services/key-service');
const keyService = new KeyService();
const oauthService = new OAuthService();
const url = require('url');
const OAuth2Server = require('oauth2-server');
const Request = OAuth2Server.Request;
const Response = OAuth2Server.Response;
const oauth = new OAuth2Server({
  model: oauthService,
  allowExtendedTokenAttributes: true,
});

class OAuthController {

  async authorize(req, res, next) {
    const request = new Request(req);
    const response = new Response(res);
    const options = {
      authenticateHandler: {
        handle: (req) => {
          return req.session.user;
        },
      }
    };
    const result = await oauth.authorize(request,response,options);
    const code = result.authorizationCode;
    const state = req.query.state;
    const redirect = result.redirectUri + "?code="+code + "&state=" + state;
    res.redirect(redirect);
  }

  async token(req, res, next) {
    const request = new Request(req);
    const response = new Response(res);
    console.log('get token');
    const result = await oauth.token(request, response);
    console.log(response.body);
    res.json(response.body);
  }

  async jwks(req, res, next) {
    const jwk = await keyService.getJwk();
    const data = [jwk];
    res.json(data);
  }
}

module.exports = OAuthController;
