// first display all of the items available for sale. 
// Include the skus, names, and prices of products for sale.
/**
 * product_name,
    department_name,
    price,
    stock_quantity
 */

const mysql = require('mysql');

const TABLE_NAME = 'products_tb';

const connector = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'nodeUser',
    password: '',
    database: 'bamazon_db'
});

class ListProducts {

    constructor() {
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
                    console.log(res);
                    // End connection to mysql server
                    connector.end();
                });
        });
        
    }
}

module.exports = ListProducts;