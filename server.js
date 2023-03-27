let express = require('express');
let serverConfig = require('./configs/server.config');
let dbConfig = require('./configs/db.config');
let app = express();
let mysql = require('mysql2');
let bodyParser = require('body-parser');
app.use(bodyParser.json());


//Server Listening
app.get('/',(req,res)=>{
    res.send('Home');
});
app.listen(serverConfig.PORT,()=>{
    console.log(`server running on port: ${serverConfig.PORT}`);
});
