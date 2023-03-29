//function to check the category
const db = require("../models");
const Category = db.category;
const Product = db.product;

const validateCategoryRequest = (req, res, next) => {
  if (req.method === ("POST" || "PUT")) {
    if (!req.body.name) {
      res
        .status(400)
        .send({ message: "The request does not contain name in it" });
      return;
    }
    next();
    
    
  }  if (req.params.id) {
    console.log(req.params.id);
    Category.findByPk(req.params.id)
      .then((category) => {
        if (!category) {
          res
            .status(400)
            .send({ message: "Category Id passed is not availablr " });
          return;
        }
        next();
      })
      .catch((err) => {
        res.status(500).send({ message: "some internal server error" });
        return;
      });
  } 
   else if (req.query.name) {
    console.log(req.query.name)
    Category.findAll({ where: { name: req.query.name } })
      .then((category) => {
        console.log(category.name);
        if(!category[0]){
            res.status(400).send({message:'sorry the category with this name does not exist'})
            return;
        }
        next();
      })
      .catch((err) => {
        res.status(500).send({ messsage: "category not server error" });
      });
  } 
  
};

const validateProductRequest = (req, res, next) => {
    if(req.method===('POST'||'PUT')){
        if (!(req.body.name && req.body.cost)) {
            res.status(400).send({
              message: "Invalid request,either name or cost is not provided in the req",
            });
            return;
          } 
          next();
    }
 else if (req.params.id) {
    Product.findByPk(req.params.id)
      .then((product) => {
        if (!product) {
          res.status(400).send({
            message: "The product id you are looking for does not exist",
          });
          return;
        }
        next();
      })
      .catch((err) => {
        res.status(500).send({ message: "Internal server error" });
      });
  } else if (req.query.name) {
    Product.findAll({ where: { name: req.query.name } })
      .then((product) => {
        if (!product[0]) {
          res.status(400).send({ message: "the  product name does not exist" });
          return;
        }
        next();
      })
      .catch((err) => {
        res.status(500).send({ message: "Internal server error" });
      });
  } 
  
};

module.exports = {
  validateCategoryRequest: validateCategoryRequest,
  validateProductRequest: validateProductRequest,
};
