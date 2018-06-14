'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OAuthAuthorizationCode = mongoose.model('OAuthAuthorizationCode', new Schema({
  authorizationCode: String,
  expiresAt: Date,
  redirectUri:  String,
  scope:  String,
  userId: mongoose.Schema.ObjectId,
  clientId: mongoose.Schema.ObjectId,
}));

module.exports = OAuthAuthorizationCode;
