PRAGMA foreign_keys = ON;

SELECT product_id, name, price, stock_quantity
FROM products
ORDER BY price DESC, product_id ASC;

SELECT product_id, name, price, stock_quantity
FROM products
WHERE price >= 500 AND stock_quantity > 5
ORDER BY price ASC
LIMIT 3;

SELECT product_id, name, price
FROM products
WHERE product_id = 1;

UPDATE products
SET price = 475.00
WHERE product_id = 1;

SELECT product_id, name, price
FROM products
WHERE product_id = 1;


SELECT product_id, name
FROM products
WHERE product_id = 6;

DELETE FROM products
WHERE product_id = 6;

SELECT product_id, name
FROM products
WHERE product_id = 6;

SELECT
    o.order_id,
    o.order_date,
    o.status,
    c.first_name,
    c.last_name,
    oi.product_id,
    p.name AS product_name,
    oi.quantity,
    oi.unit_price,
    oi.quantity * oi.unit_price AS line_total
FROM orders AS o
JOIN customers AS c ON c.customer_id = o.customer_id
JOIN order_items AS oi ON oi.order_id = o.order_id
JOIN products AS p ON p.product_id = oi.product_id
ORDER BY o.order_id, oi.order_item_id;

SELECT
    c.customer_id,
    c.first_name,
    c.last_name,
    o.order_id,
    o.status
FROM customers AS c
LEFT JOIN orders AS o ON o.customer_id = c.customer_id
ORDER BY c.customer_id, o.order_id;

SELECT
    c.customer_id,
    c.first_name,
    c.last_name,
    COUNT(o.order_id) AS order_count
FROM customers AS c
LEFT JOIN orders AS o ON o.customer_id = c.customer_id
GROUP BY c.customer_id, c.first_name, c.last_name
ORDER BY c.customer_id;

SELECT
    o.order_id,
    SUM(oi.quantity * oi.unit_price) AS order_total
FROM orders AS o
JOIN order_items AS oi ON oi.order_id = o.order_id
GROUP BY o.order_id
ORDER BY o.order_id;

BEGIN TRANSACTION;

UPDATE products
SET stock_quantity = stock_quantity + 5
WHERE product_id = 1;

SELECT product_id, stock_quantity
FROM products
WHERE product_id = 1;

ROLLBACK;

SELECT product_id, stock_quantity
FROM products
WHERE product_id = 1;

BEGIN TRANSACTION;

UPDATE products
SET stock_quantity = stock_quantity + 2
WHERE product_id = 1;

SELECT product_id, stock_quantity
FROM products
WHERE product_id = 1;

COMMIT;

SELECT product_id, stock_quantity
FROM products
WHERE product_id = 1;
