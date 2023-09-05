const express = require('express');
const passport = require('passport');

const router = express.Router();

router
  .route('/login')
  .post(
    passport.authenticate('local', { session: false }),
    async (req, res, next) => {
      try {
        res.json(req.user);
      } catch (error) {
        next(error);
      }
    },
  );

module.exports = router;
