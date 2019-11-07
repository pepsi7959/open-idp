require('dotenv').config();
module.exports = {
  port: process.env.PORT,
  baseUrl: process.env.BASE_URL,
  version: "0.1.0",
  serverKey: 'server.key',
  scope: ['openid', 'profile_kyc', 'profile'],
  auth: {
    db: 'local',
    twoFactor: false,
  },
  ldap: {
    url: '',
    baseDN: '',
    filter: '',
  },
  mode: 'test',
}
