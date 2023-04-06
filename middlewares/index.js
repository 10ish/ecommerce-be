const validateCategoryRequest = require('./categoryRequestValidator');
const validateProductRequest = require('./productRequestValidator.js');
const validateSignupRequest = require('./signupValidator');
const validateAuth = require('./authValidator');

module.exports = {
    validateCategoryRequest:validateCategoryRequest,
    validateProductRequest : validateProductRequest,
    validateSignupRequest:validateSignupRequest,
    validateAuth: validateAuth
}