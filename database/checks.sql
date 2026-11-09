PRAGMA foreign_keys = ON;

INSERT INTO orders (customer_id, status, shipping_address)
VALUES (99999, 'new', 'Тестова адреса');

INSERT INTO customers (first_name, last_name, email)
VALUES (NULL, 'Тестовий', 'null-name@example.com');

INSERT INTO products (name, price, stock_quantity)
VALUES ('Некоректний товар', -10, 1);

INSERT INTO customers (first_name, last_name, email)
VALUES ('Дублікат', 'Покупця', 'olena.koval@example.com');

SELECT customer_id, first_name, last_name, email
FROM customers
WHERE email IN ('null-name@example.com', 'olena.koval@example.com');

SELECT product_id, name, price
FROM products
WHERE name = 'Некоректний товар';

SELECT order_id, customer_id
FROM orders
WHERE customer_id = 99999;
