const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models');
const User = db.user;
const authConfig = require('../configs/auth.config');

const verifyToken = (req,res)=>{



}

const isAdmin = (req,res)=>{

}

const authValidator = {
verifyToken: verifyToken,
isAdmin: isAdmin
}

module.exports = authValidator;