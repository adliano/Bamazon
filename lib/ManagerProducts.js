const mysql = require("mysql");
let inquirer = require("inquirer");
const mysqlconfig = require("./MysqlConfig");
let ListProducts = require("./ListProducts");
const PRODUCT_TABLE = mysqlconfig.PRODUCT_TABLE;
const connector = mysql.createConnection(mysqlconfig.mysqlconfig);

/**
 * Class to manage Products inventory
 */
class ManagerProducts {
  /**
   * @constructor
   */
  constructor() {}
  /**
   *
   * @method addInventory()
   * Method to re-stock product
   * List all Products and then ask user the sku of
   * product to re-stock and quantity
   *
   */
  addInventory() {
    // List all Products and then ask user the sku of product to re-stock and quantity
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
          // After get all data from user, query database for update invetory
          connector.query(
            `UPDATE ${PRODUCT_TABLE} SET stock_quantity=stock_quantity+${
              answers.quantity
            } WHERE sku=${answers.sku};`,
            // Callback
            (err, res) => {
              // Check for error quering
              if (err) throw err;
              // Log msg for sucessful transaction
              console.log("Pruduct Inventory added!");
            }
          );
          // Close connection
          connector.end();
        });
    });
  }
  /**
   *
   * @method createProduct()
   * Method to create a new product and add to inventory.
   * This will ask user about product's all info and
   * add it to Mysql database
   *
   */
  createProduct() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Product Name:",
          name: "product_name"
        },
        {
          type: "input",
          message: "Department Name:",
          name: "department_name"
        },
        {
          type: "input",
          message: "Product Price:",
          name: "price"
        },
        {
          type: "input",
          message: "Stock Quantity:",
          name: "stock_quantity"
        }
      ])
      .then(answers => {
        // Quering to database
        connector.query(
          `INSERT INTO
          products_tb(
            product_name,
            department_name,
            price,
            stock_quantity
          )
        VALUES('${answers.product_name}', '${answers.department_name}', ${
            answers.price
          }, ${answers.stock_quantity});`,
          // Callback
          (err, resp) => {
            // Check for error quering
            if (err) throw err;
            // if Sucessful log msg to  user
            console.log(`Item ${answers.product_name} Created!`);
          }
        );
        // Clode connection
        connector.end();
      });
  }
}
// Export module
module.exports = ManagerProducts;

// INSERT INTO
//   products_tb(
//     product_name,
//     department_name,
//     price,
//     stock_quantity
//   )
// VALUES('google pixel3 xl', 'mobile devices', 700, 2);
