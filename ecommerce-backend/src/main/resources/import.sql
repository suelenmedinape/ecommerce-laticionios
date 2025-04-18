-- Inserir produtor
INSERT INTO tb_producer (id, cnpj, email, name, password, phone, role) VALUES (1, '12345678901', 'adm@email.com', 'Claudio Oliveira', '$2a$10$gNNzbIzg4ruJ4AtLc5ztHuaYz8J9e8ieSlFUcqE0lDR3YGaCSLGBe', '1111111111', 'ROLE_ADMIN');

INSERT INTO tb_product (product_name, price, description, quantity, category) VALUES ('Queijo Um', 10.0, 'Descrição do Queijo Um', 20, 'QUEIJO');
INSERT INTO tb_product (product_name, price, description, quantity, category) VALUES ('Queijo Dois', 19.67, 'Descrição do Queijo Dois', 10, 'QUEIJO');
INSERT INTO tb_product (product_name, price, description, quantity, category) VALUES ('Leite Um', 5.5, 'Descrição do Leite Um', 12, 'LEITE');
INSERT INTO tb_product (product_name, price, description, quantity, category) VALUES ('Leite Dois', 4.8, 'Descrição do Leite Dois', 22, 'LEITE');
INSERT INTO tb_product (product_name, price, description, quantity, category) VALUES ('Iogurte Um', 8.9, 'Descrição do Iogurte Um', 15, 'IOGURTE');
INSERT INTO tb_product (product_name, price, description, quantity, category) VALUES ('Iogurte Dois', 11.45, 'Descrição do Iogurte Dois', 15, 'IOGURTE');
INSERT INTO tb_product (product_name, price, description, quantity, category) VALUES ('Manteiga Um', 7.8, 'Descrição da Manteiga Um', 8, 'MANTEIGA');
INSERT INTO tb_product (product_name, price, description, quantity, category) VALUES ('Manteiga Dois', 13.5, 'Descrição da Manteiga Dois', 11, 'MANTEIGA');
INSERT INTO tb_product (product_name, price, description, quantity, category) VALUES ('Creme de Leite Um', 5.9, 'Descrição do Creme de Leite Um', 17, 'CREME_DE_LEITE');
INSERT INTO tb_product (product_name, price, description, quantity, category) VALUES ('Creme de Leite Dois', 8.25, 'Descrição do Creme de Leite Dois', 19, 'CREME_DE_LEITE');
INSERT INTO tb_product (product_name, price, description, quantity, category) VALUES ('Requeijão Um', 8.6, 'Descrição do Requeijão Um', 6, 'REQUEIJÃO');
INSERT INTO tb_product (product_name, price, description, quantity, category) VALUES ('Requeijão Dois', 12.2, 'Descrição do Requeijão Dois', 9, 'REQUEIJÃO');
INSERT INTO tb_product (product_name, price, description, quantity, category) VALUES ('Leite Condensado Um', 7.7, 'Descrição do Leite Condensado Um', 14, 'LEITE_CONDENSADO');
INSERT INTO tb_product (product_name, price, description, quantity, category) VALUES ('Leite Condensado Dois', 9.1, 'Descrição do Leite Condensado Dois', 13, 'LEITE_CONDENSADO');
INSERT INTO tb_product (product_name, price, description, quantity, category) VALUES ('Doce de Leite Um', 6.3, 'Descrição do Doce de Leite Um', 10, 'DOCE_DE_LEITE');
INSERT INTO tb_product (product_name, price, description, quantity, category) VALUES ('Doce de Leite Dois', 8.4, 'Descrição do Doce de Leite Dois', 12, 'DOCE_DE_LEITE');
INSERT INTO tb_product (product_name, price, description, quantity, category) VALUES ('Doce de Leite Tres', 9.4, 'Descrição do Doce de Leite tres', 12, 'DOCE_DE_LEITE');


INSERT INTO tb_client (name, email, password, role) VALUES ('João Pedro', 'joaopedro@gmail.com', '$2a$10$gNNzbIzg4ruJ4AtLc5ztHuaYz8J9e8ieSlFUcqE0lDR3YGaCSLGBe', 'ROLE_CLIENT');
INSERT INTO tb_client (name, email, password, role) VALUES ('Alex', 'alexcarlos@gmail.com', '$2a$10$gNNzbIzg4ruJ4AtLc5ztHuaYz8J9e8ieSlFUcqE0lDR3YGaCSLGBe', 'ROLE_CLIENT');
INSERT INTO tb_client (name, email, password, role) VALUES ('Fernanda Silva', 'fernandasilva@gmail.com', '$2a$10$gNNzbIzg4ruJ4AtLc5ztHuaYz8J9e8ieSlFUcqE0lDR3YGaCSLGBe', 'ROLE_CLIENT');
INSERT INTO tb_client (name, email, password, role) VALUES ('Sarah Monteiro', 'sarahmonteiro@gmail.com', '$2a$10$gNNzbIzg4ruJ4AtLc5ztHuaYz8J9e8ieSlFUcqE0lDR3YGaCSLGBe', 'ROLE_CLIENT');


