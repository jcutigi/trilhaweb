# EX08 — Testando e atualizando uma API com Postman

Neste exercício, continuamos o cadastro de professores desenvolvido no EX07.

O principal objetivo agora é aprender a **testar uma API diretamente**, utilizando o Postman, sem depender do frontend.

Também implementamos a operação `PUT`, permitindo alterar professores existentes.

---

## 1. Objetivos

Neste exercício, aprendemos a:

- utilizar o Postman como cliente HTTP;
- fazer requisições diretamente para uma API;
- diferenciar coleção e recurso;
- entender a relação entre método HTTP e URL;
- utilizar `GET` e `POST` pelo Postman;
- interpretar códigos de status HTTP;
- implementar `PUT` na API;
- receber dados no corpo de uma requisição;
- converter JSON em objeto JavaScript;
- localizar um recurso pelo seu ID;
- alterar dados na memória;
- persistir alterações em um arquivo JSON;
- tratar recursos inexistentes com `404`;
- retornar o recurso atualizado na resposta da API.

---

# 2. O Postman como cliente da API

Até o EX07, nosso frontend era responsável por conversar com a API:

```text
Navegador
    ↓
JavaScript
    ↓
fetch()
    ↓
API
```

Neste exercício, introduzimos o Postman.

O Postman é uma ferramenta que permite enviar requisições HTTP diretamente para um servidor.

Assim, podemos fazer:

```text
Postman
    ↓
HTTP
    ↓
API
```

O frontend não precisa participar.

Isso nos ajuda a perceber que a API é independente da interface gráfica da aplicação.

Podemos ter diferentes clientes utilizando a mesma API:

```text
              ┌──────────────┐
              │  Navegador   │
              └──────┬───────┘
                     │
                     │ HTTP
                     ▼
              ┌──────────────┐
              │              │
              │  API Node.js │
              │              │
              └──────┬───────┘
                     │
                     ▼
                dados.json

              ┌──────────────┐
              │   Postman    │
              └──────┬───────┘
                     │
                     │ HTTP
                     ▼
                    API
```

---

# 3. Primeiro teste: GET

Nossa primeira requisição no Postman foi:

```text
GET http://localhost:3000/api/professores
```

A API respondeu com a lista de professores.

O status retornado foi:

```text
200 OK
```

Isso significa que a requisição foi processada com sucesso.

---

# 4. Requisição HTTP

Uma requisição HTTP possui diferentes partes.

De forma simplificada:

```text
Método
URL
Headers
Body
```

Nem toda requisição precisa de um body.

Por exemplo, nosso `GET`:

```text
GET /api/professores
```

não precisa enviar dados no corpo.

Já o `POST` e o `PUT` utilizados neste exercício enviam JSON no body.

---

# 5. Testando o POST

Também utilizamos o Postman para cadastrar um professor.

A requisição foi:

```text
POST http://localhost:3000/api/professores
```

No Body, utilizamos:

```json
{
    "nome": "Carlos",
    "area": "Inteligência Artificial"
}
```

A API respondeu:

```text
201 Created
```

e retornou o professor criado.

Depois fizemos novamente:

```text
GET /api/professores
```

e confirmamos que o novo professor estava na lista.

Isso demonstrou que o cadastro foi realmente realizado pela API e persistido no `dados.json`.

---

# 6. A API não depende do frontend

Neste exercício, Carlos foi cadastrado utilizando apenas o Postman.

O navegador não participou da operação.

Isso é importante porque mostra que:

> A API pode ser utilizada por diferentes clientes.

Por exemplo:

```text
Frontend Web ──────┐
                   │
Postman ───────────┼──→ API
                   │
Aplicativo Mobile ┘
```

Todos podem utilizar a mesma API, desde que conheçam suas regras.

---

# 7. Coleção e recurso

Também observamos uma diferença importante entre:

```text
/api/professores
```

e:

```text
/api/professores/1
```

A primeira representa a coleção:

```text
/api/professores
```

Ou seja:

> "Os professores."

A segunda representa um recurso específico:

