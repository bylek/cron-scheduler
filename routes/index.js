const jwt = require('jsonwebtoken');
const config = require('config');
const servers = require('./servers');
const jobs = require('./jobs');
const authenticate = require('./authenticate');
const register = require('./register');

module.exports = function(app){
  app.use('/api/authenticate', authenticate);
  app.use('/api/register', register);

  app.use('/api/servers', isAuthenticated, servers);
  app.use('/api/servers/:serverId/jobs', isAuthenticated, jobs);
};

async function isAuthenticated(req, res, next) {
  const User = req.app.get('models').User;
  let token = (req.headers['authorization'] || req.query.token || '').replace(/^Bearer /, '');

  if (token) {
    let user;
    try {
      user = await jwt.verify(token, config.get('secret'));

    } catch (err) {
      return res.status(403).send({
        success: false,
        message: 'Failed to authenticate token.'
      });
    }

    user = await User.findById(user.id);
    if (!user) {
      return res.status(403).send({
        success: false,
        message: 'User doesn\'t exist.'
      });
    }

    req.user = user;
    return next();

  }

  return res.status(403).send({
    success: false,
    message: 'No token provided.'
  });

}