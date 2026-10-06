# EX03 — Separação entre HTML e JavaScript

## Objetivo

Separar a estrutura da página do código JavaScript, colocando o comportamento da aplicação em um arquivo externo.

O objetivo não é mudar o que a aplicação faz, mas observar como o código pode ser organizado em arquivos com responsabilidades diferentes.

## Estrutura

```text
ex03/
├── index.html
└── script.js
```

## Código

### `index.html`

```html
<h1>Minha aplicacao Web</h1>

<p id="mensagem">Clique no botao para ver a mágica acontecer!</p>

<button id="botao">Clique aqui</button>

<script src="script.js"></script>
```

### `script.js`

```javascript
const botao = document.querySelector("#botao");

botao.addEventListener("click", function () {
    const paragrafo = document.querySelector("#mensagem")
    paragrafo.textContent = "O botão foi clicado!"
});
```

## 1. Separação de responsabilidades

O HTML descreve a estrutura e o conteúdo da página.

O JavaScript implementa o comportamento e a interação.

Uma organização simples é:

```text
HTML → estrutura e conteúdo
CSS  → apresentação
JS   → comportamento
```

Neste exercício ainda não utilizamos CSS, mas a mesma ideia será importante quando ele for introduzido.

## 2. JavaScript externo

Em vez de colocar o código JavaScript diretamente no HTML, podemos armazená-lo em um arquivo `.js` e referenciá-lo:

```html
<script src="script.js"></script>
```

O navegador então precisa carregar dois recursos:

```text
index.html
script.js
```

Isso é importante para compreender que uma página Web pode ser composta por vários recursos que o navegador solicita e carrega.

## 3. Separação não significa independência

Mesmo estando em outro arquivo, o JavaScript continua executando no contexto da página e pode acessar seu DOM.

Portanto:

```text
index.html
    ↓
DOM
    ↑
script.js
```

O arquivo JavaScript continua podendo localizar elementos e modificar a página.

## O que observar

Abra o DevTools e utilize a aba **Network**.

Recarregue a página e observe que o navegador realiza requisições para carregar os recursos.

Procure especialmente:

- `index.html`;
- `script.js`.

Também observe que retirar ou alterar o arquivo JavaScript modifica o comportamento da página, mas não necessariamente sua estrutura HTML.

## Conceitos introduzidos

- arquivos JavaScript externos;
- atributo `src`;
- separação de responsabilidades;
- carregamento de recursos pelo navegador;
- HTML, CSS e JavaScript como responsabilidades distintas;
- aba Network do DevTools.

## Ideia central

Separar HTML e JavaScript **não muda o que o JavaScript consegue fazer**.

A principal mudança é de organização:

**HTML define a estrutura; JavaScript implementa o comportamento.**

Nos próximos exercícios, vamos começar a observar a comunicação entre aplicações Web.
