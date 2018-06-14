'use strict'

const UserService = require('../../services/user-service');
const userService = new UserService();

class UserController {

  async index(req, res, next) {
    const users = await userService.getUsers();
    return res.render('admin/user/index', { users: users });
  }

  async create(req, res, next) {
    const user = {
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
      confirm_password: req.body.confirm_password,
      email: req.body.email,
      address: { formatted: req.body.address },
      businessAddress: { formatted: req.body.business_address },
      phoneNumber: req.body.phone_number,
      career: req.body.career,
      birthdate: new Date(),
      nationalId: req.body.national_id,
      passportNumber: req.body.passport_number
    }

    await userService.create(user);

    res.redirect('/admin/user');
  }

  async view(req, res, next) {
    const user = await userService.getUser(req.params.userObjectId);
    res.json(user);
  }

  async update(req, res, next) {
    const userObjectId = req.params.userObjectId;
    const user = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      //address: { formatted: req.body.address },
      //businessAddress: { formatted: req.body.business_address },
      phoneNumber: req.body.phone_number,
      career: req.body.career,
      //birthdate: new Date(),
      nationalId: req.body.national_id,
      passportNumber: req.body.passport_number
    }
    console.log(user);

    await userService.update(userObjectId, user);
    res.redirect('/admin/user');
  }
  
  async delete(req, res, next) {
    const userObjectId = req.params.userObjectId;
    await userService.delete(userObjectId);
    res.send(200);
  }

}

module.exports = UserController;
