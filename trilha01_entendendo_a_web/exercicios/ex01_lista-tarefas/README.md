# EX01 — Lista de tarefas

## Objetivo

Desenvolver uma aplicação Web simples para gerenciar tarefas, utilizando HTML, CSS e JavaScript puro.

O exercício tem como objetivo praticar a manipulação do DOM, o tratamento de eventos, o uso de JSON e a persistência de dados com `localStorage`.

## Funcionalidades

A aplicação deverá permitir:

- Cadastrar tarefas por meio de um formulário.
- Exibir as tarefas pendentes em uma tabela.
- Marcar uma tarefa como concluída.
- Excluir uma tarefa.
- Exibir uma segunda tabela com as tarefas concluídas e excluídas, identificando a situação de cada uma.
- Manter os dados armazenados mesmo após recarregar a página.

Não será permitido cadastrar tarefas com descrição vazia.

## Requisitos técnicos

Utilizar apenas HTML, CSS e JavaScript puro, sem backend, banco de dados ou frameworks.

Os dados deverão ser armazenados no `localStorage` do navegador, utilizando JSON para sua representação.

## Organização dos arquivos

```text
ex01_lista_de_tarefas/
├── README.md
├── index.html
├── style.css
└── script.js
```

## Desafio adicional

Permitir filtrar o histórico por situação.