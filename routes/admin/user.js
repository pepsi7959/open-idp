'use strict'

const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/admin/user-controller');
const AuthController = require('../../controllers/idp/auth-controller');

const userController = new UserController();
const authController = new AuthController();

router.use(authController.isAuthenticated);

router.get('/', userController.index);
router.post('/', userController.create);
router.delete('/:userObjectId', userController.delete);
router.get('/:userObjectId', userController.view);
router.post('/:userObjectId', userController.update);

module.exports = router;
