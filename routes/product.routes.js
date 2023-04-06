//contaons all the routes for our product model all the request are handled ny the functions in the product model
const productController = require('../controllers/product.controller');
const{validateProductRequest} = require('../middlewares');
validateProductRequest
module.exports = (app)=>{
//get route to get all the products in the product table
app.get('/ecom/api/v1/products',[validateProductRequest.validateProductName,productController.findAll]);
//get route to get the product by the name using query paramaeter
//get route to get one category by id 
app.get('/ecom/api/v1/products/:id',[validateProductRequest.validateProductId,productController.findOne]);
//to create a new category
app.post('/ecom/api/v1/products',[validateProductRequest.validateProductBody,productController.create])
//to update a category by id
app.put('/ecom/api/v1/products/:id',[validateProductRequest.validateProductBody,validateProductRequest.validateProductId,productController.update]);
//to delete a category
app.delete('/ecom/api/v1/products/:id',[validateProductRequest.validateProductId,productController.delete])

//to get the products based on the category id
app.get('/ecom/api/v1/categories/:categoryId/products',[productController.getProductsByCategory]) 

}