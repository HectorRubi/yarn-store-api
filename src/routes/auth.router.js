const express = require('express');
const passport = require('passport');

const AuthService = require('./../services/auth.service');

const router = express.Router();
const authService = new AuthService();

router
  .route('/login')
  .post(
    passport.authenticate('local', { session: false }),
    async (req, res, next) => {
      try {
        const user = req.user;
        const token = authService.signToken(user);
        res.json({ token });
      } catch (error) {
        next(error);
      }
    },
  );

router.route('/recovery').post(async (req, res, next) => {
  try {
    const { email } = req.body;
    const rta = await authService.sendRecovery(email);
    res.json(rta);
  } catch (error) {
    next(error);
  }
});

router.route('/reset').post(async (req, res, next) => {
  try {
    const { token, password } = req.body;
    const rta = await authService.changePassword(token, password);
    res.json(rta);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
