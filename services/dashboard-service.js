'use strict'
const {mongoose} = require('../db/mongoose');
const User = require('../models/user');
const Client = require('../models/oauth-client');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');

class DashboardService {
  
  async countUsers() {
    return await User.count();
  }

  async countClients() {
    return await Client.count();
  }

}

module.exports = DashboardService;
