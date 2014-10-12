module.exports = function(sequelize, DataTypes) {
  var Authentication = sequelize.define('Authentication', {
    rqr: {type: DataTypes.STRING, allowNull: false},
    authenticated: {type: DataTypes.BOOLEAN, allowNull: false},
    hash3: {type: DataTypes.STRING, allowNull: false}
  }, {
    tableName: 'authentications'
  });

  return Authentication;

};
