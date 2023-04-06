const db = require("../models");
const User = db.user;
const ROLES = db.ROLES;
//to chevk weether the username and email already exists
const validateUserNameOrEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });
    const email = await User.findOne({ where: { email: req.body.email } });
    if (!user && !email) {
      next();
      return;
    }
    res.status(400).send({ message: "Username/email already exists" });
    return;
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const validateRolesExisted = async (req, res, next) => {
  if (req.body.roles) {
   for(let i = 0;i<req.body.roles.length;i++){
    if(!ROLES.includes(req.body.roles[i])){
        res.status(400).send({message:"No roles exist as requested by you"});
        return;
    }
   }
  }
  next(); 
};

const validateSignupRequest = {
  validateUserNameOrEmail: validateUserNameOrEmail,
  validateRolesExisted: validateRolesExisted,
};

module.exports = validateSignupRequest;