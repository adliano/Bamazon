const mysql = require("mysql");
const mysqlconfig = require("./MysqlConfig");
const PRODUCT_TABLE = mysqlconfig.PRODUCT_TABLE;

const connector = mysql.createConnection(mysqlconfig.mysqlconfig);

class SaleProducts {
  constructor(pruductDataObj) {
    this.sku = pruductDataObj.sku;
    this.quantity_requested = pruductDataObj.quantity_requested;
    //this.initSale();
    this.getProductInfo();
  }
  /**
   *
   *
   *
   *
   *
   *
   */
  initSale(productObj) {
    console.log("initsales.......");
    // Once the customer has placed the order, your application should check if
    // your store has enough of the product to meet the customer's request.
    if (productObj.stock_quantity >= this.quantity_requested) {
      console.log("works");
    } else {
      console.log(`Total Available: ${productObj.stock_quantity}`);
    }
  }
  /**
   *
   *
   *
   *
   *
   */
  getProductInfo() {
    // Connect to server
    connector.connect(err => {
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

          this.initSale(res[0]);

          connector.end();
        }
      );
    });
  }
}

module.exports = SaleProducts;
