module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    secret: {type: DataTypes.STRING, allowNull: false},
    deviceToken: {type: DataTypes.STRING, allowNull: false}
  }, {
    tableName: 'users',
    classMethods: {
      associate: function(models) {
        User.belongsTo(models.Site);
      }
    }
  });

  return User;
};