```text
/api/professores/1
```

Ou seja:

> "O professor de ID 1."

Podemos visualizar:

```text
/api/professores
        │
        ├── /1
        ├── /2
        ├── /3
        ├── /4
        └── /5
```

---

# 8. Método HTTP + URL

Descobrimos também que a URL sozinha não determina a operação.

Por exemplo:

```text
GET /api/professores/1
```

significa:

> Consultar o professor 1.

Enquanto:

```text
PUT /api/professores/1
```

significa:

> Alterar o professor 1.

E futuramente teremos:

```text
DELETE /api/professores/1
```

para excluir o professor 1.

Assim, podemos pensar em uma requisição como:

```text
MÉTODO + URL
```

Por exemplo:

```text
GET    /api/professores/1
PUT    /api/professores/1
DELETE /api/professores/1
```

A URL identifica o recurso.

O método HTTP indica a operação que queremos realizar.

---

# 9. Implementando o PUT

O objetivo do `PUT` foi permitir a alteração de um professor existente.

Utilizamos:

```text
PUT /api/professores/1
```

com o seguinte JSON:

```json
{
    "nome": "Beatriz",
    "area": "Computação"
}
```

O servidor precisa realizar várias etapas para processar essa requisição.

---

# 10. Identificando o professor

Primeiro extraímos o ID da URL:

```javascript
const id = Number(req.url.split("/")[3]);
```

Para:

```text
/api/professores/1
```

obtemos:

```text
1
```

---

# 11. Recebendo o corpo da requisição

Assim como no `POST`, o corpo da requisição é recebido por meio dos eventos `data` e `end`:

```javascript
let corpo = "";

req.on("data", function (parte) {
    corpo += parte;
});

req.on("end", function () {
    // corpo completo
});
```

O corpo recebido inicialmente é uma string.

Por isso precisamos convertê-lo para um objeto JavaScript:

```javascript
const dados = JSON.parse(corpo);
```

Temos novamente a transformação:

```text
JSON
  ↓
JSON.parse()
  ↓
Objeto JavaScript
```

---

# 12. Encontrando o professor

Depois de ler o `dados.json`, temos o array de professores.

Para encontrar a posição do professor no array, utilizamos:

```javascript
const indice = professores.findIndex(function (item) {
    return item.id === id;
});
```

O `findIndex()` retorna a posição do elemento.

Por exemplo:

```text
[0] Bia
[1] Alice
[2] Ana
[3] Catarina
[4] Carlos
```

Se procurarmos o professor de ID 1:

```text
indice = 0
```

Se o professor não existir:

```text
indice = -1
```

---

# 13. Tratando professor inexistente

Uma API precisa informar ao cliente quando o recurso solicitado não existe.

Por isso verificamos:

```javascript
if (indice === -1) {
    res.writeHead(404);
    res.end(JSON.stringify({
        erro: "Professor não encontrado"
    }));
    return;
}
```

O cliente recebe:

```text
404 Not Found
```

e:

```json
{
    "erro": "Professor não encontrado"
}
```

O `return` encerra o processamento daquela requisição.

---

# 14. Alterando o professor

Depois de encontrar o professor, podemos substituí-lo pelos novos dados:

```javascript
professores[indice] = {
    id: id,
    nome: dados.nome,
    area: dados.area
};
```

Neste momento, a alteração existe apenas na memória do programa.

Isso é importante.

Temos:

```text
dados.json
    ↓
professores
    ↓
alteração na memória
```

Mas o arquivo ainda não foi alterado.

---

# 15. Persistindo a alteração

Para salvar a alteração no arquivo, transformamos o array novamente em JSON:

```javascript
const novoConteudo = JSON.stringify(
    professores,
    null,
    4
);
```

Depois gravamos o arquivo:

```javascript
fs.writeFileSync("dados.json", novoConteudo);
```

O fluxo completo é:

```text
dados.json
    ↓
JSON.parse()
    ↓
Array JavaScript
    ↓
alteração
    ↓
JSON.stringify()
    ↓
fs.writeFileSync()
    ↓
dados.json atualizado
```

