// http://www.mysqltutorial.org/
// https://www.npmjs.com/package/inquirer#examples
/**
 * Running this application will first display all of
 * the items available for sale. Include the skus, names,
 * and prices of products for sale.
 */

let ListProducts = require("./ListProducts");
let SaleProducts = require("./SaleProducts");
let inquirer = require("inquirer");

new ListProducts().then(() => {
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
