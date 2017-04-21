module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Job', {
    name: DataTypes.TEXT,
    description: DataTypes.TEXT,
    command: DataTypes.TEXT,
    type: {
      type: DataTypes.ENUM,
      values: [
        'EVERY_MINUTE', 'EVERY_5_MINUTES', 'EVERY_15_MINUTES', 'EVERY_30_MINUTES',
        'HOURLY', 'DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY', 'CUSTOM'
      ]
    },
    cron_entry: DataTypes.TEXT,
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'jobs',
    underscored: true,
    timestamps: false,
    instanceMethods: {
      getCronEntry: function(){
        switch(this.type){
          case 'EVERY_MINUTE':
            return '* * * * *';
          case 'EVERY_5_MINUTES':
            return '*/5 * * * *';
          case 'EVERY_15_MINUTES':
            return '*/15 * * * *';
          case 'EVERY_30_MINUTES':
            return '*/30 * * * *';
          case 'HOURLY':
            return '0 * * * *';
          case 'DAILY':
            return '0 0 * * *';
          case 'WEEKLY':
            return '0 0 * * 0';
          case 'MONTHLY':
            return '0 0 1 * *';
          case 'YEARLY':
            return '0 0 1 1 *';
          default:
            return this.cron_entry;
        }
      }
    }
  });
};