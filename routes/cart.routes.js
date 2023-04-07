const cartController = require('../controllers/cart.controller');
const {validateAuth} = require('../middlewares')

//put post get 
module.exports = (app)=>{
app.post('/ecom/api/v1/cart',[validateAuth.verifyToken], cartController.create);
app.put('/ecom/api/v1/cart/:cartId', [validateAuth.verifyToken],cartController.update);
app.get('/ecom/api/v1/cart/:cartId',[validateAuth.verifyToken],cartController.getCart)
}