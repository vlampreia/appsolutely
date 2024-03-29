var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var lodash = require('lodash');

//TODO: Load credentials from file
var sequelize = new Sequelize('appsolutely', 'root', '', {
	dialectOptions: {
		//multipleStatements: true
	}
	});
var db = {};

fs.readdirSync(__dirname)
	.filter(function(file) {
		return (file.indexOf('.') !== 0) && (file !== 'index.js');
	})
	.forEach(function(file) {
		var model = sequelize.import(path.join(__dirname, file));
		db[model.name] = model;
	});

Object.keys(db).forEach(function(modelName) {
	if('associate' in db[modelName]) {
		db[modelName].associate(db);
	}
});

module.exports = lodash.extend({
	sequelize: sequelize,
	Sequelize: Sequelize
}, db);
