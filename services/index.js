const servicesName = [
  'User',
  'Server',
  'Job'
];

module.exports = function(app){
  let services = {};
  servicesName.forEach(function(service) {
    services[service] = require('./' + service)(app);
  });

  return services;
};

