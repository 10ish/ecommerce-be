//this file contains the controller of product i.e all the operations that can be performed on the product table which will then be used by the products route in order to perform the operations based on the http request
const db = require('../models');
const Product = db.product;
//to create a new entry in the products table
exports.create = (req,res)=>{
    if(!req.body.name&&req.body.cost){
        res.status(400).send({message:'Invalid request,either name or cost is not provided in the req'});
        return;
    }
    const product = {
        name:req.body.name,
        description:req.body.description,
        cost : req.body.cost
    }
    Product.create(product)
    .then(()=>{
        res.status(200).send(`product created by the name of ${product.name}`)
    })
    .catch((err)=>{
        res.status(500).send({message:'Internal server error'})
    })
}
//to find all the categories nad to find by name is name is provided in the query

exports.findAll = (req,res)=>{
    let result;
    if(req.query.name){

        result = Product.findAll({where: {name : req.query.name}})
    }
    else{
 result = Product.findAll()
    }
 result
 .then((result)=>{
    res.status(201).send(result)
 })
 .catch((err)=>{
  res.status(500).send({message:'internal server error'})
 })

}
//Find one product by id

exports.findOne = (req,res)=>{
    const requestedId= req.params.id;
Product.findAll({where:{id:requestedId}})
.then((result)=>{
    res.status(200).send(result)
})
.catch((err)=>{
    res.status(500).send({message: 'Internal Server error'})
})
}
//to update the  category by name usingid and returning the updated category 
exports.update = (req,res)=>{
   const requestedId = req.params.id;
   if(requestedId){
    if(!(req.body.name&&req.body.cost)){
        res.status(400).send({message:'Invalid request,either name or cost is not provided in the req'});
        return;
    }
    const updatedProduct = {
        name : req.body.name,
        description: req.body.description,
        cost: req.body.cost
    }
    Product.update(updatedProduct,{where:{id:requestedId}})
    .then((result=>{
        Product.findByPk(requestedId)
        .then((updatedProduct)=>{
            res.status(200).send(updatedProduct);
    
        }).catch((err)=>{
            res.status(500).send({message: 'Internal server erroor, unable to find the product with the id in the updated Product table '})
        })
    }))
    .catch((err)=>{
        res.status(500).send({message:'unable to update the values into the products table'})
    })

   }
   else {
    res.status(400).send({message:'Please provide thne id paramater'})
   }
}
//deleting an existing category

exports.delete = (req,res)=>{
    let deleteId = req.params.id
    Product.destroy({where:{id:deleteId}})
    .then(()=>{
        res.status(200).send(`successfuly deleted product with id ${deleteId}`)
    })
    .catch((err)=>{
        res.status(500).send({message:'Internal server error'})
    })
}
