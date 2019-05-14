// first display all of the items available for sale. 
// Include the skus, names, and prices of products for sale.

const mysql = require('mysql');
require('console.table');

const TABLE_NAME = 'products_tb';

const connector = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'nodeUser',
    password: '',
    database: 'bamazon_db'
});

class ListProducts {

    constructor(mycallback) {
        connector.connect((err) => {
            if (err) throw err;
            connector.query(
                // Query to display all available products
                `SELECT * FROM ${TABLE_NAME}`,
                // Callback
                (err, res) => {
                    // Check for error
                    if (err) throw err;
                    // Display results
                    //console.log(res);
                    console.table(res);
                    // End connection to mysql server
                    connector.end();
                    mycallback();
                });
        });
        
        
    }
}

module.exports = ListProducts;