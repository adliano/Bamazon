/**
 * Running this application will first display all of
 * the items available for sale. Include the skus, names,
 * and prices of products for sale.
 */

let ListProducts = require("./lib/ListProducts");
let SaleProducts = require("./lib/SaleProducts");
let inquirer = require("inquirer");

let products = new ListProducts();

products.listInventory().then(() => {
  // The first should ask them the SKU of the product they would like to buy
  inquirer
    .prompt([
      {
        // The first should ask them the SKU of the product they would like to buy.
        type: "input",
        message: "Enter SKU of the product you like to buy?",
        name: "sku"
      },
      // The second message should ask how many units of the product they would like to buy.
      {
        type: "input",
        message: "How many units of the product would you like to buy?",
        name: "quantity_requested"
      }
    ])
    .then(answer => {
      new SaleProducts(answer);
    });
});
