// Require mysql npm module
const mysql = require("mysql");
let inquirer = require("inquirer");
const mysqlconfig = require("./MysqlConfig");
const PRODUCT_TABLE = mysqlconfig.PRODUCT_TABLE;
// npm PrintMessage
const print = require("print-message");
const errorBoxStyle = {
  color: "red",
  borderColor: "red",
  marginTop: 1,
  marginBottom: 1
};
const invoiceStyle = {
  border: true, // Enable border
  color: "green", // Text color
  borderColor: "green", // Border color is blue
  marginTop: 1, // Margin before border is begins
  marginBottom: 1, // Margin after border is end
  paddingBottom: 1 // Padding bottom before border ends
};

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

          //connector.end();
        }
      );
    });
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
    // Once the customer has placed the order, your application should check if
    // your store has enough of the product to meet the customer's request.
    // However, if your store _does_ have enough of the product, you should fulfill the customer's order.
    // This means updating the SQL database to reflect the remaining quantity.
    // Once the update goes through, show the customer the total cost of their purchase.
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
      //
      //
      //
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
   *
   *
   *
   *
   *
   */
  placeOrder(productObj, quantity) {
    let _newQty = productObj.stock_quantity - quantity;
    // UPDATE  products_tb set stock_quantity=0 where sku=1;

    // Connect to server
    // connector.connect(err => {
    // Check for error on connection
    //if (err) throw err;
    // query through database.table
    connector.query(
      // Query to display all available products
      `UPDATE  products_tb set stock_quantity=${_newQty} where sku=${
        productObj.sku
      }`,
      // Callback used to handle the return from query
      (err, res) => {
        // Check for error on querying the database.table
        if (err) throw err;

        console.log(`changed ${res.changedRows} rows`);

        connector.end();
      }
    );
    //});
  }
}

module.exports = SaleProducts;
