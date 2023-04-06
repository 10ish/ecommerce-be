const authConfig = require("../configs/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
  const newUser = {
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  };
  try {
    const user = await User.create(newUser);
    console.log("user created");
    if (req.body.roles) {
      try {
        const roles = await Role.findAll({
          where: { name: { [Op.or]: req.body.roles } },
        });
        await user.setRoles(roles);
        res.status(200).send({ message: "User registered successfully" });
      } catch {
        res
          .status(400)
          .send({ message: "The roles that ypou entered does not exist" });
      }
    } else {
      await user.setRoles([1]);
      res.status(200).send({ message: "User registered successfully" });
    }
  } catch (err) {
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.signIn = async (req, res) => {
  try {
    //Checking if the username is valid
    const user = await User.findOne({ where: { username: req.body.username } });
    //if the username doesnot exist in db
    if (!user) {
      res.status(404).send({ message: "No user exists with such username" });
      return;
    }
    console.log(user.username);
    // if the user is there,then we check the password entered with the corrosponding user we get by the sql query
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    //if the password is not valid
    if (!passwordIsValid) {
      res.status(400).send({ message: "Invalid Password" });
      return;
    }
    //if the username and password both are valid. creating a jswt
    var token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: 86400, //expires in seconds =
    });
    res.status(200).send({
      id: user.id,
      name: user.username,
      email: user.email,
      jwtToken: token,
    });
  } catch (err) {
    res.status(500).send({ message: "internal server erroer" });
  }
};
