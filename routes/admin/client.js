'use strict'

const express = require('express');
const router = express.Router();
const ClientController = require('../../controllers/admin/client-controller');
const AuthController = require('../../controllers/idp/auth-controller');

const clientController = new ClientController(); 
const authController = new AuthController();

router.use(authController.isAuthenticated);

router.get('/', clientController.index);
router.get('/:clientObjectId', clientController.view);
router.post('/', clientController.create);
router.delete('/:clientObjectId', clientController.delete);
router.post('/:clientObjectId', clientController.update);

module.exports = router;
