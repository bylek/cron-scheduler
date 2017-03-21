module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    name: DataTypes.TEXT,
    login: DataTypes.TEXT,
    type: DataTypes.ENUM('KEY', 'PASSWORD'),
    password: DataTypes.TEXT,
    key: DataTypes.TEXT
  }, {
    tableName: 'users',
    underscored: true,
    timestamps: false
  });
};