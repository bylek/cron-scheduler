const { algorithm, salt } = require('config').encryption;
const crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
  const Server = sequelize.define('Server', {
    name: DataTypes.TEXT,
    description: DataTypes.TEXT,
    address: DataTypes.TEXT,
    port: DataTypes.INTEGER,
    user: DataTypes.TEXT,
    auth: {
      type: DataTypes.ENUM,
      values: ['KEY', 'PASSWORD']
    },
    key_digest: DataTypes.TEXT,
    key: DataTypes.VIRTUAL,
    password_digest: DataTypes.STRING,
    password: DataTypes.VIRTUAL,
    syncing: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    error_message: DataTypes.TEXT
  }, {
    tableName: 'servers',
    underscored: true,
    timestamps: false,
    instanceMethods: {
      getPassword: function(){
        return decrypt(this.password_digest);
      },
      getKey: function(){
        return decrypt(this.key_digest);
      },
      getConnectionData(){
        const data = {
          host: this.address,
          user: this.user,
          port: this.port
        };
        if (this.auth === 'KEY') {
          data.key = this.getKey();
        } else {
          data.password = this.getPassword();
        }

        return data;
      }
    }
  });

  Server.beforeCreate(encryptData);
  Server.beforeUpdate(encryptData);

  return Server;
};

async function encryptData(server, options, callback){
  if (server.get('password')) {
    let encryptedPassword = encrypt(server.get('password'));
    server.set('password_digest', encryptedPassword);
  }

  if (server.get('key')) {
    let encryptedKey = encrypt(server.get('key'));
    server.set('key_digest', encryptedKey);
  }

  callback(null, options);
}

function encrypt(text){
  let cipher = crypto.createCipher(algorithm, salt);
  let  crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');

  return crypted;
}

function decrypt(text){
  let decipher = crypto.createDecipher(algorithm, salt);
  let dec = decipher.update(text,'hex','utf8');
  dec += decipher.final('utf8');

  return dec;
}