const validateCategoryRequest = require('./categoryRequestValidator');
const validateProductRequest = require('./productRequestValidator.js');


module.exports = {
    validateCategoryRequest:validateCategoryRequest,
    validateProductRequest : validateProductRequest
}