if(process.env.NODE_ENV!='production'){
    require('dotenv').config();
}

Module.exports = {
    PORT : process.env.PORT
}