const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// initialize sequelize models
const models = require('./models');
const sequelize = models.sequelize;
app.set('models', models);

// routes
require('./routes')(app);

sequelize.sync({force: false}).then(function(){
    app.listen(port);
    console.log('Listening on port ' + port);
});

