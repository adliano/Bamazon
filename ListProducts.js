// first display all of the items available for sale.
// Include the skus, names, and prices of products for sale.

/**
 * @module mysql
 */
const mysql = require("mysql");
/**
 * @module MysqlConfig
 */
const mysqlconfig = require("./MysqlConfig");
/**
 * @module Constant used for table name
 */
const PRODUCT_TABLE = mysqlconfig.PRODUCT_TABLE;
/**
 * @module console.table
 */
require("console.table");

// Mysql server connection setup
const connector = mysql.createConnection(mysqlconfig.mysqlconfig);

/**
 * Class to list products from mysql server
 */
class ListProducts {
  /**
   * @constructor
   */
  constructor() {
    return new Promise(function(resolve, reject) {
      connector.connect(err => {
        if (err) reject(err);

        connector.query(`SELECT * FROM ${PRODUCT_TABLE}`, (err, res) => {
          if (err) reject(err);

          console.table(res);

          connector.end();

          resolve("Sucess");
        });
      });
    });
  }
}

module.exports = ListProducts;
