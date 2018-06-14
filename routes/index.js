const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/idp/auth-controller');
const authController = new AuthController();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/idp');
});

module.exports = router;
