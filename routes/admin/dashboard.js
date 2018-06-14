'use strict'

const express = require('express');
const router = express.Router();
const AdminController = require('../../controllers/admin/dashboard-controller');
const AuthController = require('../../controllers/idp/auth-controller');

const authController = new AuthController();
const adminController = new AdminController();

router.use(authController.isAuthenticated);
router.get('/', adminController.index);

module.exports = router;
