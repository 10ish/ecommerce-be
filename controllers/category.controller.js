//controller for category model in the databse
//all the operation logic for the corrosponsing model are implemented here
//we use exports.function to export the operatioon logic which would be required by the routes

const db = require('../models');
const Category = db.category;
//post request to insert a category
exports.create = (req,res)=>{
    /*
    Validity of the user
    */
if(!req.body.name){
    //req.body validity check
    console.log('Invalid body: no name in the body request');
    res.status(400).send('Invaliid Request in body : no name');
    return;
}
//creaton of new category
const category = {
    name : req.body.name,
    description: req.body.description
}
//When the promise is fulfilled/rejected : handling of the part
Category.create(category).then((category)=>{
    console.log('created a category with'+ category.name)
    res.status(201).send(category)
}).catch((err)=>{
    console.log( ' unable to create due to' + err)
res.status(500).send({message: 'some Internal error'})
})

}
//to find all the categories present in databasem or categories based on the name/id
//request example:
/* 
1. for all : /categories
2.for id : /categories/:id
3.for name : /categories?name='userInput'
*/
exports.findAll = (req,res)=>{
    let result;
    const categoryName = req.query.name;
    if(categoryName){
result = Category.findAll({where:{name:categoryName}})
    }


    else {
result = Category.findAll()
    }

result.then((result)=>{
    res.status(200).send(result)
}).catch((err)=>{
    res.status(500).send({message: 'Internal Server Error'})
})

}
//to find the category by id
exports.findOne = (req,res)=>{
    const requestedId = req.params.id;
Category.findAll({where:{id:requestedId}}).then((category)=>{
    res.status(201).send(category)
}).catch((err)=>{
    res.status(500).send({message: 'Internal error unable to fetch record'})
})

}

//Updating an existing category, we use a put request so complete data is  needed
exports.update = (req,res)=>{
    const updateId = req.params.id;
const category = {
    name: req.body.name,
    description: req.body.description
}
if(category){
    //updating and checking for errors if any
Category.update(category,{where:{id:updateId}}).then((updatedCategory)=>{
//this is after the updation is succesful as we need to return the object as well which has been updated,thus one more promise
Category.findByPk(updateId).then((updatedCategory)=>{
    res.status(200).send(updatedCategory)
})
.catch((err)=>{
    //checks i there are any errors in fetching the updated category from the updated table
    res.status(500).send({message:'Internal Server Error'})
})
    
}).catch((err)=>{
res.status(500).send({message:'internal server errror'})
})
}
else{
    res.status(400).send('Invalid request in body')
}

}
//deleting an existing category based on category id
//route: /category/id

exports.delete = (req,res)=>{
    const requestedId = req.params.id;
    console.log(requestedId);
    Category.destroy({where:{id:requestedId}})
    .then((deletedCategory)=>{
        res.status(201).send('successfuly deleted')
    }).catch((err)=>{
        res.status(500).send({message:'internal server error' + err})
    })
}