Assim, a alteração deixa de existir apenas na memória e passa a ser persistida.

---

# 16. Retornando o professor atualizado

Depois de atualizar o arquivo, a API retorna o professor alterado:

```javascript
res.writeHead(200);
res.end(JSON.stringify(professores[indice]));
```

Por exemplo:

```json
{
    "id": 1,
    "nome": "Beatriz",
    "area": "Computação"
}
```

O cliente recebe o recurso atualizado.

---

# 17. Códigos de status utilizados

Durante o exercício, trabalhamos principalmente com:

### 200 — OK

A requisição foi processada com sucesso.

Exemplo:

```text
GET /api/professores/1
```

ou:

```text
PUT /api/professores/1
```

### 201 — Created

Um novo recurso foi criado.

Exemplo:

```text
POST /api/professores
```

### 400 — Bad Request

A requisição possui dados inválidos.

Por exemplo, quando tentamos interpretar um corpo que não contém JSON válido.

### 404 — Not Found

O recurso solicitado não existe.

Por exemplo:

```text
PUT /api/professores/999
```

quando não existe um professor com ID 999.

---

# 18. O fluxo completo do PUT

Podemos resumir todo o processo:

```text
Postman
   │
   │ PUT /api/professores/1
   │
   │ {
   │   "nome": "Beatriz",
   │   "area": "Computação"
   │ }
   ▼
server.js
   │
   ├── identifica o método PUT
   │
   ├── extrai o ID
   │
   ├── recebe o body
   │
   ├── JSON.parse()
   │
   ├── lê dados.json
   │
   ├── procura o professor
   │
   ├── verifica se existe
   │
   ├── altera o professor
   │
   ├── JSON.stringify()
   │
   ├── grava dados.json
   │
   └── retorna o professor atualizado
            │
            ▼
         Postman
```

---

# 19. O que aprendemos neste exercício

Ao final do EX08, conseguimos:

- utilizar o Postman;
- enviar requisições HTTP diretamente para uma API;
- testar `GET` e `POST`;
- utilizar `PUT`;
- trabalhar com método HTTP + URL;
- diferenciar coleção e recurso;
- trabalhar com headers e body;
- receber JSON no servidor;
- converter JSON em objeto JavaScript;
- localizar recursos pelo ID;
- alterar dados;
- persistir dados;
- utilizar códigos de status HTTP;
- tratar recursos inexistentes;
- retornar dados ao cliente.

Mais importante que decorar os comandos, começamos a construir um modelo mental:

```text
Cliente
   ↓
HTTP Request
   ↓
API
   ↓
Processamento
   ↓
HTTP Response
   ↓
Cliente
```

O cliente pode ser o navegador, o Postman ou qualquer outro programa capaz de realizar requisições HTTP.

---

# 20. Como executar

Abra um terminal dentro do diretório:

```text
ex08
```

Execute:

```bash
node server.js
```

O servidor será iniciado em:

```text
http://localhost:3000
```

Os testes podem ser realizados pelo Postman.

### GET — listar

```text
GET http://localhost:3000/api/professores
```

### GET — buscar um professor

```text
GET http://localhost:3000/api/professores/1
```

### POST — criar

```text
POST http://localhost:3000/api/professores
```

Body:

```json
{
    "nome": "Carlos",
    "area": "Inteligência Artificial"
}
```

### PUT — alterar

```text
PUT http://localhost:3000/api/professores/1
```

Body:

```json
{
    "nome": "Beatriz",
    "area": "Computação"
}
```

---

# 21. Próximo passo

Ainda falta uma operação importante do CRUD:

```text
CREATE  → POST  ✅
READ    → GET   ✅
UPDATE  → PUT   ✅
DELETE  → DELETE ⏳
```

No próximo exercício, vamos implementar o `DELETE`.

Antes disso, porém, já temos uma API capaz de:

```text
GET
POST
PUT
```

e conseguimos testá-la diretamente pelo Postman, sem depender do frontend.