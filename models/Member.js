const bcrypt = require('bcryptjs');

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('Member', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    name: DataTypes.STRING,
    password_digest: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    tableName: 'members',
    underscored: true,
    indexes: [{unique: true, fields: ['email']}],
    instanceMethods: {
      authenticate: function(value) {
        return bcrypt.compareSync(value, this.password_digest);
      },
      getJWTPayload: function(){
        return {
          id: this.id,
          email: this.email,
          name: this.name
        }
      }
    }
  });

  User.beforeCreate(hashPassword);
  User.beforeUpdate(hashPassword);

  return User;
};

async function hashPassword(member, options, callback){
  if (member.get('password')) {
    let hash;
    try {
      hash = await bcrypt.hash(member.get('password'), 10);

    } catch (err) {
      return callback(err);
    }

    member.set('password_digest', hash);
    return callback(null, options);
  }
}