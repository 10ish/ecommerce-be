const db = require('../models');
const Product = db.product;
const Cart = db.cart;
const Op = db.Sequelize.Op;
//Create the cart 
exports.create = async (req,res)=>{
    console.log(req.userId)
const cart = {
    userId: req.userId//getting the id from the middleware verifyToken

}
try{
let createdCart = await Cart.create(cart);
res.status(201).send(createdCart);
}
catch{
    res.status(500).send({message: 'Internal Server Error'})
}
}
//Update Function, Adds the array productIds passed by the user that has the product ids, sends back the user the total cost 
exports.update = async (req,res)=>{
    const cartId = req.params.cartId;
    console.log(cartId)

try{
let cart = await Cart.findOne({where:{id:cartId}});
// console.log("cart")
// console.log(cart)
// console.log(req.body.productIds);
const items = await Product.findAll({where:{id: req.body.productIds}});
console.log("items found in product table that matches the productIds entered by user")
console.log(items)
if(!items){
    res.status(404).send({message:'The product id does nit match with whate we hve'});
    return
}
 await cart.setProducts(items);
var cost = 0;
var productSelected = []
for(i=0;i<items.length;i++){
    cost = cost + items[i].cost;
    productSelected.push({
        id: items[i].id,
        name: items[i].name,
        cost : items[i].cost
    })
}
await cart.update({cost:cost},{where:{id:cartId}});
res.status(200).send({ 
    cartId: cartId,
    productSelected: productSelected,
    cost:cost
})
}
catch{
res.status(500).send({message:'Internal Server Error'})
}

}
exports.getCart = async (req,res)=>{


try{
    const cartId = req.params.cartId;
    const cart = await Cart.findOne({where:{id:cartId}});
    const items = await cart.getProducts()
    console.log(items)
    var cost = 0;
    var productSelected = []
    for(i=0;i<items.length;i++){
        cost = cost + items[i].cost;
        productSelected.push({
            id: items[i].id,
            name: items[i].name,
            cost : items[i].cost
        })
    }
    res.status(200).send({ 
        cartId: cartId,
        productSelected: productSelected,
        cost:cost
    })
}
catch(err){
    res.status(500).send({message: "Internal Server Error"})
}



}