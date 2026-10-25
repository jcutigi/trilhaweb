# EX03 — Gestão de compras

## Objetivo

Desenvolver uma aplicação Web para registrar itens de uma compra, utilizando HTML, CSS, JavaScript puro, Node.js e PostgreSQL.

O exercício tem como objetivo praticar operações com dados relacionados e cálculos realizados a partir das informações cadastradas.

## Funcionalidades

A aplicação deverá permitir:

- Cadastrar itens com nome do produto, quantidade e preço unitário.
- Exibir os itens cadastrados em uma tabela.
- Calcular o valor total de cada item.
- Calcular o valor total da compra.
- Editar e excluir itens da compra.

## Requisitos técnicos

- Utilizar HTML, CSS e JavaScript puro no frontend.
- Desenvolver uma API utilizando Node.js, sem frameworks.
- Utilizar PostgreSQL para armazenar os dados.
- Implementar as operações por meio de requisições HTTP.
- Separar os arquivos do frontend e do backend.

## Organização dos arquivos

```text
ex03_gestao_de_compras/
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
        └── 01_criar_tabelas.sql
```

## Desafio adicional

Permitir alterar a quantidade de um item e atualizar automaticamente seu valor e o total da compra.