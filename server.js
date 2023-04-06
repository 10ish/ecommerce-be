let express = require('express');
let serverConfig = require('./configs/server.config');
let app = express();
let mysql = require('mysql2');
//using body parser middleware to parse request and responses which are urlencoded and json objects
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//connecting to the database 

const db = require('./models');
const Category = db.category;
const Product = db.product;
//looks if there is an existing db by the same name. if it has any data deletes the data and then calls the init function to insert dummy data


db.sequelize.sync({force:true}).then(()=>{
    console.log('tables dropped and created');
    init()
})
function init(){
const dummyCategories = [{name:'Electronics',description:'this is an electronic item'},{name:'Kitchenware',description:'this is an kitchenware item'}];
Category.bulkCreate(dummyCategories)
.then(()=>{
    console.log('successfully initialised category')
})
.catch((err)=>{
    console.log('Initialised failed due to : ' + err);
})
//creating dummy entries for product and categories when db is initialised
const dummyProducts = [{name:'Mobile phone',description:'redmi note 8',cost:30000,categoryId:1},{name:'Dido',description:'6 inch',cost:100000,categoryId:2}];
Product.bulkCreate(dummyProducts)
.then(()=>{
    console.log('succesfully initialized product')
}) 
.catch((err)=>{
    console.log('Unable to initialize product due to ' +  err);
})
}
//home route

//importing routes for all the apis
//importing category routes and calling the function right here
require('./routes/category.routes')(app);
//importing product routes and calling by passing express app constant to it
require('./routes/product.routes')(app);
//importing alll the auth routes
require('./routes/auth.routes')(app);

//Server Listening
app.listen(serverConfig.PORT,()=>{
    console.log(`server running on port: ${serverConfig.PORT}`);
});
