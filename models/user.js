'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = mongoose.model('Users', new Schema({
  username: { type: String, index: { unique: true }},
  password: { type: String },
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String , index: { unique: false }},
  picture: { type: String },
  updateAt: { type: Date },
  profile: { type: Object },
  career: { type: String },
  passportNumber: { type: String },
  nationalId: { type: String },
  birthdate: { type: Date },
  address: { type: Object },
  businessAddress: { type: Object },
  phoneNumber: { type: String },
  isAdmin: { type: Boolean },
  otpSecret: { type: String },
  otpQRCode: { type: String },
}));

module.exports = Users
