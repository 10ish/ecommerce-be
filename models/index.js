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
db.category = require('./category.model')(db.sequelize,Sequelize);
db.product = require('./product.model')(db.sequelize,Sequelize);
db.user = require('./user.model')(db.sequelize,Sequelize);
db.role = require('./role.model')(db.sequelize,Sequelize);
db.cart = require('./cart.model')(db.sequelize,Sequelize);
//Establishing relationship between tables 
db.category.hasMany(db.product);
//estabilishing a relationn between product and category resource => inv=built sequelize function that creates a foreign key in products table by the name of category id
db.user.belongsToMany(db.role,{
    through:"user_roles",
    foreignKey:"userId"
})
db.role.belongsToMany(db.user,{
    through:"user_roles",
    foreignKey:"roleId"
});
//Establishing the rrelationship between role and user model which has a many to many relationship and is represented through a table user_role
db.product.belongsToMany(db.cart,{
    through: 'cart_products',
    foreignKey : 'productId'
})
db.cart.belongsToMany(db.product,{
    through: "cart_products",
    foreignKey:'cartId'
})

//establishig the relationship between cart and product, creates a new table cart_products with cartId and productId as attrivbutes
db.user.hasMany(db.cart)
//relationship between cart and user
db.ROLES = ['admin','user'];

module.exports = db;