const jwt = require('jsonwebtoken');
const config = require('config');
const express = require('express');
const router = express.Router();

router.post('/', async function(req, res) {
  const UserService = req.app.get('services').User;

  let email = req.body.email;
  let password = req.body.password;

  try {
    const token = await UserService.authenticate(email, password);
    console.log('token', token);
    return res.json({
      success: true,
      message: 'Authentication successful!',
      token: token
    });

  } catch (err) {
    return res.json({
      success: false,
      message: err.message
    });

  }
});

module.exports = router;
