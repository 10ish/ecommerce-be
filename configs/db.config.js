//this config file contains all the configuration for database which can v=change based on thr envirnment/other factors
module.exports = {
    developement:{
    HOST: 'localhost',
    USER: 'root',
    PASSWORD:'1234',
    DB:'ecom_db',
    DIALECT: 'mysql'
    },
    production:{
        HOST: 'sql12.freemysqlhosting.net',
    USER: 'sql12612490',
    PASSWORD:'ctUVHqW7Xw',
    DB:'sql12612490',
    DIALECT: 'mysql'
    }
}
   