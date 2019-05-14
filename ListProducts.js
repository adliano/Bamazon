// first display all of the items available for sale. 
// Include the skus, names, and prices of products for sale.

/**
 * @module mysql
 */
const mysql = require('mysql');
/**
 * @module MysqlConfig
 */
const mysqlconfig = require('./MysqlConfig');
/**
 * @module
 */
const TABLE_NAME = mysqlconfig.TABLE_NAME;
/**
 * @module console.table
 */
require('console.table');

// Constant used for table name
//const TABLE_NAME = 'products_tb';

// Mysql server connection setup
const connector = mysql.createConnection(mysqlconfig.mysqlconfig);

// const connector = mysql.createConnection({
//     host: '127.0.0.1',
//     port: 3306,
//     user: 'nodeUser',
//     password: '',
//     database: 'bamazon_db'
// });
/**
 * Class to list products from mysql server
 */
class ListProducts {
    /**
     * @constructor
     * @param {callback} mycallback 
     */
    constructor(mycallback) {
        // Connect to server
        connector.connect((err) => {
            // Check for error on connection
            if (err) throw err;
            // query through database.table
            connector.query(
                // Query to display all available products
                `SELECT * FROM ${TABLE_NAME}`,
                // Callback used to handle the return from query
                (err, res) => {
                    // Check for error on querying the database.table
                    if (err) throw err;
                    // Display results using the npm console.table
                    console.table(res);
                    // close connection to mysql server
                    connector.end();
                    // call the callback passed
                    mycallback();
                });
        });
    }
}

module.exports = ListProducts;