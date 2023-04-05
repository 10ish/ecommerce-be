//function to check the category

const db = require("../models");
const Category = db.category;
//refactoring the code with async await
const validateCategoryBody = (req, res, next) => {
  if (!req.body.name) {
    res
      .status(400)
      .send({ message: "The request doses not contain name in it" });
      return;
  }
  next();
};
const validateCategoryId = async (req, res, next) => {
  if (req.params.id) {
    let requestedId = req.params.id;
    try {
      let requestedCategory = await Category.findByPk(requestedId);
      if (!requestedCategory) {
        res
          .status(400)
          .send({ message: "The id you requested for does not exist" });
        return;
      }
      next();
    } catch (err) {
      res.status(500).send({ message: "internal server err " + err });
    }
  }
};
const validateCategoryName = async (req, res, next) => {
  if (req.query.name) {
    const requestedName = req.query.name;
    let requestedCategory = await Category.findAll({
      where: { name: requestedName },
    });
    if (!requestedCategory[0]) {
      res.status(400).send("The name that you have requested does not exist");
      return;
    }
    next();
  } else {
    next();
  }
};
const validateCategoryRequest = {
  validateCategoryBody : validateCategoryBody,
  validateCategoryId : validateCategoryId,
  validateCategoryName: validateCategoryName
}

 module.exports = validateCategoryRequest;

