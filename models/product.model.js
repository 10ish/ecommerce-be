//creating schema for the product table that would be in the db
//we are exporting a function which returns the product table itself
//it take sequalize and Sequalise as parameters which will be called in the index.js files which takes all the models in the same way

const { sequelize, Sequelize } = require(".");

module.exports = (sequelize,Sequelize)=>{
    const Product = sequelize.define('products',{
        id:{
            type:Sequelize.Integer,
            autoIncrement:true,
            primarykey: true
        },
        name:{
            type:Sequelize.STRING,
            allowNull:false
        },
        description:{
            type: Sequelize.STRING
        },
        cost:{
            type: Sequelize.INTEGR,
            allowNull:false
        }
    },{tableName:'Products'});
    return Product
}