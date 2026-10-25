# EX01 — HTML, JavaScript e DOM

## Objetivo

Criar uma página HTML simples e utilizar JavaScript para modificar seu conteúdo por meio do DOM.

Este é o primeiro contato prático com a ideia de que o JavaScript executado no navegador pode alterar a página que o usuário está visualizando.

## O que foi construído

O exercício possui uma página com:

- um título;
- um parágrafo;
- um código JavaScript incorporado ao HTML.

O JavaScript localiza o título e modifica seu conteúdo.

## Código

### `index.html`

```html
<h1 id="titulo">Olá, Web!!!</h1>
<p>Estou comecando a entender como a Web funciona.</p>

<script>
    document.querySelector("#titulo").textContent = "Olá, JavaScript!";
</script>
```

## 1. HTML e estrutura da página

O HTML descreve os elementos que fazem parte da página.

Neste exercício temos um título e um parágrafo.

O atributo `id` permite identificar especificamente o elemento que será manipulado pelo JavaScript.

## 2. O navegador e o DOM

Ao carregar o HTML, o navegador interpreta o documento e constrói uma representação estruturada dele: o **DOM (Document Object Model)**.

Podemos pensar no DOM como a representação da página que o JavaScript consegue acessar durante a execução.

Assim, o navegador possui uma estrutura em memória que representa os elementos HTML da página.

## 3. JavaScript acessando o DOM

O JavaScript pode localizar elementos do DOM e modificar suas propriedades.

Neste exercício, o título é localizado e seu conteúdo textual é alterado.

O resultado é que o usuário inicialmente teria:

```text
Olá, Web!!!
```

e, após a execução do JavaScript, passa a visualizar:

```text
Olá, JavaScript!
```

O arquivo HTML não é reescrito. O que mudou foi a representação da página mantida pelo navegador.

## O que observar

Abra a página no navegador e observe:

1. o conteúdo apresentado inicialmente;
2. o conteúdo apresentado depois da execução do JavaScript;
3. o código HTML original;
4. o DOM utilizando as ferramentas de desenvolvedor do navegador.

No DevTools, abra a aba **Elements** e observe que o conteúdo do título foi alterado.

Também é possível utilizar o console para experimentar consultas ao DOM.

## Conceitos introduzidos

- HTML;
- JavaScript no navegador;
- DOM;
- `id`;
- `querySelector`;
- `textContent`;
- manipulação do DOM.

## Ideia central

O navegador transforma o HTML em uma estrutura chamada DOM, e o JavaScript pode acessar e modificar essa estrutura.

A ideia fundamental deste exercício é:

**HTML → DOM → JavaScript → alteração da página**

Nos próximos exercícios, vamos acrescentar interação com o usuário e, posteriormente, comunicação com outros programas por meio de HTTP.