# ecommerce-laticionios
Este projeto é uma plataforma de e-commerce para a venda de laticínios por encomenda, desenvolvida para um vendedor autônomo.

## Diagrama de Classes

![Diagrama de Classes](CLASSE_UML.png)

# Funcionalidades Implementadas

## Usuário Comum / Cliente
- **Cadastro**: Usuário comum pode se registrar no site.
- **Login**: Cliente que esteja previamente cadastrado no sitema pode realizar o login.
- **Gerenciamento de Dados** - acesso apenas para *Clientes* logados:
  - Visualizar os detalhes de seus dados.
  - Editar seus dados pessoais.
- **Catálogo de Produtos** - acesso para qualquer tipo de *USUÁRIO*:
  - Visualizar o catálogo de produtos disponíveis.
  - Pesquisar produtos por nome.
- **Carrinho de Compras** - acesso apenas para *Clientes* logados:
  - Adicionar produtos ao carrinho.
  - Visualizar os itens do carrinho.
  - Remover produtos do carrinho.
  - Finalizar o pedido com os itens do carrinho.
  - **Pedidos** - acesso apenas para *Clientes* logados:
  - Visualizar todos pedidos feitos.
  - Cancelar um pedido realizado

## Administrador / Produtor
- **Gerenciamento de Produtos**:
  - Registrar novos produtos.
  - Listar todos os produtos.
  - Atualizar informações de produtos pelo ID.
  - Remover produtos pelo ID.
  - Buscar produtos específicos pelo ID.
- **Gerenciamento de Pedidos**:
  - Listar todos os pedidos.
  - Buscar pedidos específicos pelo ID.
  - Listar pedidos filtrados por status.
  - Atualizar o status de um pedido.

---

# Funcionalidades Planejadas
-

## Administrador / Produtor
- **Relatórios de Vendas**:
  - Listar vendas realizadas em um determinado período, incluindo informações como valor total e produtos mais vendidos.
- **Controle de Estoque**:
  - Verificação automatizada que notifica o administrador sobre a quantidade disponível de produtos no estoque.

---

# Rotas

## Qualquer usuário que não precise estar logado
- **/products**  - um método GET que lista todos os produtos
- **/products/{id}**  - método GET que irá listar o detalhe de um produto
- **/products/search?name=** - método GET que lista produtos de acordo com o nome pesquisado
- **/products/list?category=** - método GET que lista produtos de acordo com a categoria pesquisado
- **/auth/register** - método POST para o usuário se registrar
- **/auth/login** - método POST para o usuário logar

## Usuário logado(cliente) que fez o login no sistema e possui o token:
- **/my/profile**  - método GET que lista as informações do cliente 
- **/my/details**  - método POST que atualiza as informações do cliente
- **/cart/add**  - método POST onde o cliente adiciona o item ao seu carrinho
- **/cart**  - método GET que exibe o carrinho do cliente com os itens que estão nele
- **/cart/{productId}**  - método DELETE onde o cliente pode remover o item que está no carrinho 
- **/cart/buy**  - método POST que é responsável por fazer a compra dos itens que estão no carrinho
- **/my/orders**  - método GET que lista as informações de pedidos do cliente
- **/my/orders/details/{orderId}**  - método GET que lista as informações de um pedido
- **/my/orders/remove/{orderId}**  - método DELETE que cancela um pedido que esteja com o status de *SOLICITADO*

## Usuário logado (ADM) que fez o login no sistema e possui o token:
- **/products**  - método POST que insere novos produtos
- **/products/{productId}**  - método PUT que atualiza as informações de um produto
- **/products/{productId}**  - método DELETE que deleta algum produto
- **/products/list-categories**  - método GET que lista todas as categorias existentes, `método auxiliar para ajudar o produtor a escolher a categoria certa definida no sitema ao inserir um produto novo`
- **/orders** - método GET que lista todos os pedidos
- **/orders/{orderId}** - método GET que lista os detalhes de um pedido
- **/orders/search?status=** - método GET que lista todos os pedidos de acordo com o status
- **/orders/{orderId}?status=** - método PUT para atualizar o status de um pedido

---

Este documento será atualizado conforme novas funcionalidades forem implementadas.

---
