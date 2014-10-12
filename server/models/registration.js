module.exports = function(sequelize, DataTypes) {
  var Registration = sequelize.define('Registration', {
    regCode: {type: DataTypes.STRING, allowNull: false},
    userSecret: {type: DataTypes.STRING, allowNull: false},
    siteToken: {type: DataTypes.STRING, allowNull: false}
  }, {
    tableName: 'registrations'
  });

  return Registration;
};
