
// first display all of the items available for sale. 
// Include the skus, names, and prices of products for sale.

class ListProducts{

    constructor(){
        console.log(`inside ${this}`);
    }
}


const mysql = require('mysql');

const connector = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'nodeUser',
    password: '',
    database: 'bamazon_db'
});


module.exports = ListProducts;
