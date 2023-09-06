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

  async changePassword(token, password) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await userService.findOne(payload.sub);
      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }
      const hash = await bcrypt.hash(password, 10);
      await userService.update(user.id, {
        recoveryToken: null,
        password: hash,
      });
      return { message: 'Password changed' };
    } catch (error) {
      throw boom.unauthorized();
    }
  }

  async sendRecovery(email) {
    const user = await userService.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' });
    const link = `http://myfrontend.com/recovery-password?token=${token}`;
    await userService.update(user.id, { recoveryToken: token });

    const mail = {
      from: `"YarnStore Recovery" <${config.mailUser}>`, // sender address
      to: `${user.email}`, // list of receivers
      subject: 'Recovery Password', // Subject line
      html: `<b>Ingresa a este link <a href="${link}">${link}</a></b>`, // html body
    };

    return await this.sendMail(mail);
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: config.mailHost,
      port: config.mailPort,
      secure: false,
      auth: {
        user: config.mailUser,
        pass: config.mailPass,
      },
    });

    return await transporter.sendMail(infoMail);
  }
}

module.exports = AuthService;
