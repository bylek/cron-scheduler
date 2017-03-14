const jwt = require('jsonwebtoken');
const config = require('config');
const express = require('express');
const router = express.Router();

router.post('/', async function(req, res) {
  const Member = req.app.get('models').Member;

  let email = req.body.email;
  let password = req.body.password;
  let name = req.body.name;

  let member = await Member.findOne({where: {email: email}});
  if (!member) {
    member = await Member.create({
      email,
      password,
      name
    });

    if (member) {
      const token = jwt.sign(member.getJWTPayload(), config.get('secret'), {
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
