const Sequelize = require('sequelize');
const config = require('config').database;  // we use node-config to handle environments

// initialize database connection
const sequelize = new Sequelize(
  config.name,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: 'mysql'
  }
);

// load models
const models = [
  'User',
  'Server',
  'Job'
];
models.forEach(function(model) {
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});

// describe relationships
(function(m) {
  m.User.hasMany(m.Server);
  m.Server.hasMany(m.Job);
})(module.exports);

// export connection
module.exports.sequelize = sequelize;