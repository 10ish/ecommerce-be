let express = require('express');
let app = express();
let mysql = require('mysql2');
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.get('/',(req,res)=>{
    res.send('Home');
})
app.listen(3000,()=>{
    console.log('server running on 3000');
})