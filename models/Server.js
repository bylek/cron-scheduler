module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Server', {
    name: DataTypes.TEXT
  }, {
    tableName: 'servers',
    underscored: true,
    timestamps: false
  });
};