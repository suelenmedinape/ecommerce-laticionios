# ecommerce-laticionios
Este projeto é uma plataforma de e-commerce para a venda de laticínios por encomenda, desenvolvida para um vendedor autônomo.

## Diagrama de Classes

![Diagrama de Classes](CLASSE_UML.png)

## Funcionalidades que o sistema possue ate agora:
### Usuario comum / Cliente
* Usuario comum se cadastrar no site;
* Cliente visualizar os detalhes dos seus dados;
* Cliente poder editar algum dado;
* Cliente/usuario comum poder visualizar o catlogo de produtos;
* Client/usuario comum poder pesquisar algum produto por nome;
* Cliente poder adicionar algum produto ao seu carrinho;
* Cliente poder visualizar o seu carrinho e os produtos que foram adicionados ao carrinho;
* Cliente poder remover algum produto do seu carrinho;
* Cliente poder finalizar o pedido dos items que estão no carrinho;

### ADM / Produtor
* Registrar produtos;
* Listar todos os produtos;
* Atualizar algum produto pelo *ID*;
* Deletar algum produto pelo *ID*;
* Encontrar algum produto pelo *ID* caso seja necessario;
* Listar todos os pedidos;
* Encontrar algum pedido pelo *ID*;
* Listar todos os pedios pelo status;
* Atualizar o status de algum pedido;


## Funcionalidades para adicionar:
###  Usuario comum / Cliente
* Cliente poder realizar login(incluir validações);
* Cliente poder saber o andamento do seu pedido;

### ADM / Produtor
* Listar vendas que foram feitas em um determinado periodo, trazendo informações como, valor total, talvez os produtos mais vendidos... etc;
* Uma verificação de rotina que possa informar o produtor sobre a quantidade de algum produto em estoque;
