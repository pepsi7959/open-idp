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
    const data = { "keys": [jwk] };
    res.json(data);
  }

  async discovery(req, res, next) {
    const data = {
         "issuer":"https://eid-pi-idp1.proxy1.digitalid.or.th",
   "jwks_uri":"https://eid-pi-idp1.proxy1.digitalid.or.th/oauth/.well-known/jwks.json",
   "authorization_endpoint":"https://eid-pi-idp1.proxy1.digitalid.or.th/oauth/authorize",
   "token_endpoint":"https://eid-pi-idp1.proxy1.digitalid.or.th/oauth/token",
   "userinfo_endpoint":"https://eid-pi-idp1.proxy1.digitalid.or.th/oauth/userinfo",
   "scopes_supported":[  
      "openid",
      "profile",
      "profile_kyc",
   ],
   "claims_supported":[  
      "sub",
      "name",
      "family_name",
      "given_name",
      "middle_name",
      "nickname",
      "preferred_username",
      "profile",
      "picture",
      "website",
      "gender",
      "birthdate",
      "zoneinfo",
      "locale",
      "updated_at",
      "email",
      "email_verified"
   ],
   "grant_types_supported":[  
      "authorization_code"
   ],
   "response_types_supported":[  
      "code",
      "token",
      "id_token",
      "id_token token",
      "code id_token",
      "code token",
      "code id_token token"
   ],
   "response_modes_supported":[  
      "form_post",
      "query",
      "fragment"
   ],
   "token_endpoint_auth_methods_supported":[  
      "client_secret_basic"
   ],
   "subject_types_supported":[  
      "public"
   ],
   "id_token_signing_alg_values_supported":[  
      "RS256"
   ],
   "code_challenge_methods_supported":[  
      "plain",
      "S256"
   ]
    };
    res.json(data);
  }
}

module.exports = OAuthController;
