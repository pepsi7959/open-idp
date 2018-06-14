'use strict'

const UserService = require('../../services/user-service');
const userService = new UserService();
const AuthService = require('../../services/auth-service');
const authService = new AuthService();
const url = require('url');
const config = require('../../config');
const util = require('../../lib/util');

class AuthController {
  async login(req, res, next) {
    const fullUrl = util.getFullUrl(req);
    const urlObj = url.parse(fullUrl,true);
    res.render('idp/login', { redirectUrl: urlObj.query.redirect_url }); 
  }

  async authenticate(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    const redirectUrl = req.body.redirect_url;

    if(!username || !password) return res.redirect('/idp/auth/login?redirect_url=' + redirectUrl);

    const user = await userService.authenticate(username, password);     
    if(user) {
      req.session.user = user;
      if(!config.auth.twoFactor) {
        req.session.authenticated = "true";
        let redirect = util.decodeUrl(redirectUrl);
        if(!redirect) redirect = '/idp';
        return res.redirect(redirect);
      }else{
        let redirect = '/idp/auth/otp?redirect_url=' + redirectUrl;
        return res.redirect(redirect);
      }
    }
    return res.redirect('/idp/auth/login?redirect_url=' + redirectUrl); 
  }

  async logout(req, res, next) {
    req.session.user = null;
    return res.redirect('/idp/auth/login');
  }

  async authorize(req, res, next) {
    const otp = req.body.otp;
    const redirectUrl = req.body.redirect_url;

    if(!req.session.user) return res.redirect('/idp/auth/login?redirect_url=' + redirectUrl);

    const verified = await userService.verifyOtp(req.session.user, otp);  
    
    if(verified) {
      req.session.authenticated = "true";
      let redirect = util.decodeUrl(redirectUrl);
      if(!redirect) redirect = '/idp';
      return res.redirect(redirect);
    }
    return res.redirect('/idp/auth/otp?redirect_url=' + redirectUrl);
  }

  async loginOtp(req, res, next) {
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    const urlObj = url.parse(fullUrl,true); 
    return res.render('idp/otp', { redirectUrl: urlObj.query.redirect_url });
  }

  async isAuthenticated(req, res, next) {
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    if(req.session.user && req.session.authenticated) {
      return next();   
    }else {
      return res.redirect('/idp/auth/login?redirect_url=' + Buffer.from(fullUrl).toString('base64'));
    }
  } 
}

module.exports = AuthController;
