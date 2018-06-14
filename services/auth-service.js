'use strict' 

const util = require('../lib/util');

class AuthService {
  async loginSuccess(req, res, redirectUrl) {
    req.session.authenticated = "true";
    console.log(req.session.authenticated);
    let redirect = util.decodeUrl(redirectUrl);
    if(!redirect) redirect = '/idp';
    console.log('redirect', redirect);
    return res.redirect(redirect);
  }
}

module.exports = AuthService;
