'use strict'

const {mongoose} = require('./db/mongoose');
const User = require('./models/user');

const user = new User({
  username: 'alice',
  password: '1234',
  firstname: 'Alice',
  lastname: 'Wonderland',
  email: 'alice@etda.or.th',
  nationalId: '110145333231',
  passportNumber: 'A145335'
});

async function main() {
  return await user.save();
}

main().then(() => {
  console.log('done');
}).catch((err) => {
  console.log(err);
});

