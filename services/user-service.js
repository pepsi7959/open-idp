'use strict'

const {promisify} = require('util')
const QRCode = require('qrcode');
const {mongoose} = require('../db/mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');
const speakeasy = require('speakeasy');
const LdapService = require('./ldap-service');
const ldapService = new LdapService();
const config = require('../config');

const qrcode = promisify(QRCode.toDataURL);

class UserService {

  async create(data) {
    data.password = bcrypt.hashSync(data.password, 10);
    const secret = speakeasy.generateSecret({ length:32, issuer: 'OpenIDP', name: 'OpenIDP/' + data.username });
    data.otpSecret = secret.base32;
    data.otpQRCode = await qrcode(secret.otpauth_url); 
    const user = new User(data);
    return await user.save();
  }

  async verifyOtp(user, otp) {
    return speakeasy.totp.verify({ secret: user.otpSecret,
                                   encoding: 'base32',
                                   token: otp });
  }
  
  async getUsers() {
    return await User.find();
  }

  async getUser(userObjectId) {
    return await User.findById(userObjectId);
  }

  async delete(userObjectId) {
    const user = await User.findOne({ _id: userObjectId });
    if(!user) return false;
    const result = await user.remove();
    return result;
  }

  async update(userObjectId, data) {
    const user = await User.findOneAndUpdate({ _id: userObjectId }, data);
    return user;
  }

  async authenticate(username, password) {
    const user = await User.findOne({ username: username });
    if(user) {
      let result;
      if(config.auth.db == 'ldap') {
        await ldapService.connect();
        result = await ldapService.bind(username, password);
      } else {
        result = bcrypt.compareSync(password, user.password);
        if(config.mode = 'test') result = true;
      }
      if(result) return user;
    }
    return null; 
  }
}

module.exports = UserService;
