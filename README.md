# Trilha Web

Trilha de aprendizagem prática para compreender e desenvolver aplicações Web modernas, partindo dos fundamentos da Web e avançando gradualmente até uma aplicação completa.

A proposta é aprender os conceitos **construindo um projeto**, registrando o código, os experimentos e as explicações no próprio repositório.

## Objetivo

Construir uma visão sólida sobre o desenvolvimento Web, compreendendo não apenas o uso de frameworks e ferramentas, mas principalmente os conceitos que estão por trás deles.

A trilha parte dos fundamentos e evolui progressivamente para:

- desenvolvimento frontend;
- desenvolvimento backend;
- APIs;
- bancos de dados;
- autenticação;
- testes;
- arquitetura;
- Docker;
- deploy;
- integração e entrega contínuas.

## Abordagem

A aprendizagem é baseada em pequenos exercícios práticos.

Cada exercício introduz um conceito novo ou amplia um conceito já estudado.

O ciclo de trabalho é:

```text
Estudar
   ↓
Experimentar
   ↓
Implementar
   ↓
Testar
   ↓
Documentar
   ↓
Commit
   ↓
Próximo passo
```

Os exercícios são deliberadamente incrementais. A ideia é evitar esconder conceitos importantes atrás de frameworks ou abstrações antes de compreender seus fundamentos.

## Organização do projeto

A estrutura do projeto é organizada por trilhas, aulas e exercícios:

```text
trilhaweb/
│
├── README.md
│
└── trilha01_entendendo_a_web/
    │
    ├── README.md
    │
    └── aula01/
        │
        ├── ex01/
        │   ├── README.md
        │   └── ...
        │
        ├── ex02/
        │   ├── README.md
        │   └── ...
        │
        ├── ex03/
        │   ├── README.md
        │   └── ...
        │
        └── ...
```

Cada exercício possui seu próprio `README.md`, contendo a explicação conceitual, o que foi construído, os conceitos introduzidos e orientações para execução e experimentação.

Dessa forma, o repositório funciona simultaneamente como:

- código-fonte;
- laboratório de experimentação;
- documentação;
- material de estudo;
- histórico da evolução do projeto.

## Trilhas planejadas

### Trilha 01 — Entendendo a Web de verdade

Fundamentos necessários para compreender como uma aplicação Web funciona.

Principais conceitos:

- navegador;
- HTML;
- DOM;
- JavaScript;
- eventos;
- HTTP;
- JSON;
- cliente e servidor;
- APIs;
- frontend e backend;
- CORS.

[Ver Trilha 01](./trilha01_entendendo_a_web/)

### Trilha 02 — Backend com Node.js

Desenvolvimento de aplicações backend utilizando Node.js.

Conteúdos previstos:

- Node.js;
- Express;
- organização de APIs;
- rotas;
- middleware;
- tratamento de erros;
- arquitetura básica de backend.

### Trilha 03 — PostgreSQL e persistência

Substituição das fontes de dados utilizadas nos exercícios por um banco de dados relacional.

Conteúdos previstos:

- PostgreSQL;
- SQL;
- modelagem;
- conexão entre aplicação e banco;
- CRUD persistente;
- transações.

### Trilha 04 — React

Desenvolvimento de interfaces utilizando React.

Conteúdos previstos:

- componentes;
- estado;
- propriedades;
- eventos;
- formulários;
- consumo de APIs;
- organização de aplicações frontend.

### Trilha 05 — TypeScript

Introdução à tipagem estática aplicada ao desenvolvimento Web.

Conteúdos previstos:

- tipos;
- interfaces;
- tipos de objetos;
- funções;
- integração com React e backend.

### Trilha 06 — Autenticação e segurança

Introdução aos principais mecanismos de segurança de aplicações Web.

Conteúdos previstos:

- autenticação;
- autorização;
- sessões;
- tokens;
- senhas;
- JWT;
- CORS;
- boas práticas de segurança.

### Trilha 07 — Engenharia da aplicação

Evolução do projeto para uma estrutura mais próxima de aplicações profissionais.

Conteúdos previstos:

- arquitetura;
- separação de responsabilidades;
- testes;
- tratamento de erros;
- logs;
- configuração;
- variáveis de ambiente.

### Trilha 08 — Docker

Introdução à containerização da aplicação.

Conteúdos previstos:

- imagens;
- containers;
- Dockerfile;
- Docker Compose;
- aplicação + banco de dados.

### Trilha 09 — Deploy e CI/CD

Colocação da aplicação em produção e automação do processo de entrega.

Conteúdos previstos:

- deploy;
- ambientes;
- integração contínua;
- entrega contínua;
- pipelines;
- configuração de produção.

### Trilha 10 — Full-stack e Next.js

Ao final, serão comparadas diferentes formas de estruturar aplicações Web modernas.

Entre os temas:

- frontend e backend separados;
- aplicações full-stack;
- Next.js;
- server-side rendering;
- comparação entre arquiteturas.

## Tecnologias

A trilha deverá utilizar progressivamente tecnologias como:

```text
HTML
CSS
JavaScript
        ↓
Node.js
        ↓
Express
        ↓
PostgreSQL
        ↓
React
        ↓
TypeScript
        ↓
Docker
        ↓
Deploy / CI/CD
```

As tecnologias podem ser introduzidas gradualmente conforme os conceitos exigirem.

## Controle de versão

O projeto utiliza Git para registrar a evolução do código e da documentação.

O repositório remoto está hospedado no GitHub.

A intenção é que os commits representem etapas significativas do desenvolvimento e da aprendizagem.

Exemplo:

```text
Cria exercícios iniciais da trilha Web
Adiciona documentação dos exercícios da aula 01
Implementa CRUD da API
Integra API com PostgreSQL
...
```

## Princípio da trilha

A ideia central desta trilha é:

> **Entender primeiro, abstrair depois.**

Frameworks, bibliotecas e ferramentas são importantes, mas seu uso deve estar apoiado na compreensão dos mecanismos fundamentais da Web.

Por isso, os primeiros exercícios utilizam recursos simples e, somente depois, introduzem abstrações mais sofisticadas.