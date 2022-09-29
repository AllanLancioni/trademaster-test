# Test Trademaster Node.js

O teste consiste em uma API Node.js construída com a lib Express e utilizando TypeScript.

A API tem como objetivo simular uma loja de **Livros**, **Filmes** e **DVDs (series)**, onde conta com o cadastro de **produtos**, **clientes** e fazer as **transações (de venda e aluguel)** entre eles. 

Para o desenvolvimento da API foi utilizado uma simulação de banco de dados em memória, construído dentro do próprio projeto.

## Conteúdo

O projeto também conta com:
- Um arquivo de configuração para o Insomnia (insomnia.json), o qual é possível de ser carregado no programa
- Documentação em Swagger (utilizando a lib *swagger-express-router*) no endpoint **/api-docs**
- Validação de schemas e tratamento de erros 
- Filtros completos por qualquer tipo de dado via queryParams nos endpoints GET (nome e endereço do cliente e título do produto são filtros via RegExp)
- Filtro de data para transação **minDate** e **maxDate** via querystring em **/transaction**
- Migrations com alguns dados por default no início do projeto
- Cobertura de testes (parcial) com Jest
**ps.** a documentação foi gerada através de um pacote que eu tenho na NPM: [insomnia-to-swagger](https://www.npmjs.com/package/insomnia-to-swagger), um script *(npx)* de conversão do arquivo insomnia para o formato swagger.


## Design Pattern
A abordagem escolhida para a realização do teste foi o modelo POO clássico, onde existe a separação por:
- **Server** -  Arquivo responsável por configuração do servidor e rotas
- **Controllers** - Arquivos (Singletons) responsáveis pelo tratamento de cada uma das requisições recebidas pela rota, tratamento e devolução para a resposta. Responsável também por tratar possíveis erros. 
- **Models** - Interfaces representando cada uma das entidades.
- **DB - Tables** - Representação do que seria feito em um ORM tradicional, validação de schema executado antes da objeto ser salvo no "banco de dados*
- **DB - Migrations** - Representação das migrations em um ORM tradicional 
- 
## Rodando o projeto

Após baixar ou clonar o projeto do github, é necessário instalar as dependências com `npm install`

Para rodar o projeto em dev, basta usar o comando `npm run dev`.

Para rodar o projeto em ambiente de produção, é necessário primeiro usar o comando `npm run dist` para compilar e depois usar `npm start` para executar o projeto.

Para rodar os tests, utilizar o comando `npm test`
*os testes foram configurados com o framework Jest, a cobertura de testes não foi finalizada para todos os endpoints do projeto.*

Ao rodar o projeto, as migrations já são executadas.

*Por padrão o projeto é executado na porta 3000, caso haja necessidade de alteração, configurar no arquivo **.env**. O projeto vem com um arquivo **.env.example** com os parâmetros disponíveis para configuração.

