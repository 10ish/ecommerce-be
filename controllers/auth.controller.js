const authConfig = require("../configs/auth.config");
const db = require('../models');
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signIn = (req,res)=>{

}

exports.signUp = (req,res)=>{


}
