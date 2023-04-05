//routing logic for the category resource for the controller

const categoryController = require('../controllers/category.controller')
//adding request validator middleware in to check categories request
const {validateCategoryRequest} = require('../middlewares');

module.exports = (app)=>{

    //route to insert a category
    app.post('/ecom/api/v1/categories',[validateCategoryRequest.validateCategoryBody,categoryController.create])
    //route to find all the categories
    app.get('/ecom/api/v1/categories',[validateCategoryRequest.validateCategoryName,categoryController.findAll])
    //route to find one category
    app.get('/ecom/api/v1/categories/:id',[validateCategoryRequest.validateCategoryId,categoryController.findOne]) 
    //route to update an entry in categories
    app.put('/ecom/api/v1/categories/:id',[validateCategoryRequest.validateCategoryId,validateCategoryRequest.validateCategoryBody,categoryController.update]);
    //route to delete an item in categories
    app.delete('/ecom/api/v1/categories/:id',[validateCategoryRequest.validateCategoryId,categoryController.delete]);
}