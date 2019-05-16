INSERT INTO
  products_tb(
    product_name,
    department_name,
    price,
    stock_quantity
  )
VALUES('macBook pro', 'computers', 1250, 3);
INSERT INTO
  products_tb(
    product_name,
    department_name,
    price,
    stock_quantity
  )
VALUES('netgear orbi', 'networking', 300, 9);
INSERT INTO
  products_tb(
    product_name,
    department_name,
    price,
    stock_quantity
  )
VALUES('macBook mini', 'computers', 1050, 5);
INSERT INTO
  products_tb(
    product_name,
    department_name,
    price,
    stock_quantity
  )
VALUES('google pixel3 xl', 'mobile devices', 700, 2);
INSERT INTO
  products_tb(
    product_name,
    department_name,
    price,
    stock_quantity
  )
VALUES('macbook pro', 'computers', 1700, 7);
INSERT INTO
  products_tb(
    product_name,
    department_name,
    price,
    stock_quantity
  )
VALUES('gt karakoram', 'bicycle', 1200, 2);

UPDATE  products_tb set stock_quantity=0 where sku=1;