INSERT INTO tb_cart (client_id) VALUES (1), (2), (3), (4);


INSERT INTO tb_cart_item (cart_id, product_id, quantity, unit_price, total_price) VALUES (1, 1, 2, 10.0, 20.0);
INSERT INTO tb_cart_item (cart_id, product_id, quantity, unit_price, total_price) VALUES (1, 5, 3, 8.9, 26.7);
INSERT INTO tb_cart_item (cart_id, product_id, quantity, unit_price, total_price) VALUES (3, 4, 1, 34.8, 34.8); 
INSERT INTO tb_cart_item (cart_id, product_id, quantity, unit_price, total_price) VALUES (3, 7, 2, 7.8, 15.6);

-- Pedidos para o mês atual
INSERT INTO tb_order (client_id, date, total_value, order_status) VALUES (1, CURRENT_TIMESTAMP, 119.67, 'SOLICITADO');
INSERT INTO tb_order (client_id, date, total_value, order_status) VALUES (3, CURRENT_TIMESTAMP, 145.90, 'FINALIZADO'); 
INSERT INTO tb_order (client_id, date, total_value, order_status) VALUES (4, CURRENT_TIMESTAMP, 85.30, 'CANCELADO');

-- Pedidos para o mês de Agosto (2024)
INSERT INTO tb_order (client_id, date, total_value, order_status) VALUES (2, '2024-08-02 08:20:00', 160.80, 'CANCELADO');

-- Pedidos para o mês de Setembro (2024)
INSERT INTO tb_order (client_id, date, total_value, order_status) VALUES (2, '2024-09-02 08:20:00', 160.80, 'FINALIZADO');
INSERT INTO tb_order (client_id, date, total_value, order_status) VALUES (2, '2024-09-02 08:20:00', 160.80, 'FINALIZADO');
INSERT INTO tb_order (client_id, date, total_value, order_status) VALUES (2, '2024-09-02 08:20:00', 160.80, 'FINALIZADO');


-- Pedidos para o mês de Outubro (2024)
INSERT INTO tb_order (client_id, date, total_value, order_status) VALUES (2, '2024-10-02 08:20:00', 160.80, 'FINALIZADO');
INSERT INTO tb_order (client_id, date, total_value, order_status) VALUES (3, '2024-10-07 12:10:00', 140.25, 'FINALIZADO');
INSERT INTO tb_order (client_id, date, total_value, order_status) VALUES (4, '2024-10-12 15:30:00', 90.60, 'CANCELADO');
INSERT INTO tb_order (client_id, date, total_value, order_status) VALUES (2, '2024-10-18 09:45:00', 175.90, 'FINALIZADO');
INSERT INTO tb_order (client_id, date, total_value, order_status) VALUES (3, '2024-10-25 14:00:00', 80.00, 'CANCELADO');

-- Pedidos para o mês de Novembro (2024)
INSERT INTO tb_order (client_id, date, total_value, order_status) VALUES (4, '2024-11-01 10:30:00', 125.75, 'FINALIZADO');
INSERT INTO tb_order (client_id, date, total_value, order_status) VALUES (2, '2024-11-05 11:45:00', 195.50, 'FINALIZADO');
INSERT INTO tb_order (client_id, date, total_value, order_status) VALUES (3, '2024-11-10 16:20:00', 85.25, 'CANCELADO');
INSERT INTO tb_order (client_id, date, total_value, order_status) VALUES (4, '2024-11-15 09:10:00', 110.00, 'FINALIZADO');
INSERT INTO tb_order (client_id, date, total_value, order_status) VALUES (2, '2024-11-20 13:30:00', 70.90, 'CANCELADO');

-- Pedidos para o mês de Dezembro (2024)
INSERT INTO tb_order (client_id, date, total_value, order_status) VALUES (3, '2024-12-02 08:40:00', 180.60, 'FINALIZADO');
INSERT INTO tb_order (client_id, date, total_value, order_status) VALUES (4, '2024-12-07 12:50:00', 95.75, 'CANCELADO');
INSERT INTO tb_order (client_id, date, total_value, order_status) VALUES (2, '2024-12-12 15:15:00', 130.25, 'FINALIZADO');
INSERT INTO tb_order (client_id, date, total_value, order_status) VALUES (3, '2024-12-18 10:00:00', 200.00, 'FINALIZADO');
INSERT INTO tb_order (client_id, date, total_value, order_status) VALUES (4, '2024-12-25 14:30:00', 85.90, 'CANCELADO');

