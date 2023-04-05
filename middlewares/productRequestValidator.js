const db = require("../models");

const Product = db.product;

const validateProductBody = async (req, res, next) => {
  if (!(req.body.name && req.body.cost)) {
    res
      .status(400)
      .send({ message: "The request doses not contain name or cost  in it" });
      return;
  }
  next();
};

const validateProductId = async (req, res, next) => {
  if (req.params.id) {
    let requestedId = req.params.id;
    try {
      let requestedCategory = await Product.findByPk(requestedId);
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
const validateProductName = async (req, res, next) => {
  if (req.query.name) {
    const requestedName = req.query.name;
    let requestedCategory = await Product.findAll({
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

const validateProductRequest = {
    validateProductId : validateProductId,
    validateProductBody : validateProductBody,
    validateProductName : validateProductName
}

module.exports = validateProductRequest;
