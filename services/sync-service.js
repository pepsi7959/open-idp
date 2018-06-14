'use strict'

const UserService = require('./user-service');
const LdapService = require('./ldap-service');
const config = require('../config');

const userService = new UserService();
const ldapService = new LdapService();

class UserSyncService {
  
  async sync() {
    await ldapService.bind('pathorn@etda.or.th','Path3417@'); 
    const users = await ldapService.search();
    for(const user of users) {
      const data = {
        username: user.userPrincipalName,
        password: 'P@ssw0rd',
        firstname: user.givenName,
        lastname: user.sn,
        email: user.mail,
        phoneNumber: user.mobile,
        career: user.title,
      }
      try {
        await userService.create(data);
      }catch(err){
      }
    } 
  }
}

module.exports = UserSyncService;
