# Aula 01 — Entendendo a Web

## Objetivo

Nesta primeira etapa, vamos construir uma visão prática de como uma aplicação Web funciona.

A ideia não é começar por frameworks ou bibliotecas, mas entender os elementos fundamentais que aparecem por trás deles:

- navegador;
- HTML;
- JavaScript;
- DOM;
- eventos;
- HTTP;
- JSON;
- cliente e servidor;
- APIs.

Ao longo dos exercícios, esses conceitos serão introduzidos gradualmente e conectados entre si.

## 1. O navegador

O navegador é o programa que permite acessar e executar aplicações Web.

Ao acessar uma página, o navegador pode:

- solicitar arquivos a um servidor;
- interpretar HTML;
- construir o DOM;
- executar JavaScript;
- realizar requisições HTTP;
- receber e interpretar dados;
- atualizar a interface apresentada ao usuário.

Por isso, o navegador não é apenas um "visualizador de páginas". Ele também é um ambiente de execução para aplicações Web.

## 2. HTML

HTML descreve a estrutura e o conteúdo da página.

Por exemplo, podemos representar um título:

```html
<h1>Minha aplicação Web</h1>
```

O HTML define elementos como títulos, parágrafos, botões, listas e formulários.

## 3. JavaScript

JavaScript permite adicionar comportamento à página.

Com JavaScript, podemos:

- reagir às ações do usuário;
- alterar elementos da página;
- realizar cálculos;
- fazer requisições;
- receber dados de APIs;
- atualizar a interface sem recarregar toda a página.

Uma forma simples de pensar é:

> HTML define a estrutura; JavaScript define comportamentos e interações.

## 4. DOM

Quando o navegador carrega um documento HTML, ele cria uma representação estruturada desse documento chamada **DOM (Document Object Model)**.

O JavaScript pode acessar e modificar essa representação.

Assim, quando um programa JavaScript altera um texto, cria um elemento ou modifica um atributo, ele está modificando o DOM mantido pelo navegador.

Isso permite que a interface seja atualizada dinamicamente.

## 5. Eventos

Aplicações Web precisam reagir a acontecimentos.

Exemplos:

- usuário clicar em um botão;
- usuário digitar em um campo;
- página terminar de carregar;
- resposta de uma requisição chegar.

Esses acontecimentos são representados por **eventos**.

O JavaScript pode registrar uma função para ser executada quando determinado evento ocorrer.

A ideia geral é:

**ação → evento → JavaScript → alteração da interface**

## 6. HTTP

Quando diferentes partes de uma aplicação Web precisam se comunicar, normalmente utilizamos HTTP.

De forma simplificada:

**cliente → requisição HTTP → servidor**

**cliente ← resposta HTTP ← servidor**

Uma requisição pode solicitar um recurso, enviar dados ou executar alguma operação disponibilizada pelo servidor.

HTTP será retomado nos exercícios seguintes, quando começarmos a trabalhar com APIs.

## 7. JSON

JSON é um formato textual muito utilizado para representar e transportar dados.

Exemplo:

```json
{
    "nome": "Bia",
    "profissao": "Professora"
}
```

JSON é especialmente importante no desenvolvimento Web porque é frequentemente utilizado na comunicação entre frontend e backend.

## 8. Cliente e servidor

Uma aplicação Web normalmente envolve pelo menos dois papéis:

**Cliente**

É o programa que faz a requisição. No nosso contexto, normalmente será o navegador.

**Servidor**

É o programa que recebe requisições e produz respostas.

Essa separação permite que o frontend e o backend tenham responsabilidades diferentes.

## 9. API

Uma API Web disponibiliza recursos e operações para que outros programas possam utilizá-los.

Por exemplo:

```text
GET /api/professoras
```

pode representar uma operação para obter uma coleção de professoras.

O frontend não precisa saber como esses dados são armazenados internamente. Ele conhece a interface oferecida pela API.

Esse conceito será desenvolvido gradualmente nos exercícios.

## Visão geral da aula

A sequência que vamos construir é:

```text
HTML
  ↓
DOM
  ↓
JavaScript
  ↓
Eventos
  ↓
HTTP
  ↓
JSON
  ↓
Cliente ↔ Servidor
  ↓
API
```

Os exercícios não serão independentes. Cada um acrescentará uma peça a essa visão.

## Ideia central

Antes de aprender frameworks, bibliotecas e arquiteturas mais complexas, é importante entender o mecanismo básico sobre o qual essas tecnologias são construídas.

A proposta desta aula é justamente construir essa base por meio de pequenos experimentos práticos.