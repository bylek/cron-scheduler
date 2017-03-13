const jwt = require('jsonwebtoken');
const config = require('config');
const servers = require('./servers');
const authenticate = require('./authenticate');
const register = require('./register');

module.exports = function(app){
  app.use('/api/authenticate', authenticate);
  app.use('/api/register', register);

  app.use('/api/servers', isAuthenticated, servers);
};

async function isAuthenticated(req, res, next) {
  const Account = req.app.get('models').Account;
  let token = (req.headers['authorization'] || req.query.token || '').replace(/^Bearer /, '');

  if (token) {
    let account;
    try {
      account = await jwt.verify(token, config.get('secret'));

    } catch (err) {
      return res.status(403).send({
        success: false,
        message: 'Failed to authenticate token.'
      });
    }

    try {
      account = await Account.findById(account.id);

    } catch (err) {
      return res.status(403).send({
        success: false,
        message: 'User doesn\'t exist.'
      });
    }

    req.account = account;
    next();


  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });

  }
}