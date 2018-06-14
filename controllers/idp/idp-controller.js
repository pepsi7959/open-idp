'use strict'

class IdpController {
  index(req, res, next) {
    return res.render('idp/index', {});
  }
}

module.exports = IdpController;
