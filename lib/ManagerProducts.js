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
   * addInventory()
   *
   */
  addInventory() {
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
            `UPDATE ${PRODUCT_TABLE} SET stock_quantity=stock_quantity+${
              answers.quantity
            } WHERE sku=${answers.sku};`,
            (err, res) => {
              if (err) throw err;
              console.log("Pruduct Inventory added");
            }
          );
          connector.end();
        });
    });
  }
  /**
   *
   *
   *
   *
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
          (err, resp) => {
            console.log("item created");
          }
        );
      });
  }
}

module.exports = ManagerProducts;

// INSERT INTO
//   products_tb(
//     product_name,
//     department_name,
//     price,
//     stock_quantity
//   )
// VALUES('google pixel3 xl', 'mobile devices', 700, 2);
