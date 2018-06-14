'use strict'

module.exports = {
  getFullUrl: function(req) {
    return req.protocol + '://' + req.get('host') + req.originalUrl;
  },
  decodeUrl: function(url) {
    return Buffer.from(url, 'base64').toString('ascii');
  }
}
