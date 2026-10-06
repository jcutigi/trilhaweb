# EX05 — Criando uma API Web

## Objetivo

Criar um servidor HTTP utilizando Node.js e transformá-lo em uma API capaz de responder a diferentes requisições.

Até agora, o navegador estava consumindo um arquivo JSON diretamente. Agora vamos introduzir um programa servidor responsável por produzir as respostas.

## O que foi construído

O exercício utiliza dois servidores:

- **Python**, na porta `8000`, para servir o frontend;
- **Node.js**, na porta `3000`, para disponibilizar a API.

A API possui endpoints diferentes e retorna dados em JSON.

## Servidor Node.js

O servidor utiliza o módulo HTTP nativo do Node.js.

Um exemplo de resposta JSON:

```javascript
const http = require("http");

const servidor = http.createServer(function (req, res) {

    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8000");
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    if (req.url === "/api/pessoa") {

        res.writeHead(200);

        res.end(JSON.stringify({
            nome: "Bia",
            profissao: "Professora",
            linguagem: "JavaScript"
        }));

    } else if (req.url === "/api/profissao") {

        res.writeHead(200);

        res.end(JSON.stringify({
            profissao: "Professora",
            area: "Computação"
        }));

    } else {

        res.writeHead(404);

        res.end(JSON.stringify({
            erro: "Endpoint não encontrado"
        }));
    }
});

servidor.listen(3000, function () {
    console.log("Servidor rodando em http://localhost:3000");
});
```

## 1. Servidor

Um servidor Web é um programa que fica aguardando requisições HTTP e produz respostas.

Neste exercício, o Node.js executa esse papel.

A aplicação pode ser iniciada com:

```bash
node server.js
```

e fica disponível em:

```text
http://localhost:3000
```

## 2. Requisição e resposta

Quando o navegador acessa um endpoint, o servidor recebe uma requisição e decide qual resposta produzir.

Conceitualmente:

```text
Cliente
   │
   │ HTTP Request
   ▼
Servidor
   │
   │ HTTP Response
   ▼
Cliente
```

O objeto `req` representa informações da requisição.

O objeto `res` é utilizado para construir a resposta.

## 3. Endpoints

Uma API pode disponibilizar diferentes recursos por meio de diferentes URLs.

Neste exercício:

```text
GET /api/pessoa
GET /api/profissao
```

são endpoints diferentes.

Cada um pode produzir uma resposta diferente.

## 4. Métodos HTTP

O navegador utiliza métodos HTTP para indicar a intenção da requisição.

Neste exercício utilizamos:

```text
GET
```

O método `GET` é utilizado para solicitar um recurso.

Outros métodos serão estudados posteriormente, especialmente quando implementarmos CRUD:

- `POST`;
- `PUT`;
- `PATCH`;
- `DELETE`.

## 5. Status HTTP

O servidor informa um código de status na resposta.

Utilizamos:

```text
200 OK
```

quando a requisição foi atendida.

E:

```text
404 Not Found
```

quando o endpoint solicitado não existe.

Esses códigos fazem parte do protocolo HTTP e permitem que o cliente saiba, de forma padronizada, o resultado da requisição.

## 6. Content-Type

A resposta informa o tipo do conteúdo utilizando o cabeçalho:

```text
Content-Type
```

Neste exercício:

```text
application/json; charset=utf-8
```

indica que a resposta contém JSON e utiliza codificação UTF-8.

## 7. Frontend e backend

Agora temos uma separação mais clara:

```text
Frontend
HTML + JavaScript
localhost:8000
       │
       │ HTTP
       ▼
Backend / API
Node.js
localhost:3000
```

O frontend não precisa conhecer como a API foi implementada internamente.

Ele conhece os endpoints que pode consultar.

## 8. CORS

Como o frontend e a API estão em portas diferentes, suas origens são diferentes:

```text
http://localhost:8000
http://localhost:3000
```

O servidor Node.js precisa permitir que o frontend faça essas requisições.

Isso é feito, neste exercício, por meio do cabeçalho:

```text
Access-Control-Allow-Origin
```

Esse mecanismo é chamado CORS.

## 9. Dois servidores

Usamos dois servidores por uma razão didática.

O servidor Python representa um servidor simples de arquivos estáticos.

O servidor Node.js representa o backend responsável pela lógica da aplicação e pela API.

Em uma aplicação real, não necessariamente precisaríamos manter esses dois servidores separados dessa forma. Um único servidor também pode servir frontend e API.

## O que observar

Utilize o DevTools e observe:

- requisições feitas pelo frontend;
- URL dos endpoints;
- método HTTP;
- status `200`;
- status `404`;
- conteúdo JSON da resposta;
- cabeçalhos HTTP;
- diferença entre as portas `8000` e `3000`.

Também experimente acessar diretamente no navegador:

```text
http://localhost:3000/api/pessoa
```

e:

```text
http://localhost:3000/api/profissao
```

Depois experimente um endpoint inexistente.

## Conceitos introduzidos

- Node.js como servidor;
- servidor HTTP;
- backend;
- API;
- endpoint;
- requisição e resposta;
- método `GET`;
- status HTTP;
- `Content-Type`;
- frontend e backend;
- CORS;
- múltiplos endpoints.

## Ideia central

Neste exercício, o JSON deixa de ser simplesmente um arquivo que o navegador busca.

Agora existe um programa intermediário:

```text
Frontend
   ↓
HTTP GET
   ↓
API
   ↓
JSON
   ↓
Frontend
```

A API passa a ser uma **interface entre o cliente e os dados**.

No próximo exercício, vamos separar os dados do código da API.
