const mysql = require('mysql');
const mysqlconfig = require('./MysqlConfig');
const PRODUCT_TABLE = mysqlconfig.PRODUCT_TABLE;

const connector = mysql.createConnection(mysqlconfig.mysqlconfig);


class SaleProducts{
    constructor(pruductDataObj){
        this.sku = pruductDataObj.sku;
        this.stock_quantity = pruductDataObj.stock_quantity;
    }
    /**
     * Once the customer has placed the order, your application 
     * should check if your store has enough of the product to 
     * meet the customer's request
     */
    getStock(){
        // Connect to server
        connector.connect((err) => {
            // Check for error on connection
            if (err) throw err;
            // query through database.table
            connector.query(
                // Query to display all available products
                `SELECT * FROM ${PRODUCT_TABLE} WHERE sku=${this.sku}`,
                // Callback used to handle the return from query
                (err, res) => {
                    // Check for error on querying the database.table
                    if (err) throw err;
                    // Display results using the npm console.table
                    //console.log(`Total Available: ${res[0].stock_quantity}`);
                    let stock = res[0].stock_quantity;
                    // close connection to mysql server
                    connector.end();
                    // Return total available product
                    console.log(stock);
                    
                    return stock;
                });
        });
    }
    /**
     * 
     */
    getProductName(){
        // Connect to server
        connector.connect((err) => {
            // Check for error on connection
            if (err) throw err;
            // query through database.table
            connector.query(
                // Query to display all available products
                `SELECT product_name FROM ${PRODUCT_TABLE} WHERE sku=${this.sku}`,
                // Callback used to handle the return from query
                (err, res) => {
                    // Check for error on querying the database.table
                    if (err) throw err;
                    // close connection to mysql server
                    connector.end();

                    return res;
                });
        });

    }
}

module.exports = SaleProducts;