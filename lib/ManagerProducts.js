const mysql = require("mysql");
let inquirer = require("inquirer");
const mysqlconfig = require("./MysqlConfig");
let ListProducts = require("./ListProducts");
const PRODUCT_TABLE = mysqlconfig.PRODUCT_TABLE;
const connector = mysql.createConnection(mysqlconfig.mysqlconfig);

/**
 *
 */
class ManagerProducts {
  /**
   *
   */
  constructor() {
    console.log("ManagerProducts");
  }
  /**
   *
   *
   */
  addProduct() {
    new ListProducts().listInventory().then(() => {
      inquirer
        .prompt([
          {
            type: "input",
            message: "SKU: ",
            name: "sku"
          },
          {
            type: "input",
            message: "Quantity: ",
            name: "quantity"
          }
        ])
        .then(answers => {
          //new ManagerProducts().addProduct(answers);
          //console.log(answers);
          connector.query(
            `UPDATE products_tb SET stock_quantity=stock_quantity+${
              answers.quantity
            } WHERE sku=${answers.sku};`,
            (err, res) => {
              if (err) throw err;
              //console.log(res);
            }
          );
          connector.end();
        });
    });
  }
}

module.exports = ManagerProducts;
