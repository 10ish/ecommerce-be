//creating schema for category moodel i.e category table in sql which will be required by index.js

module.exports = (sequelize,Sequelize)=>{

    const Category = sequelize.define('category',{
        id: {
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name : {
            type: Sequelize.STRING,
            allowNull:false,
        },
        description:{
            type: Sequelize.STRING
        }
    
    },{
        tableName:'Categories'
    });
    return Category;
}

