# Trilha 01 — Entendendo a Web

## Objetivo

Construir uma visão prática de como uma aplicação Web funciona, desde a execução de JavaScript no navegador até a comunicação com um servidor e a persistência dos dados em um banco de dados.

A proposta é compreender os mecanismos fundamentais da Web antes de introduzir frameworks e bibliotecas que abstraem parte de sua complexidade.

Ao longo desta trilha, desenvolvemos uma aplicação de cadastro de professores, evoluindo gradualmente sua estrutura e suas funcionalidades.

## Conteúdos estudados

### 1. Fundamentos do frontend

- Papel do navegador na execução de aplicações Web;
- HTML e estrutura de documentos;
- JavaScript no navegador;
- DOM (*Document Object Model*);
- eventos e interação com o usuário;
- manipulação dinâmica da interface;
- formulários e validação de dados.

### 2. Comunicação na Web

- HTTP e o modelo de requisição e resposta;
- métodos HTTP e códigos de status;
- JSON como formato de representação e transporte de dados;
- cliente e servidor;
- frontend e backend;
- APIs Web;
- CORS e requisições entre origens diferentes;
- ferramentas para testar APIs, como o Postman.

### 3. Desenvolvimento backend

- execução de JavaScript com Node.js;
- criação de um servidor HTTP sem frameworks;
- tratamento de requisições e respostas;
- definição e identificação de rotas;
- recebimento e interpretação de dados enviados pelo cliente;
- operações CRUD;
- validação de dados;
- tratamento de erros;
- organização básica do código backend.

### 4. Persistência de dados

- leitura e gravação de arquivos JSON;
- diferença entre dados em memória e dados persistidos;
- fundamentos de SQL e PostgreSQL;
- conexão entre Node.js e PostgreSQL;
- execução de operações CRUD em um banco de dados relacional;
- configuração da aplicação por variáveis de ambiente.

### 5. Organização do projeto

- separação entre frontend e backend;
- organização de arquivos e responsabilidades;
- gerenciamento de dependências com npm;
- uso de Git e GitHub;
- documentação dos exercícios;
- evolução incremental do código.

## Projeto desenvolvido

Ao longo da trilha, construímos uma aplicação de cadastro de professores.

A aplicação evoluiu de experimentos simples no navegador para uma estrutura com frontend, API própria e banco de dados relacional.

Ao final, temos:

```text
Navegador
    │
    │ HTTP
    ▼
Frontend
HTML + CSS + JavaScript
    │
    │ Requisições HTTP
    ▼
API
Node.js
    │
    │ Consultas SQL
    ▼
PostgreSQL
```

A API disponibiliza operações para listar, consultar, cadastrar, atualizar e excluir professores.

O projeto também utiliza configuração por variáveis de ambiente e possui documentação para orientar sua execução e experimentação.

## Organização da trilha

A trilha está organizada em duas partes complementares.

### `aulas/`

Contém o material didático utilizado para estudar os conceitos, compreender os mecanismos envolvidos e estabelecer as relações entre os diferentes componentes de uma aplicação Web.

### `exercícios/`

Contém as implementações práticas que permitem experimentar os conceitos estudados, acompanhar a evolução da aplicação e consultar o código-fonte.

Cada exercício deve possuir documentação própria, explicando seus objetivos, os conceitos introduzidos e as orientações para execução.

## Resultado esperado

Ao concluir esta trilha, o estudante deve ser capaz de compreender o fluxo básico de uma aplicação Web e explicar o papel de seus principais componentes.

Em particular, deve compreender como:

- o navegador interpreta HTML e executa JavaScript;
- eventos permitem reagir às ações do usuário;
- o frontend envia requisições HTTP;
- uma API recebe requisições e produz respostas;
- o backend valida e processa dados;
- a aplicação consulta e modifica informações no banco de dados;
- diferentes componentes se comunicam para formar uma aplicação completa.

## Próxima etapa

A Trilha 01 estabelece a base para a próxima etapa: **Trilha 02 — Frameworks no desenvolvimento Web**.

Nela, vamos estudar ferramentas como React e Express, comparando suas abstrações com os mecanismos que implementamos nesta trilha.

A intenção é compreender não apenas como utilizar essas tecnologias, mas também quais problemas elas resolvem e quais responsabilidades continuam existindo por trás delas.

## Princípio da trilha

> **Entender primeiro, abstrair depois.**

O objetivo não é apenas construir uma aplicação funcional, mas compreender como ela funciona e por que suas diferentes partes foram organizadas dessa maneira.