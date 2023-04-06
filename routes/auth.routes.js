const authController = require('../controllers/auth.controller');
const {validateSignupRequest} = require('../middlewares')


//routes for sign in and signup

module.exports = (app)=>{
    //sign in
app.post('/ecom/api/v1/auth/signin',authController.signIn);
//signup
app.post('/ecom/api/v1/auth/signup',[validateSignupRequest.validateUserNameOrEmail,validateSignupRequest.validateRolesExisted],authController.signUp);
}