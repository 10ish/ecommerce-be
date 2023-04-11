const db = require("../models");
const Product = db.product;
const Cart = db.cart;
const CartProduct= db.cartProduct 
const Op = db.Sequelize.Op;
//Create the cart
exports.create = async (req, res) => {
  console.log(req.userId);
  const cart = {
    userId: req.userId, //getting the id from the middleware verifyToken
  };
  try {
    let createdCart = await Cart.create(cart);
    res.status(201).send(createdCart);
  } catch {
    res.status(500).send({ message: "Internal Server Error" });
  }
};
//Update Function, Adds the array productIds passed by the user that has the product ids, sends back the user the total cost
exports.update = async (req, res) => {
  const cartId = req.params.cartId;
  console.log(cartId);

  try {
    let cart = await Cart.findOne({ where: { id: cartId } });
    // console.log("cart")
    // console.log(cart)
    // console.log(req.body.productIds);
    const items = await Product.findAll({ where: { id: req.body.productIds } });
    console.log(
      "items found in product table that matches the productIds entered by user"
    );
    console.log(items);
    if (!items) {
      res
        .status(404)
        .send({ message: "The product id does nit match with whate we hve" });
      return;
    }
    await cart.setProducts(items);
    var cost = 0;
    var productSelected = [];
    for (i = 0; i < items.length; i++) {
      cost = cost + items[i].cost;
      productSelected.push({
        id: items[i].id,
        name: items[i].name,
        cost: items[i].cost,
      });
    }
    res.status(200).send({
      cartId: cartId,
      productSelected: productSelected,
      cost: cost,
      status:cart.status
    });
  } catch {
    res.status(500).send({ message: "Internal Server Error" });
  }
};
exports.getCart = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const cart = await Cart.findOne({ where: { id: cartId } });
    const product = await cart.getProducts();
    var cost = 0;
    var productSelected = [];
    for (i = 0; i < product.length; i++) {
      productSelected.push({
        productName: product[i].name,
        productCost: product[i].cost,
        quantity: product[i].cart_products.quantity,
        totalCost: product[i].cost * product[i].cart_products.quantity,
      });
      cost = product[i].cost * product[i].cart_products.quantity;
    }
    res.status(200).send({
        cartId: cartId,
        productSelected:productSelected,
        totalCost : cost
    })
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};
exports.delete = async (req, res) => {
  let cartId = req.params.cartId;
  try {
    await Cart.destroy({ where: { id: cartId } });
    res
      .status(200)
      .send({ message: `cart with ${cartId} successfully deleted` });
  } catch {
    res.status(500).send({ message: "Internal server error" });
  }
};

//to set the status of the card
exports.updateStatus = async (req, res) => {
  const cartId = req.params.cartId;
  console.log(cartId);

const status = {
    status:req.body.status.toString()
}
  try{
      const cart = await Cart.update(status,{where:{id:cartId}});
      console.log("cart: " + cart)
      if(!cart[0]){
      res.status(404).send({message:'Cart not found'});
      return;
      }
      res.status(200).send({message: `Status set to ${status.status} for cartId ${cartId}`})

  }
  catch{
      res.status(500).send({message: "Internal server Error"})
  }
};
//to update the product quantity 
exports.updateProductsQuantity = async(req,res)=>{
    const cartId = req.params.cartId;

const productId = req.params.productId
const quantity = {quantity :req.body.quantity}
try{
await CartProduct.update (quantity,{where:{[Op.and]:[{cartId:cartId},{productId:productId}]}});
res.status(200).send({message:`Quantity of ${productId} set to ${quantity.quantity} cart Number ${cartId}` })
}
catch(err){
res.send(500).send({message:'Internal server error while setting thhe quantity`'})
}


}
  