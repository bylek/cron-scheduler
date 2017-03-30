const servers = require('./servers');
const jobs = require('./jobs');
const authenticate = require('./authenticate');
const register = require('./register');

module.exports = function(app){
  app.use('/api/authenticate', authenticate);
  app.use('/api/register', register);

  app.use('/api/servers', isAuthenticated, servers);
  app.use('/api/jobs', isAuthenticated, jobs);
};

async function isAuthenticated(req, res, next) {
  const UserService = req.app.get('services').User;
  let token = (req.headers['authorization'] || req.query.token || '').replace(/^Bearer /, '');

  try {
    req.user = await UserService.isAuthenticated(token);
    next();

  } catch (err) {
    return res.status(403).send({
      success: false,
      message: err.message
    });
  }
}