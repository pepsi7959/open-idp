'use strict'
const {mongoose} = require('../db/mongoose');
const OAuthClient = require('../models/oauth-client');
const uuidv4 = require('uuid/v4');
const crypto = require('crypto');

class ClientService {

  async getClients() {
    return await OAuthClient.find();
  }

  async getClient(clientObjectId) {
    const client = await OAuthClient.findOne({ _id: clientObjectId });
    return client;
  }

  async delete(clientObjectId) {
    return await OAuthClient.remove({ _id: clientObjectId });
  }

  async update(clientObjectId, client) {
    return await OAuthClient.findOneAndUpdate({ _id: clientObjectId }, client);
  }

  async create(data) {
    data.clientId = uuidv4().replace(/-/g, '');
    data.clientSecret = crypto.randomBytes(20).toString('hex');    
    const client = new OAuthClient(data);
    return await client.save(); 
  }
}

module.exports = ClientService;
