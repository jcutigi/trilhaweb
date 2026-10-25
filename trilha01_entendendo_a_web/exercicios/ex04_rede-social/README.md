# EX04 — Rede social

## Objetivo

Desenvolver uma aplicação Web simples que simule uma rede social, utilizando HTML, CSS, JavaScript puro, Node.js e PostgreSQL.

O exercício tem como objetivo integrar os conhecimentos adquiridos nos exercícios anteriores, trabalhando com diferentes entidades e suas relações.

## Funcionalidades

A aplicação deverá permitir:

- Criar, editar e excluir publicações.
- Exibir as publicações em ordem cronológica.
- Curtir e remover curtidas de publicações.
- Adicionar e excluir comentários.
- Exibir a quantidade de curtidas e comentários de cada publicação.
- Buscar publicações pelo conteúdo.

A aplicação será utilizada por um único usuário, sem necessidade de cadastro ou autenticação.

## Requisitos técnicos

- Utilizar HTML, CSS e JavaScript puro no frontend.
- Desenvolver uma API utilizando Node.js, sem frameworks.
- Utilizar PostgreSQL para armazenar os dados.
- Implementar as operações por meio de requisições HTTP.
- Separar os arquivos do frontend e do backend.
- Modelar as tabelas necessárias para publicações, comentários e curtidas.

## Organização dos arquivos

```text
ex04_rede_social/
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

Permitir filtrar as publicações por período ou ordenar as publicações por quantidade de curtidas.