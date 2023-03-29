//contaons all the routes for our product model all the request are handled ny the functions in the product model
const productController = require('../controllers/product.controller');
const {requestValidator} = require('../middlewares')
module.exports = (app)=>{
//get route to get all the products in the product table
app.get('/ecom/api/v1/products',productController.findAll);
//get route to get the product by the name using query paramaeter

//get route to get one category by id 
app.get('/ecom/api/v1/products/:id',[requestValidator.validateProductRequest,productController.findOne]);
//to create a new category
app.post('/ecom/api/v1/products',[requestValidator.validateProductRequest,productController.create])
//to update a category by id
app.put('/ecom/api/v1/products/:id',[requestValidator.validateProductRequest,productController.update]);
//to delete a category
app.delete('/ecom/api/v1/products/:id',[requestValidator.validateProductRequest,productController.delete])
}


