# EX04 — Obtendo dados com Fetch e JSON

## Objetivo

Realizar uma requisição HTTP a partir do navegador para obter dados armazenados em um arquivo JSON.

Este exercício introduz uma mudança importante: o JavaScript deixa de trabalhar apenas com o conteúdo já carregado na página e passa a buscar dados externamente.

## Estrutura

```text
ex04/
├── index.html
├── script.js
└── dados.json
```

## O que foi construído

Ao clicar no botão, o JavaScript:

1. atualiza a mensagem da página;
2. realiza uma requisição utilizando `fetch`;
3. recebe uma resposta HTTP;
4. interpreta a resposta como JSON;
5. exibe os dados no console.

## Código

### `dados.json`

```json
{
    "nome": "Bia",
    "profissao": "Professora",
    "linguagem": "JavaScript"
}
```

### `script.js`

```javascript
const botao = document.querySelector("#botao");

botao.addEventListener("click", function () {
    const paragrafo = document.querySelector("#mensagem")
    paragrafo.textContent = "O botão foi clicado!"

    fetch("dados.json")
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (dados) {
            console.log(dados);
        });
});
```

## 1. Requisição HTTP

O navegador pode solicitar recursos utilizando HTTP.

Neste exercício, o recurso solicitado é:

```text
dados.json
```

A ideia geral é:

```text
JavaScript
    ↓
requisição HTTP
    ↓
dados.json
    ↓
resposta HTTP
    ↓
JavaScript
```

## 2. `fetch`

`fetch` é uma API disponível no navegador para realizar requisições.

Ele retorna uma **Promise**, porque a resposta não necessariamente estará disponível imediatamente.

Isso acontece porque uma requisição envolve uma operação que ocorre de forma assíncrona.

Uma Promise representa uma operação cujo resultado estará disponível posteriormente.

## 3. JSON

JSON é um formato textual utilizado para representar dados.

O arquivo contém:

```json
{
    "nome": "Bia",
    "profissao": "Professora",
    "linguagem": "JavaScript"
}
```

A resposta HTTP contém texto JSON, e `resposta.json()` interpreta esse conteúdo para que o JavaScript possa trabalhar com os dados.

## 4. Assincronismo

O código que realiza a requisição não precisa bloquear toda a aplicação enquanto espera a resposta.

Por isso, a sequência é estruturada para indicar o que deve acontecer quando cada etapa terminar.

De forma conceitual:

```text
inicia requisição
       ↓
aguarda resposta
       ↓
interpreta JSON
       ↓
utiliza os dados
```

## 5. Network

O DevTools permite observar a comunicação HTTP.

Ao abrir a aba **Network** e clicar no botão, é possível encontrar a requisição para `dados.json`.

Observe:

- URL;
- método HTTP;
- status da resposta;
- conteúdo da resposta;
- tipo de recurso.

## 6. HTTP e servidor local

Para testar a aplicação corretamente, utilizamos um servidor HTTP local:

```bash
python3 -m http.server 8000
```

A página passa a ser acessada por:

```text
http://localhost:8000
```

em vez de:

```text
file:///...
```

Essa diferença é importante porque estamos começando a trabalhar com o modelo real de uma aplicação Web baseada em HTTP.

## 7. CORS e origem

Durante o exercício, também observamos que o navegador aplica regras de segurança relacionadas à origem das requisições.

Uma origem é definida por:

```text
esquema + host + porta
```

Por exemplo:

```text
http://localhost:8000
http://localhost:3000
```

são origens diferentes porque utilizam portas diferentes.

O mecanismo **CORS (Cross-Origin Resource Sharing)** permite que um servidor informe quais outras origens podem acessar seus recursos.

## O que observar

No DevTools:

1. abra **Network**;
2. clique no botão;
3. localize `dados.json`;
4. observe o método `GET`;
5. observe o status HTTP;
6. examine a resposta;
7. veja os dados no Console.

Também experimente modificar `dados.json`, recarregar a página e observar a nova resposta.

## Conceitos introduzidos

- HTTP;
- requisição e resposta;
- `fetch`;
- Promise;
- assincronismo;
- JSON;
- método `GET`;
- Network;
- servidor HTTP local;
- origem;
- CORS.

## Ideia central

O JavaScript executado no navegador pode **buscar recursos externos por HTTP**.

A sequência fundamental deste exercício é:

**JavaScript → HTTP GET → recurso JSON → resposta → JavaScript**

Nos próximos exercícios, vamos substituir o arquivo JSON como destino da requisição por um programa servidor que fornecerá uma API.
