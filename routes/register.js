const jwt = require('jsonwebtoken');
const config = require('config');
const express = require('express');
const router = express.Router();

router.post('/', async function(req, res) {
  const Account = req.app.get('models').Account;

  let email = req.body.email;
  let password = req.body.password;
  let name = req.body.name;

  let account = await Account.findOne({where: {email: email}});
  if (!account) {
    account = await Account.create({
      email,
      password,
      name
    });

    if (account) {
      const token = jwt.sign(account.getJWTPayload(), config.get('secret'), {
        expiresIn: '1d'
      });

      return res.json({
        success: true,
        message: 'Register successful!',
        token: token
      });
    }
  }


  return res.json({
    success: false,
    message: 'Register failed. User already exists.'
  });
});

module.exports = router;
