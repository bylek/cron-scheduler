module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Job', {
    name: DataTypes.TEXT,
    description: DataTypes.TEXT,
    command: DataTypes.TEXT,
    cron_entry: DataTypes.TEXT
  }, {
    tableName: 'jobs',
    underscored: true,
    timestamps: false
  });
};