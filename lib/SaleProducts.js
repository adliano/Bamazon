/**
 * Requires npm mysql
 * run : npm install mysql
 */
const mysql = require("mysql");
/**
 *  Requires npm inquirer
 *  run: npm install inquirer
 */
let inquirer = require("inquirer");
/**
 *  Require MysqlConfig.js
 */
const mysqlconfig = require("./MysqlConfig");
/**
 *  Get Produt's table name from mysqlconfig.js
 */
const PRODUCT_TABLE = mysqlconfig.PRODUCT_TABLE;
/**
 *  Require npm print-message
 *  run: npm install print-message
 */
const print = require("print-message");
/**
 * print-message object to style error printing
 */
const errorBoxStyle = {
  color: "red",
  borderColor: "red",
  marginTop: 1,
  marginBottom: 1
};
/**
 * print-message object to style invoice printing
 */
const invoiceStyle = {
  border: true, // Enable border
  color: "green", // Text color
  borderColor: "green", // Border color is blue
  marginTop: 1, // Margin before border is begins
  marginBottom: 1, // Margin after border is end
  paddingBottom: 1 // Padding bottom before border ends
};
/**
 *  Database connetion configuration
 */
const connector = mysql.createConnection(mysqlconfig.mysqlconfig);

/**
 *
 * @class SaleProducts
 *
 * Class used to handle all sales transactions
 *
 */
class SaleProducts {
  /**
   * @constructor
   * @param {JSON} pruductDataObj
   * object with product sku and quantity
   */
  constructor(pruductDataObj) {
    // get product's sku
    this.sku = pruductDataObj.sku;
    // get quantity
    this.quantity_requested = pruductDataObj.quantity_requested;
    // get all info from selected produc
    this.getProductInfo();
  }
  /**
   *
   * @method getProductInfo()
   * Method used to get all info from selected product
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
          // Callback to init sales process
          this.initSale(res[0]);
        }
      );
    });
  }
  /**
   *
   * @method initSale(productObj)
   * @param {JSOn} productObj
   *  Object with all produtc's info.
   *
   *  Once the customer has placed the order, your application should check if
   *  your store has enough of the product to meet the customer's request.
   *  If your store _does_ have enough of the product, you should fulfill the customer's order.
   *  Once the update goes through, show the customer the total cost of their purchase.
   *
   */
  initSale(productObj) {
    if (productObj.stock_quantity >= this.quantity_requested) {
      // Print Invoice
      print(
        [
          `* * * * * Oder Details * * * * *`,
          `- Product : ${productObj.product_name}`,
          `- Unit Price U$${productObj.price}`,
          `- Qty : ${this.quantity_requested}`,
          `---------------------------------`,
          `Total U$${parseFloat(productObj.price) *
            parseFloat(this.quantity_requested)}`
        ],
        // invoice box style
        invoiceStyle
      );
      // Get Confirmation from user
      inquirer
        .prompt({
          type: "confirm",
          message: "Place Order?",
          name: "confirm",
          default: true
        })
        .then(answer => {
          if (answer.confirm) {
            this.placeOrder(productObj, this.quantity_requested);
          } else {
            console.log("Order Canceled!");
            connector.end();
          }
        });
      // Else Display error if products are not available
    } else {
      print(
        [
          `Insufficient quantity!`,
          `Total Available: ${productObj.stock_quantity}`
        ],
        errorBoxStyle
      );
      connector.end();
    }
  }
  /**
   *
   * @method placeOrder(productObj, quantity)
   * @param {JSON} productObj
   * @param {Integer} quantity
   *
   * This Method will take a JSON with all product's info and quantity requested by user.
   *  This Data will be used to update database and complete sales
   *
   */
  placeOrder(productObj, quantity) {
    // Variables used to check if enough product its vailable
    let _newQty = productObj.stock_quantity - quantity;
    // Quering Database
    connector.query(
      // Query to display all available products
      `UPDATE  products_tb set stock_quantity=${_newQty} where sku=${
        productObj.sku
      }`,
      // Callback used to handle the return from query
      (err, res) => {
        // Check for error on querying the database.table
        if (err) throw err;
        // Print Transaction sucess
        console.log(
          `Your  Order for ${productObj.product_name} its on the way!`
        );
        // Close connection
        connector.end();
      }
    );
  }
}

// Export Module
module.exports = SaleProducts;