-- Pedidos para o mês de Janeiro (2025)
INSERT INTO tb_order (client_id, date, total_value, order_status) VALUES (2, '2025-01-05 10:00:00', 119.67, 'FINALIZADO');
INSERT INTO tb_order (client_id, date, total_value, order_status) VALUES (3, '2025-01-07 11:30:00', 145.90, 'FINALIZADO');
INSERT INTO tb_order (client_id, date, total_value, order_status) VALUES (4, '2025-01-10 14:15:00', 85.30, 'CANCELADO');
INSERT INTO tb_order (client_id, date, total_value, order_status) VALUES (2, '2025-01-15 09:45:00', 200.00, 'FINALIZADO');
INSERT INTO tb_order (client_id, date, total_value, order_status) VALUES (3, '2025-01-20 16:20:00', 90.50, 'CANCELADO');

-- Pedidos para o mês de Fevereiro (2025)
INSERT INTO tb_order (client_id, date, total_value, order_status) VALUES (4, '2025-02-02 12:10:00', 150.75, 'FINALIZADO');
INSERT INTO tb_order (client_id, date, total_value, order_status) VALUES (2, '2025-02-05 08:30:00', 180.25, 'FINALIZADO');
INSERT INTO tb_order (client_id, date, total_value, order_status) VALUES (3, '2025-02-10 17:45:00', 95.60, 'CANCELADO');
INSERT INTO tb_order (client_id, date, total_value, order_status) VALUES (4, '2025-02-15 10:20:00', 120.00, 'FINALIZADO');
INSERT INTO tb_order (client_id, date, total_value, order_status) VALUES (2, '2025-02-20 14:00:00', 75.90, 'CANCELADO');

-- Pedidos para o mês de Março (2025)
INSERT INTO tb_order (client_id, date, total_value, order_status) VALUES (3, '2025-03-01 11:00:00', 130.45, 'FINALIZADO');
INSERT INTO tb_order (client_id, date, total_value, order_status) VALUES (4, '2025-03-05 09:15:00', 110.30, 'FINALIZADO');
INSERT INTO tb_order (client_id, date, total_value, order_status) VALUES (2, '2025-03-10 13:50:00', 85.75, 'CANCELADO');
INSERT INTO tb_order (client_id, date, total_value, order_status) VALUES (3, '2025-03-11 16:30:00', 200.50, 'FINALIZADO');
INSERT INTO tb_order (client_id, date, total_value, order_status) VALUES (4, '2025-03-11 10:45:00', 95.00, 'CANCELADO');


-- Inserir itens nos pedidos

-- Pedido 1
INSERT INTO tb_order_item (order_id, product_id, quantity, unit_price, total_price) VALUES (1, 1, 2, 10.0, 20.0), (1, 3, 1, 5.5, 5.5);

-- Pedido 2
INSERT INTO tb_order_item (order_id, product_id, quantity, unit_price, total_price) VALUES (2, 2, 1, 19.67, 19.67), (2, 5, 2, 8.9, 17.8);

-- Pedido 3
INSERT INTO tb_order_item (order_id, product_id, quantity, unit_price, total_price) VALUES (3, 4, 3, 4.8, 14.4), (3, 6, 1, 11.45, 11.45);

-- Pedido 4
INSERT INTO tb_order_item (order_id, product_id, quantity, unit_price, total_price) VALUES (4, 7, 1, 7.8, 7.8),(4, 8, 2, 13.5, 27.0);

-- Pedido 5
INSERT INTO tb_order_item (order_id, product_id, quantity, unit_price, total_price) VALUES (5, 9, 1, 5.9, 5.9), (5, 10, 3, 8.25, 24.75);

-- Pedido 6
INSERT INTO tb_order_item (order_id, product_id, quantity, unit_price, total_price) VALUES (6, 11, 2, 8.6, 17.2), (6, 12, 1, 12.2, 12.2);

-- Pedido 7
INSERT INTO tb_order_item (order_id, product_id, quantity, unit_price, total_price) VALUES (7, 13, 1, 7.7, 7.7), (7, 14, 2, 9.1, 18.2);

-- Pedido 8
INSERT INTO tb_order_item (order_id, product_id, quantity, unit_price, total_price) VALUES (8, 15, 1, 6.3, 6.3), (8, 16, 2, 8.4, 16.8);

-- Pedido 9
INSERT INTO tb_order_item (order_id, product_id, quantity, unit_price, total_price) VALUES (9, 1, 3, 10.0, 30.0), (9, 2, 1, 19.67, 19.67);

