const jwt = require('jsonwebtoken');
const config = require('config');
const express = require('express');
const router = express.Router();

router.post('/', async function(req, res) {
  const UserService = req.app.get('services').User;

  let { name, email, password } = req.body;
  try {
    const token = await UserService.register(name, email, password);
    return res.json({
      success: true,
      message: 'Register successful!',
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
