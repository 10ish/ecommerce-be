const cartController = require('../controllers/cart.controller');
const {validateAuth} = require('../middlewares')

//put post get 
module.exports = (app)=>{
app.post('/ecom/api/v1/cart',[validateAuth.verifyToken], cartController.create);
app.put('/ecom/api/v1/cart/:cartId', [validateAuth.verifyToken],cartController.update);
app.get('/ecom/api/v1/cart/:cartId',[validateAuth.verifyToken],cartController.getCart);
app.delete('/ecom/api/v1/cart/:cartId',[validateAuth.verifyToken],cartController.delete);
//request to update the status of the cart
app.put('/ecom/api/v1/cart/updateStatus/:cartId',[validateAuth.verifyToken],cartController.updateStatus);
//to set the quantity of the products
app.post('/ecom/api/v1/cart/:cartId/updateProductsQuantity/:productId',cartController.updateProductsQuantity)
}