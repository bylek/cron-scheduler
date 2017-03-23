const jwt = require('jsonwebtoken');
const config = require('config');
const express = require('express');
const router = express.Router();

router.post('/', async function(req, res) {
  const User = req.app.get('models').User;

  let email = req.body.email;
  let password = req.body.password;

  const user = await User.findOne({where: {email: email}});
  if (!user) {
    return res.json({
      success: false,
      message: 'Authentication failed. User not found.'
    });
  }

  if (!user.authenticate(password)) {
    return res.json({
      success: false,
      message: 'Authentication failed. Wrong password.'
    });
  }

  const token = jwt.sign(user.getJWTPayload(), config.get('secret'), {
    expiresIn: '1d'
  });

  return res.json({
    success: true,
    message: 'Authentication successful!',
    token: token
  });
});

module.exports = router;
