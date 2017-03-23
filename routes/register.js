const jwt = require('jsonwebtoken');
const config = require('config');
const express = require('express');
const router = express.Router();

router.post('/', async function(req, res) {
  const User = req.app.get('models').User;

  let email = req.body.email;
  let password = req.body.password;
  let name = req.body.name;

  let user = await User.findOne({where: {email: email}});
  if (!user) {
    user = await User.create({
      email,
      password,
      name
    });

    if (user) {
      const token = jwt.sign(user.getJWTPayload(), config.get('secret'), {
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
