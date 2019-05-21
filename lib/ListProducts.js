/**
 * Author: Adriano Alves
 */

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
   *
   * @constructor
   */
  constructor() {}

  /**
   * listInventory(lowLimit)
   * @param {integer} lowLimit
   * @returns {promises}
   *
   *  Method to list all products on database.
   *  if lowLimit passed it willdisplay all products that have quantity
   *  lowLimit <= qunatity
   */
  listInventory(lowLimit) {
    // If lowLimit its pass it will show all products with quantity lower than lowLimit
    // like: listInventory(5) will display all products that have stock_quantity < 5
    let query = lowLimit
      ? `select * from ${PRODUCT_TABLE} group by sku having stock_quantity < ${lowLimit};`
      : `SELECT * FROM ${PRODUCT_TABLE}`;
    // It will return a promise
    return new Promise(function(resolve, reject) {
      // Connect to Database
      connector.connect(err => {
        // Check for error on connection
        if (err) reject(err);
        // Query the database for data
        connector.query(query, (err, res) => {
          // Check for error quering database
          if (err) reject(err);
          // Display Results using npm console.table
          console.table(res);
          // Close connection
          connector.end();
          // passing res to be able to check if no item is on lowlimit
          // by checking res.length we are able to check if all products have
          // no low inventory
          resolve(res);
        });
      });
    });
  }
} // :: End  od class ::

// Export module
module.exports = ListProducts;
