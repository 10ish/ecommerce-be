
module.exports = (sequelize,Sequelize)=>{

const Cart = sequelize.define('cart',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey:true
    },
    status :{
        type:Sequelize.STRING,
        defaultValue:'created'
    }
})
return Cart
}