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
- frameworks e bibliotecas;
- autenticação e segurança;
- testes;
- arquitetura;
- Docker;
- deploy;
- integração e entrega contínuas.

## Abordagem

A aprendizagem é baseada em pequenos exercícios práticos.

Cada exercício introduz um conceito novo ou amplia um conceito já estudado. Sempre que possível, o trabalho parte do código existente, permitindo observar como uma aplicação evolui ao longo do tempo.

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

O projeto utiliza uma aplicação de cadastro de professores como base para experimentar diferentes tecnologias e formas de organização.

## Organização do projeto

A estrutura é organizada por trilhas, aulas e exercícios:

```text
trilhaweb/
│
├── README.md
│
└── trilha01_entendendo_a_web/
    │
    ├── README.md
    |
    ├── exercicios/
    │
    └── aulas/
        │
        ├── ex01/
        │   ├── README.md
        │   └── ...
        │
        ├── ex02/
        │   ├── README.md
        │   └── ...
        │
        └── ...
```

As próximas trilhas serão acrescentadas seguindo a mesma organização, conforme o conteúdo e a quantidade de exercícios.

Cada exercício possui seu próprio `README.md`, contendo explicações conceituais, o que foi construído, os conceitos introduzidos e orientações para execução e experimentação.

Dessa forma, o repositório funciona simultaneamente como:

- código-fonte;
- laboratório de experimentação;
- documentação;
- material de estudo;
- histórico da evolução do projeto.

## Trilhas de aprendizagem

### Trilha 01 — Entendendo a Web de verdade

**Status: concluída.**

Fundamentos necessários para compreender como uma aplicação Web funciona, desde a interação com o navegador até a persistência dos dados.

Principais conceitos trabalhados:

- HTML, CSS e JavaScript;
- DOM e eventos;
- requisições HTTP;
- JSON;
- cliente e servidor;
- frontend e backend;
- APIs e CORS;
- métodos e códigos de status HTTP;
- operações CRUD;
- Node.js sem frameworks;
- Postman para testar APIs;
- PostgreSQL e SQL;
- conexão entre backend e banco de dados;
- variáveis de ambiente;
- Git e GitHub.

Ao final, foi construída uma aplicação de cadastro de professores com frontend, API própria em Node.js e persistência em PostgreSQL.

[Ver Trilha 01](./trilha01_entendendo_a_web/)

### Trilha 02 — Frameworks no desenvolvimento Web

**Próxima etapa.**

Introdução às abstrações e ferramentas utilizadas no desenvolvimento de aplicações Web modernas, aproveitando a aplicação construída na Trilha 01 como referência.

A ideia é compreender quais problemas os frameworks resolvem e como se relacionam com os mecanismos já estudados.

Conteúdos previstos:

- estrutura de projetos com npm e Vite;
- React;
- componentes;
- propriedades e estado;
- eventos e formulários;
- renderização de interfaces;
- consumo da API existente;
- Express;
- rotas e middleware;
- comparação entre JavaScript puro e frameworks;
- comparação entre a API construída com Node.js puro e uma implementação com Express.

A abordagem continuará incremental: primeiro, a evolução do frontend; depois, a introdução de abstrações no backend.

### Trilha 03 — TypeScript

Introdução à tipagem estática aplicada ao desenvolvimento Web.

Conteúdos previstos:

- tipos primitivos;
- tipos de objetos;
- interfaces;
- funções;
- tipagem de dados recebidos de APIs;
- integração com React e backend;
- diferenças entre JavaScript e TypeScript.

### Trilha 04 — Autenticação e segurança

Introdução aos principais mecanismos de segurança de aplicações Web.

Conteúdos previstos:

- autenticação e autorização;
- identificação de usuários;
- senhas e armazenamento seguro;
- sessões;
- tokens;
- JWT;
- controle de acesso às APIs;
- CORS;
- boas práticas de segurança.

### Trilha 05 — Engenharia da aplicação

Evolução do projeto para uma estrutura mais próxima de aplicações profissionais.

Conteúdos previstos:

- arquitetura;
- separação de responsabilidades;
- organização de módulos;
- validação e tratamento de erros;
- testes automatizados;
- logs;
- configuração;
- variáveis de ambiente;
- qualidade e manutenção do código.

### Trilha 06 — Docker

Introdução à containerização da aplicação.

Conteúdos previstos:

- imagens e containers;
- Dockerfile;
- Docker Compose;
- configuração de ambientes;
- aplicação e banco de dados em containers;
- comunicação entre serviços.

### Trilha 07 — Deploy e CI/CD

Colocação da aplicação em produção e automação do processo de entrega.

Conteúdos previstos:

- hospedagem de frontend e backend;
- configuração de produção;
- variáveis de ambiente;
- deploy;
- integração contínua;
- entrega contínua;
- pipelines;
- execução de testes no processo de integração.

### Trilha 08 — Full-stack e Next.js

Estudo de diferentes formas de estruturar aplicações Web modernas, integrando os conhecimentos desenvolvidos nas trilhas anteriores.

Conteúdos previstos:

- frontend e backend separados;
- aplicações full-stack;
- Next.js;
- renderização no servidor (SSR);
- renderização no cliente;
- rotas e APIs;
- comparação entre arquiteturas;
- vantagens e limitações de diferentes abordagens.

A sequência e o escopo das trilhas poderão ser ajustados conforme as necessidades identificadas durante o desenvolvimento.

## Tecnologias

As tecnologias serão introduzidas progressivamente, conforme os conceitos e os objetivos de cada etapa.

```text
HTML + CSS + JavaScript
          ↓
     HTTP e APIs
          ↓
   Node.js sem framework
          ↓
      PostgreSQL
          ↓
       React
          ↓
       Express
          ↓
     TypeScript
          ↓
Autenticação e testes
          ↓
        Docker
          ↓
     Deploy / CI/CD
          ↓
     Full-stack / Next.js
```

A sequência representa o planejamento geral, não uma dependência rígida entre todas as tecnologias. Sempre que fizer sentido, conceitos já estudados serão reutilizados para facilitar a comparação entre diferentes abordagens.

## Controle de versão

O projeto utiliza Git para registrar a evolução do código e da documentação. O repositório remoto está hospedado no GitHub.

Os commits devem representar etapas significativas do desenvolvimento e da aprendizagem.

Exemplos:

```text
Cria exercícios iniciais da trilha Web
Documenta os fundamentos de HTTP e JSON
Implementa CRUD da API
Integra API com PostgreSQL
Organiza frontend e backend
Adiciona configuração por variáveis de ambiente
```

Credenciais, senhas e outros dados sensíveis não devem ser versionados. Arquivos de configuração de exemplo podem ser utilizados para documentar as variáveis necessárias sem expor valores reais.

## Princípio da trilha

A ideia central desta trilha é:

> **Entender primeiro, abstrair depois.**

Frameworks, bibliotecas e ferramentas são importantes, mas seu uso deve estar apoiado na compreensão dos mecanismos fundamentais da Web.

Por isso, os primeiros exercícios utilizam recursos simples e, somente depois, introduzem abstrações mais sofisticadas.

O objetivo não é apenas conseguir construir uma aplicação, mas compreender **como ela funciona, por que foi organizada dessa maneira e quais alternativas existem**.
