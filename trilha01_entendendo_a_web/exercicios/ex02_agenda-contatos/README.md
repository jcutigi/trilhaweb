# EX02 — Agenda de contatos

## Objetivo

Desenvolver uma aplicação Web para gerenciar uma agenda de contatos, utilizando HTML, CSS, JavaScript puro, Node.js e PostgreSQL.

O exercício tem como objetivo praticar a implementação de operações CRUD por meio de uma API e a integração entre frontend, backend e banco de dados.

## Funcionalidades

A aplicação deverá permitir:

- Cadastrar contatos com nome, telefone e e-mail.
- Listar os contatos cadastrados em uma tabela.
- Consultar os dados de um contato.
- Editar um contato existente.
- Excluir um contato.
- Validar os dados informados no formulário.

## Requisitos técnicos

- Utilizar HTML, CSS e JavaScript puro no frontend.
- Desenvolver uma API utilizando Node.js, sem frameworks.
- Utilizar PostgreSQL para armazenar os contatos.
- Implementar as operações CRUD por meio de requisições HTTP.
- Separar os arquivos do frontend e do backend.

## Organização dos arquivos

```text
ex02_agenda_de_contatos/
├── README.md
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
└── backend/
    ├── server.js
    ├── db.js
    ├── package.json
    └── sql/
        └── 01_criar_tabela_contatos.sql
```

## Desafio adicional

Implementar uma busca de contatos por nome, permitindo localizar rapidamente um contato cadastrado.