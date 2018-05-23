const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const debug = require('debug');
const basename = path.basename(__filename);
const config = require('../config')[process.env.ENV];
const db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);

// Confirm DB connection
sequelize.authenticate()
  .catch(err => console.error('Cannot connect to database:', err));

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;