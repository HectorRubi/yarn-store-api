const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const UserService = require('./user.service');

const { config } = require('./../config/config');

const userService = new UserService();

class AuthService {
  async getUser(email, password) {
    const user = await userService.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }

    delete user.dataValues.password;

    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    return jwt.sign(payload, config.jwtSecret);
  }

  async sendMail(email) {
    const user = await userService.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    const transporter = nodemailer.createTransport({
      host: config.mailHost,
      port: config.mailPort,
      auth: {
        user: config.mailUser,
        pass: config.mailPass,
      },
    });

    return await transporter.sendMail({
      from: `"YarnStore Recovery" <${config.mailUser}>`, // sender address
      to: `${user.email}`, // list of receivers
      subject: 'Recovery Password', // Subject line
      text: 'Hello world?', // plain text body
      html: '<b>Hello world?</b>', // html body
    });
  }
}

module.exports = AuthService;
