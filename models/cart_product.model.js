
module.exports = (sequelize,Sequelize)=>{
const CartProduct = sequelize.define('cart_products',{
quantity :{
type:Sequelize.INTEGER,
defaultValue: 1
}
})
return CartProduct;
}