'use strict'

const UserService = require('./services/user-service');
const userService = new UserService();

async function init() {

  const username = "admin";
  const password = "P@ssw0rd";

  await userService.create({
    username: username,
    password: password,
    firstname: 'admin',
    lastname: 'admin',
    email: 'admin@admin.com',
    isAdmin: true
  });
  console.log('Create admin user successfully (username:'+username+', password:'+password+')');
  process.exit();
}

init();
