const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.user;
const authConfig = require("../configs/auth.config");

const verifyToken =  (req, res, next) => {
  let token = req.get("x-access-token");//to access the token passed by the user 
  
  //console.log(req.headers)
  if(!token){//if no token exists
    res.status(403).send({message:'No token provided'});
    return;
  }
  //if it exists then verifying 
  jwt.verify(token,authConfig.secret,(err,decoded)=>{

    if(err){
        res.status(401).send({message:'Unauthorised'});
        return;
    }

    req.userId = decoded.id;
    next();
    return;

  })
 


};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    console.log(req.userId)
    const roles = await user.getRoles();
    //console.log(roles);
    
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === 'admin') {
        console.log(roles[i].id)
        //console.log(roles[i].name);
        next();
        return;
      }
    
    }
    res.status(403).send({message:'AdminPermissions required'});
      return;

  } catch {
    res.status(500).send({ message: "Interna; Server Error" });
  }
};

const authValidator = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
};

module.exports = authValidator;
