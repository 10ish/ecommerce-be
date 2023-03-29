//this file contains the controller of product i.e all the operations that can be performed on the product table which will then be used by the products route in order to perform the operations based on the http request
const db = require("../models");
const Product = db.product;
const Op = db.Sequelize.Op;
//to create a new entry in the products table
exports.create = (req, res) => {
    const product = {
        name: req.body.name,
        description: req.body.description,
        cost: req.body.cost,
        categoryId: req.body.categoryId,
    };
    Product.create(product)
        .then(() => {
            res.status(200).send(`product created by the name of ${product.name}`);
        })
        .catch((err) => {
            res.status(500).send({ message: "Internal server error" });
        });
};
//to find all the categories nad to find by name is name is provided in the query
//adding a filter functiona;ity tp sort the product by cost

exports.findAll = (req, res) => {
    let result;
    let minCost = req.query.minCost;
    let maxCost = req.query.maxCost;
    if (req.query.name) {
        result = Product.findAll({ where: { name: req.query.name } });
    } else if (minCost && maxCost) {
        result = Product.findAll({
            where: { cost: { [Op.gte]: minCost, [Op.lte]: maxCost } },
        });
    } else if (minCost) {
        result = Product.findAll({ where: { cost: { [Op.gte]: minCost } } });
    } else if (maxCost) {
        result = Product.findAll({ where: { cost: { [Op.lte]: maxCost } } });
    } else {
        result = Product.findAll();
    }
    result
        .then((result) => {
            res.status(201).send(result);
        })
        .catch((err) => {
            res.status(500).send({ message: "internal server error" });
        });
};
//Find one product by id

exports.findOne = (req, res) => {
    const requestedId = req.params.id;
    Product.findAll({ where: { id: requestedId } })
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(500).send({ message: "Internal Server error" });
        });
};
//to update the  category by name usingid and returning the updated category
exports.update = (req, res) => {
    const requestedId = req.params.id;

    const updatedProduct = {
        name: req.body.name,
        description: req.body.description,
        cost: req.body.cost,
    };
    Product.update(updatedProduct, { where: { id: requestedId } })
        .then((result) => {
            Product.findByPk(requestedId)
                .then((updatedProduct) => {
                    res.status(200).send(updatedProduct);
                })
                .catch((err) => {
                    res.status(500).send({
                        message:
                            "Internal server erroor, unable to find the product with the id in the updated Product table ",
                    });
                });
        })
        .catch((err) => {
            res.status(500).send({
                message: "unable to update the values into the products table",
            });
        });
};
//deleting an existing category

exports.delete = (req, res) => {
    let deleteId = req.params.id;
    Product.destroy({ where: { id: deleteId } })
        .then(() => {
            res.status(200).send(`successfuly deleted product with id ${deleteId}`);
        })
        .catch((err) => {
            res.status(500).send({ message: "Internal server error" });
        });
};
