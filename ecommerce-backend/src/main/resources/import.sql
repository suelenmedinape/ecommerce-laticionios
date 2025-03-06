-- Inserir produtor
INSERT INTO tb_producer (id, cnpj, email, name, password, phone, role) VALUES (1, '12345678901', 'adm@email.com', 'Cliente Um', '$2a$10$gNNzbIzg4ruJ4AtLc5ztHuaYz8J9e8ieSlFUcqE0lDR3YGaCSLGBe', '1111111111', 'ROLE_ADMIN');

INSERT INTO tb_product (product_name, price, description, quantity, category) VALUES ('Queijo Um', 10.0, 'Descrição do Produto Um', 20, 'QUEIJO');
INSERT INTO tb_product (product_name, price, description, quantity, category) VALUES ('Queijo Dois', 19.67, 'Descrição do Produto Um', 10, 'QUEIJO');
INSERT INTO tb_product (product_name, price, description, quantity, category) VALUES ('Leite Um', 5.5, 'Descrição do Produto Um', 12, 'LEITE');
INSERT INTO tb_product (product_name, price, description, quantity, category) VALUES ('Leite Dois', 4.8, 'Descrição do Produto Um', 22, 'LEITE');
INSERT INTO tb_product (product_name, price, description, quantity, category) VALUES ('Iogurte Um', 8.9, 'Descrição do Produto Um', 15, 'IOGURTE');
INSERT INTO tb_product (product_name, price, description, quantity, category) VALUES ('Iogurte Dois', 11.45, 'Descrição do Produto Um', 15, 'IOGURTE');
INSERT INTO tb_product (product_name, price, description, quantity, category) VALUES ('Manteiga Um', 7.8, 'Descrição do Produto Um', 8, 'MANTEIGA');
INSERT INTO tb_product (product_name, price, description, quantity, category) VALUES ('Manteiga Dois', 13.5, 'Descrição do Produto Um', 11, 'MANTEIGA');
INSERT INTO tb_product (product_name, price, description, quantity, category) VALUES ('Creme de Leite Um', 5.9, 'Descrição do Produto Um', 17, 'CREME_DE_LEITE');
INSERT INTO tb_product (product_name, price, description, quantity, category) VALUES ('Creme de Leite Dois', 8.25, 'Descrição do Produto Um', 19, 'CREME_DE_LEITE');
INSERT INTO tb_product (product_name, price, description, quantity, category) VALUES ('Requeijão Um', 8.6, 'Descrição do Produto Um', 6, 'REQUEIJÃO');
INSERT INTO tb_product (product_name, price, description, quantity, category) VALUES ('Requeijão Dois', 12.2, 'Descrição do Produto Um', 9, 'REQUEIJÃO');
INSERT INTO tb_product (product_name, price, description, quantity, category) VALUES ('Leite Condensado Um', 7.7, 'Descrição do Produto Um', 14, 'LEITE_CONDENSADO');
INSERT INTO tb_product (product_name, price, description, quantity, category) VALUES ('Leite Condensado Dois', 9.1, 'Descrição do Produto Um', 13, 'LEITE_CONDENSADO');
INSERT INTO tb_product (product_name, price, description, quantity, category) VALUES ('Doce de Leite Um', 6.3, 'Descrição do Produto Um', 10, 'DOCE_DE_LEITE');
INSERT INTO tb_product (product_name, price, description, quantity, category) VALUES ('Doce de Leite Dois', 8.4, 'Descrição do Produto Um', 12, 'DOCE_DE_LEITE');


INSERT INTO tb_client (name, email, password, role) VALUES ('User Um', 'userum@gmail.com', '$2a$10$gNNzbIzg4ruJ4AtLc5ztHuaYz8J9e8ieSlFUcqE0lDR3YGaCSLGBe', 'ROLE_CLIENT');
INSERT INTO tb_client (name, email, password, role) VALUES ('User Dois', 'userdois@gmail.com', '$2a$10$gNNzbIzg4ruJ4AtLc5ztHuaYz8J9e8ieSlFUcqE0lDR3YGaCSLGBe', 'ROLE_CLIENT');
INSERT INTO tb_client (name, email, password, role) VALUES ('User Três', 'usertrês@gmail.com', '$2a$10$gNNzbIzg4ruJ4AtLc5ztHuaYz8J9e8ieSlFUcqE0lDR3YGaCSLGBe', 'ROLE_CLIENT');
INSERT INTO tb_client (name, email, password, role) VALUES ('User Quatro', 'userquatro@gmail.com', '$2a$10$gNNzbIzg4ruJ4AtLc5ztHuaYz8J9e8ieSlFUcqE0lDR3YGaCSLGBe', 'ROLE_CLIENT');


INSERT INTO tb_cart (client_id) VALUES (1), (2), (3), (4);


INSERT INTO tb_cart_item (cart_id, product_id, quantity, unit_price, total_price) VALUES (1, 1, 2, 10.0, 20.0);
INSERT INTO tb_cart_item (cart_id, product_id, quantity, unit_price, total_price) VALUES (1, 5, 3, 8.9, 26.7);
INSERT INTO tb_cart_item (cart_id, product_id, quantity, unit_price, total_price) VALUES (3, 4, 1, 34.8, 34.8); 
INSERT INTO tb_cart_item (cart_id, product_id, quantity, unit_price, total_price) VALUES (3, 7, 2, 7.8, 15.6);


INSERT INTO tb_order (client_id, date, total_value, order_status) VALUES (2, CURRENT_TIMESTAMP, 119.67, 'SOLICITADO');
INSERT INTO tb_order (client_id, date, total_value, order_status) VALUES (3, CURRENT_TIMESTAMP, 145.90, 'FINALIZADO'); 
INSERT INTO tb_order (client_id, date, total_value, order_status) VALUES (4, CURRENT_TIMESTAMP, 85.30, 'CANCELADO');


INSERT INTO tb_order_item (order_id, product_id, quantity, unit_price, total_price) VALUES (1, 2, 1, 19.67, 19.67);
INSERT INTO tb_order_item (order_id, product_id, quantity, unit_price, total_price) VALUES (1, 4, 3, 34.8, 104.4);


INSERT INTO tb_order_item (order_id, product_id, quantity, unit_price, total_price) VALUES (2, 3, 2, 5.5, 11.0);  
INSERT INTO tb_order_item (order_id, product_id, quantity, unit_price, total_price) VALUES (2, 5, 4, 8.9, 35.6); 
INSERT INTO tb_order_item (order_id, product_id, quantity, unit_price, total_price) VALUES (2, 8, 3, 13.5, 40.5);  
INSERT INTO tb_order_item (order_id, product_id, quantity, unit_price, total_price) VALUES (2, 10, 2, 8.25, 16.5);


INSERT INTO tb_order_item (order_id, product_id, quantity, unit_price, total_price) VALUES (3, 7, 1, 7.8, 7.8);
INSERT INTO tb_order_item (order_id, product_id, quantity, unit_price, total_price) VALUES (3, 9, 2, 5.9, 11.8);  
INSERT INTO tb_order_item (order_id, product_id, quantity, unit_price, total_price) VALUES (3, 12, 3, 12.2, 36.6); 
INSERT INTO tb_order_item (order_id, product_id, quantity, unit_price, total_price) VALUES (3, 14, 2, 9.1, 18.2);

