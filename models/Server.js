module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Server', {
    name: DataTypes.TEXT,
    description: DataTypes.TEXT,
    address: DataTypes.TEXT,
    port: DataTypes.INTEGER
  }, {
    tableName: 'servers',
    underscored: true,
    timestamps: false
  });
};