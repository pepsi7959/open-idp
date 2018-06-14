'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OAuthClients = mongoose.model('OAuthClients', new Schema({
  clientName: { type: String },
  clientId: { type: String },
  clientSecret: { type: String },
  redirectUris: { type: Array },
  grants: { type: Array }
}));

module.exports = OAuthClients
