module.exports = function(sequelize, DataTypes) {
  var Site = sequelize.define('Site', {
    token: {type: DataTypes.STRING, allowNull: false},
    secret: {type: DataTypes.STRING, allowNull: false}
  }, {
    tableName: 'sites',
    classMethods: {
      associate: function(models) {
        Site.hasMany(models.User);
      }
    }
  });

  return Site;
};
