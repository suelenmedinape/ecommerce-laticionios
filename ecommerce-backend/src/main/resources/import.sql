-- Inserir produtor
INSERT INTO tb_producer (id, cnpj, email, name, password, phone, role) VALUES (1, '12345678901', 'adm@email.com', 'Cliente Um', '$2a$10$gNNzbIzg4ruJ4AtLc5ztHuaYz8J9e8ieSlFUcqE0lDR3YGaCSLGBe', '1111111111', 'ROLE_ADMIN');

INSERT INTO tb_product (product_name, price, description, quantity) VALUES ('Produto Um', 100.0, 'Descrição do Produto Um', 80);
INSERT INTO tb_product (product_name, price, description, quantity) VALUES ('Produto Dois', 19.67, 'Descrição do Produto Um', 100);
INSERT INTO tb_product (product_name, price, description, quantity) VALUES ('Produto Um', 5.5, 'Descrição do Produto Um', 120);
INSERT INTO tb_product (product_name, price, description, quantity) VALUES ('Produto Um', 34.8, 'Descrição do Produto Um', 12);

INSERT INTO tb_client (name, email, password, role) VALUES ('User um', 'userum@gmail.com', '$2a$10$gNNzbIzg4ruJ4AtLc5ztHuaYz8J9e8ieSlFUcqE0lDR3YGaCSLGBe', 'ROLE_CLIENT');
INSERT INTO tb_client (name, email, password, role) VALUES ('User dois', 'userdois@gmail.com', '$2a$10$gNNzbIzg4ruJ4AtLc5ztHuaYz8J9e8ieSlFUcqE0lDR3YGaCSLGBe', 'ROLE_CLIENT');

INSERT INTO tb_cart (client_id) VALUES (1);
INSERT INTO tb_cart (client_id) VALUES (2);

INSERT INTO tb_cart_item(cart_id, product_id, quantity, unit_price, total_price) VALUES (1, 1, 5, 100.0, 500.0);
INSERT INTO tb_cart_item(cart_id, product_id, quantity, unit_price, total_price) VALUES (1, 3, 3, 5.5, 16.5);

INSERT INTO tb_order (client_id, date, total_value, order_status) VALUES (2, CURRENT_TIMESTAMP, 119.67, 'SOLICITADO');

INSERT INTO tb_order_item (order_id, product_id, quantity, unit_price, total_price) VALUES (1, 2, 1, 19.67, 19.67);
INSERT INTO tb_order_item (order_id, product_id, quantity, unit_price, total_price) VALUES (1, 4, 3, 34.8, 104.4);

INSERT INTO tb_order (client_id, date, total_value, order_status) VALUES (2, CURRENT_TIMESTAMP, 119.67, 'SOLICITADO');

INSERT INTO tb_order_item (order_id, product_id, quantity, unit_price, total_price) VALUES (2, 1, 1, 100.0, 100.0);
INSERT INTO tb_order_item (order_id, product_id, quantity, unit_price, total_price) VALUES (2, 3, 3, 5.5, 16.5);