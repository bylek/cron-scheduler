const jwt = require('jsonwebtoken');
const config = require('config');
const express = require('express');
const router = express.Router();

router.post('/', async function(req, res) {
  const Member = req.app.get('models').Member;

  let email = req.body.email;
  let password = req.body.password;

  const member = await Member.findOne({where: {email: email}});
  if (!member) {
    return res.json({
      success: false,
      message: 'Authentication failed. User not found.'
    });
  }

  if (!member.authenticate(password)) {
    return res.json({
      success: false,
      message: 'Authentication failed. Wrong password.'
    });
  }

  const token = jwt.sign(member.getJWTPayload(), config.get('secret'), {
    expiresIn: '1d'
  });

  return res.json({
    success: true,
    message: 'Authentication successful!',
    token: token
  });
});

module.exports = router;