-- Pedido 10
INSERT INTO tb_order_item (order_id, product_id, quantity, unit_price, total_price) VALUES (10, 3, 2, 5.5, 11.0), (10, 4, 1, 4.8, 4.8);

-- Pedido 11
INSERT INTO tb_order_item (order_id, product_id, quantity, unit_price, total_price) VALUES (11, 5, 1, 8.9, 8.9), (11, 6, 2, 11.45, 22.9);

-- Pedido 12
INSERT INTO tb_order_item (order_id, product_id, quantity, unit_price, total_price) VALUES (12, 7, 1, 7.8, 7.8), (12, 8, 1, 13.5, 13.5);

-- Pedido 13
INSERT INTO tb_order_item (order_id, product_id, quantity, unit_price, total_price) VALUES (13, 9, 2, 5.9, 11.8), (13, 10, 1, 8.25, 8.25);

-- Pedido 14
INSERT INTO tb_order_item (order_id, product_id, quantity, unit_price, total_price) VALUES (14, 11, 1, 8.6, 8.6), (14, 12, 3, 12.2, 36.6);

-- Pedido 15
INSERT INTO tb_order_item (order_id, product_id, quantity, unit_price, total_price) VALUES (15, 13, 1, 7.7, 7.7), (15, 14, 2, 9.1, 18.2);

-- Pedido 16
INSERT INTO tb_order_item (order_id, product_id, quantity, unit_price, total_price) VALUES (16, 15, 1, 6.3, 6.3), (16, 16, 1, 8.4, 8.4);

-- Pedido 17
INSERT INTO tb_order_item (order_id, product_id, quantity, unit_price, total_price) VALUES (17, 1, 2, 10.0, 20.0), (17, 2, 1, 19.67, 19.67);

-- Pedido 18
INSERT INTO tb_order_item (order_id, product_id, quantity, unit_price, total_price) VALUES (18, 3, 1, 5.5, 5.5), (18, 4, 2, 4.8, 9.6);

-- Pedido 19
INSERT INTO tb_order_item (order_id, product_id, quantity, unit_price, total_price) VALUES (19, 5, 1, 8.9, 8.9), (19, 6, 1, 11.45, 11.45);

-- Pedido 20
INSERT INTO tb_order_item (order_id, product_id, quantity, unit_price, total_price) VALUES (20, 7, 2, 7.8, 15.6), (20, 8, 1, 13.5, 13.5);

-- Pedido 21
INSERT INTO tb_order_item (order_id, product_id, quantity, unit_price, total_price) VALUES (21, 9, 1, 5.9, 5.9), (21, 10, 2, 8.25, 16.5);

-- Pedido 22
INSERT INTO tb_order_item (order_id, product_id, quantity, unit_price, total_price) VALUES (22, 11, 1, 8.6, 8.6), (22, 12, 1, 12.2, 12.2);

-- Pedido 23
INSERT INTO tb_order_item (order_id, product_id, quantity, unit_price, total_price) VALUES (23, 13, 2, 7.7, 15.4), (23, 14, 1, 9.1, 9.1);

-- Pedido 24
INSERT INTO tb_order_item (order_id, product_id, quantity, unit_price, total_price) VALUES (24, 15, 1, 6.3, 6.3), (24, 16, 2, 8.4, 16.8);

-- Pedido 25
INSERT INTO tb_order_item (order_id, product_id, quantity, unit_price, total_price) VALUES (25, 1, 1, 10.0, 10.0), (25, 2, 1, 19.67, 19.67);

-- Pedido 26
INSERT INTO tb_order_item (order_id, product_id, quantity, unit_price, total_price) VALUES (26, 3, 2, 5.5, 11.0), (26, 4, 1, 4.8, 4.8);

-- Pedido 27
INSERT INTO tb_order_item (order_id, product_id, quantity, unit_price, total_price) VALUES (27, 5, 1, 8.9, 8.9), (27, 6, 1, 11.45, 11.45);

-- Pedido 28
INSERT INTO tb_order_item (order_id, product_id, quantity, unit_price, total_price) VALUES (28, 7, 1, 7.8, 7.8), (28, 8, 2, 13.5, 27.0);

-- Pedido 29
INSERT INTO tb_order_item (order_id, product_id, quantity, unit_price, total_price) VALUES (29, 9, 1, 5.9, 5.9), (29, 10, 1, 8.25, 8.25);

-- Pedido 30
INSERT INTO tb_order_item (order_id, product_id, quantity, unit_price, total_price) VALUES (30, 11, 2, 8.6, 17.2), (30, 12, 1, 12.2, 12.2);

