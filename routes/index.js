const jwt = require('jsonwebtoken');
const config = require('config');
const servers = require('./servers');
const users = require('./users');
const jobs = require('./jobs');
const authenticate = require('./authenticate');
const register = require('./register');

module.exports = function(app){
  app.use('/api/authenticate', authenticate);
  app.use('/api/register', register);

  app.use('/api/servers', isAuthenticated, servers);
  app.use('/api/servers/:serverId/users', isAuthenticated, users);
  app.use('/api/servers/:serverId/users/:userId/jobs', isAuthenticated, jobs);
};

async function isAuthenticated(req, res, next) {
  const Member = req.app.get('models').Member;
  let token = (req.headers['authorization'] || req.query.token || '').replace(/^Bearer /, '');

  if (token) {
    let member;
    try {
      member = await jwt.verify(token, config.get('secret'));

    } catch (err) {
      return res.status(403).send({
        success: false,
        message: 'Failed to authenticate token.'
      });
    }

    member = await Member.findById(member.id);
    if (!member) {
      return res.status(403).send({
        success: false,
        message: 'User doesn\'t exist.'
      });
    }

    req.member = member;
    return next();

  }

  return res.status(403).send({
    success: false,
    message: 'No token provided.'
  });

}