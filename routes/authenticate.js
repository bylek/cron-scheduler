const jwt = require('jsonwebtoken');
const config = require('config');
const express = require('express');
const router = express.Router();

router.post('/', async function(req, res) {
  const Account = req.app.get('models').Account;

  let email = req.body.email;
  let password = req.body.password;

  const account = await Account.findOne({where: {email: email}});
  if (!account) {
    return res.json({
      success: false,
      message: 'Authentication failed. User not found.'
    });
  }

  if (!account.authenticate(password)) {
    return res.json({
      success: false,
      message: 'Authentication failed. Wrong password.'
    });
  }

  const token = jwt.sign(account.getJWTPayload(), config.get('secret'), {
    expiresIn: '1d'
  });

  return res.json({
    success: true,
    message: 'Authentication successful!',
    token: token
  });
});

module.exports = router;
