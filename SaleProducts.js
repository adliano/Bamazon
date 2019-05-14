const mysql = require('mysql');
const mysqlconfig = require('./MysqlConfig');
const TABLE_NAME = mysqlconfig.TABLE_NAME;

const connector = mysql.createConnection(mysqlconfig.mysqlconfig);


class SaleProducts{
    constructor(pruductDataObj){
        this.sku = pruductDataObj.sku;
        this.stock_quantity = pruductDataObj.stock_quantity;
    }

    getStock(){
        // Connect to server
        connector.connect((err) => {
            // Check for error on connection
            if (err) throw err;
            // query through database.table
            connector.query(
                // Query to display all available products
                `SELECT * FROM ${TABLE_NAME} WHERE sku=${this.sku}`,
                // Callback used to handle the return from query
                (err, res) => {
                    // Check for error on querying the database.table
                    if (err) throw err;
                    // Display results using the npm console.table
                    console.table(res);
                    // close connection to mysql server
                    connector.end();
                    // call the callback passed
                });
        });
    }
}

module.exports = SaleProducts;