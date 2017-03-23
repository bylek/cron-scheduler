module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Server', {
    name: DataTypes.TEXT,
    description: DataTypes.TEXT,
    address: DataTypes.TEXT,
    port: DataTypes.INTEGER,
    user: DataTypes.TEXT,
    auth: {
      type: DataTypes.ENUM,
      values: ['KEY', 'PASSWORD']
    },
    key: DataTypes.TEXT,
    password: DataTypes.TEXT
  }, {
    tableName: 'servers',
    underscored: true,
    timestamps: false
  });
};