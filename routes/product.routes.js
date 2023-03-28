//contaons all the routes for our product model all the request are handled ny the functions in the product model
const productController = require('../controllers/product.controller');

module.exports = (app)=>{
//get route to get all the products in the product table
app.get('/ecom/api/v1/products',productController.findAll);
//get route to get one category by id 
app.get('/ecom/api/v1/products/:id',productController.findOne);
//to create a new category
app.post('/ecom/api/v1/products',productController.create)
//to update a category by id
app.put('/ecom/api/v1/products/:id',productController.update);
//to delete a category
app.delete('/ecom/api/v1/products/:id',productController.delete)
}


