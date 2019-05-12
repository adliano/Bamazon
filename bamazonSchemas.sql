
DROP DATABASE bamazon_db;

CREATE DATABASE IF NOT EXISTS bamazon_db;

USE bamazon_db;

-- sku (unique id for each product)
-- product_name (Name of product)
-- department_name
-- price (cost to customer)
-- stock_quantity (how much of the product is available in stores)

CREATE TABLE IF NOT EXISTS products_tb(
    sku INTEGER AUTO_INCREMENT,
    product_name VARCHAR(32) NOT NULL,
    department_name VARCHAR(32) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER DEFAULT 0,
    PRIMARY KEY(sku),
    UNIQUE(product_name)
    );

/*
+-----------------+---------------+------+-----+---------+----------------+
| Field           | Type          | Null | Key | Default | Extra          |
+-----------------+---------------+------+-----+---------+----------------+
| sku             | int(11)       | NO   | PRI | NULL    | auto_increment |
| product_name    | varchar(32)   | NO   | PRI | NULL    |                |
| department_name | varchar(32)   | NO   |     | NULL    |                |
| price           | decimal(10,2) | NO   |     | NULL    |                |
| stock_quantity  | int(11)       | YES  |     | 0       |                |
+-----------------+---------------+------+-----+---------+----------------+
*/

DESCRIBE products_tb;