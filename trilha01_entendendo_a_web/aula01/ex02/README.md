# EX02 — Eventos e interação

## Objetivo

Fazer a página Web reagir a uma ação do usuário utilizando JavaScript e eventos.

Neste exercício, o usuário clica em um botão e o JavaScript modifica o conteúdo da página.

## O que foi construído

A página possui:

- um título;
- um parágrafo;
- um botão;
- um código JavaScript responsável por reagir ao clique.

Ao clicar no botão, a mensagem apresentada no parágrafo é alterada.

## Código

### `index.html`

```html
<h1>Minha primeira aplicacao Web</h1>

<p id="mensagem">Clique no botao.</p>

<button id="botao">Clique aqui</button>

<script>
    const botao = document.querySelector("#botao");

    botao.addEventListener("click", function () {
        const paragrafo = document.querySelector("#mensagem")
        paragrafo.textContent = "O botão foi clicado!"
    });
</script>
```

## 1. Eventos

Uma aplicação Web precisa reagir às ações realizadas pelo usuário.

Um clique de mouse é um exemplo de evento.

O JavaScript pode registrar uma função que será executada quando determinado evento acontecer.

Neste exercício, o evento utilizado é:

```text
click
```

## 2. Event listener

`addEventListener` permite registrar uma função para responder a um evento de determinado elemento.

A ideia geral é:

**elemento → evento → função executada**

Neste caso:

**botão → clique → JavaScript**

## 3. Callback

A função registrada para ser executada posteriormente é uma função de callback.

Ela não é executada imediatamente quando o código é carregado. Ela será chamada pelo navegador quando o evento ocorrer.

Isso introduz uma característica importante da programação Web:

> parte do código é executada em resposta a acontecimentos futuros.

## 4. Evento modificando o DOM

Depois que o clique acontece, o JavaScript modifica o conteúdo do parágrafo.

Temos, portanto, uma sequência:

```text
usuário
   ↓
clique
   ↓
evento
   ↓
JavaScript
   ↓
DOM
   ↓
interface atualizada
```

## O que observar

Abra a página no navegador e:

1. observe a mensagem inicial;
2. clique no botão;
3. observe a alteração da mensagem;
4. abra o DevTools e observe o elemento no DOM;
5. experimente alterar o texto produzido pelo JavaScript.

## Conceitos introduzidos

- eventos;
- `click`;
- `addEventListener`;
- callback;
- interação com o usuário;
- manipulação do DOM em resposta a eventos.

## Ideia central

Uma aplicação Web não precisa apenas apresentar conteúdo. Ela pode **reagir às ações do usuário**.

A ideia fundamental deste exercício é:

**ação do usuário → evento → JavaScript → alteração do DOM**

No próximo exercício, vamos separar o JavaScript do HTML.