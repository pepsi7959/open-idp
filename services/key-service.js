'use strict'
const fs = require('fs');
const pem2jwk = require('pem-jwk').pem2jwk;
const config = require('../config');
const crypto = require('crypto');

class KeyService {

  async getJwk() {
    const str = fs.readFileSync('./certs/'+config.serverKey, 'ascii')
    const md5sum = crypto.createHash('md5');
    const jwkTemp = pem2jwk(str);
    const jwk = {
      kid: md5sum.update(str).digest('hex'),
      n: jwkTemp.n,
      e: jwkTemp.e,
      alg: await this.getAlg(),
      kty: 'RSA',
      use: 'sig'
    }
    return jwk;
  }

  async getKey() {
    return fs.readFileSync('./certs/server.key');
  }

  async getKid() {
    const str = fs.readFileSync('./certs/'+config.serverKey, 'ascii')
    const md5sum = crypto.createHash('md5');
    return md5sum.update(str).digest('hex');
  }

  async getAlg() {
    return 'RS256';
  }
}

module.exports = KeyService;

