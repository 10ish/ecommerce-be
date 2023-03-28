//LAYER: CONNECTION ->db,models, the outermost layer for the models with the connection configuration
//creating connection to the db 
//export module can be used by other/multiple models
//importing seualize orm 
//importing databse configuration 
const Sequelize = require('sequelize');
const dbConfig = require('../configs/db.config');

//establishing connection 
const sequelize = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{host:dbConfig.HOST,dialect:dbConfig.DIALECT}); 
//exporting db object so that it can be used by other files => contains all the models as well so that it can communicate with controller
const db ={};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.category = require('./category.model')(sequelize,Sequelize);
db.product = require('./product.model')(sequelize,Sequelize);
module.exports = db;