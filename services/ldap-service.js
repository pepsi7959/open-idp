'use strict'

const ldapjs = require('ldapjs');
const config = require('../config');

class LdapService {
  connect() {
    const self = this;
    return new Promise((resolve, reject) => {
      self.client = ldapjs.createClient({
        url: config.ldap.url
      });
      self.client.on('connect', function() {
        return resolve();
      });
      self.client.on('connectTimeout', function() {
        return reject(new Error('LDAP Connection Timeout'));
      });
      self.client.on('error', function(err) {
        return reject(err);
      });
    });
  }
  
  async bind(username, password) {
    const self = this;
    return new Promise((resolve, reject) => {
      self.client.bind(username, password, (err) => {
        if(!err) return resolve(true);
        return resolve(false);    
      });
    });
  }

  search() {
    const self = this;
    return new Promise((resolve, reject) => {
      const options = {
        scope: 'sub',
        paged: true,
        filter: config.ldap.filter,
      }
      const users = [];
      self.client.search(config.ldap.baseDN, options, function(err, res) {
        res.on('error', (err) => reject(err));
        res.on('searchEntry', (entry) => users.push(entry.object));
        res.on('end', (result) => resolve(users));
      });
    });
  }
}

module.exports = LdapService;
