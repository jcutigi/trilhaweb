# EX07 — Cadastro de Professores com API e JSON

Neste exercício, vamos juntar vários dos conceitos estudados anteriormente para construir uma pequena aplicação Web completa.

A aplicação permite:

- visualizar os professores cadastrados;
- cadastrar um novo professor;
- enviar dados do navegador para uma API;
- receber dados da API;
- persistir os dados em um arquivo JSON;
- atualizar a interface sem recarregar a página.

O exercício utiliza apenas **HTML, CSS, JavaScript e Node.js**, sem frameworks.

---

## 1. Estrutura do exercício

```text
ex07/
├── index.html
├── script.js
├── style.css
├── server.js
└── dados.json
```

Cada arquivo possui uma responsabilidade diferente:

| Arquivo | Responsabilidade |
|---|---|
| `index.html` | Estrutura da página |
| `style.css` | Aparência da página |
| `script.js` | Comportamento do frontend |
| `server.js` | API/backend |
| `dados.json` | Persistência dos dados |

---

# 2. Frontend e backend

Uma das ideias mais importantes deste exercício é entender que **frontend e backend são partes diferentes da aplicação**.

## Frontend

O frontend é executado pelo **navegador**.

Neste exercício, ele é formado por:

```text
index.html
style.css
script.js
```

O `script.js` é JavaScript executado no navegador.

Ele é responsável, por exemplo, por:

- responder aos eventos da página;
- capturar os dados digitados no formulário;
- fazer requisições HTTP;
- receber respostas da API;
- modificar o DOM;
- atualizar a tabela.

O frontend está sendo servido na porta:

```text
http://localhost:8000
```

---

## Backend

O backend é executado pelo **Node.js**.

Neste exercício, ele é representado pelo:

```text
server.js
```

O backend é responsável por:

- receber requisições HTTP;
- interpretar os dados recebidos;
- executar as regras necessárias;
- ler e modificar `dados.json`;
- enviar respostas HTTP para o frontend.

A API está sendo executada na porta:

```text
http://localhost:3000
```

Portanto, temos dois servidores diferentes:

```text
Navegador
   │
   │
   ▼
localhost:8000
   │
   │
   │ requisições HTTP
   ▼
localhost:3000
   │
   ▼
server.js
   │
   ▼
dados.json
```

---

# 3. Por que temos dois servidores?

Pode parecer estranho inicialmente termos:

```text
localhost:8000
```

e:

```text
localhost:3000
```

Mas isso ajuda a perceber que o frontend e o backend são **partes independentes**.

O servidor da porta `8000` entrega os arquivos do frontend.

O servidor da porta `3000` fornece a API.

Assim, o navegador pode fazer uma requisição como:

```text
POST http://localhost:3000/api/professores
```

mesmo estando aberto em:

```text
http://localhost:8000
```

Essa comunicação acontece por meio do protocolo HTTP.

---

# 4. O fluxo do GET

Quando abrimos a página, o `script.js` faz:

```javascript
fetch("http://localhost:3000/api/professores")
```

Esse `fetch()` faz uma requisição:

```text
GET /api/professores
```

O backend recebe a requisição, lê o arquivo:

```text
dados.json
```

e devolve os professores em formato JSON.

O fluxo é:

```text
Navegador
    │
    │ GET /api/professores
    ▼
server.js
    │
    │ lê
    ▼
dados.json
    │
    │ JSON
    ▼
server.js
    │
    │ resposta HTTP
    ▼
Navegador
    │
    │ JavaScript
    ▼
Tabela HTML
```

O frontend recebe os professores e utiliza o DOM para criar as linhas da tabela.

---

# 5. O fluxo do POST

O `POST` é especialmente importante neste exercício porque permite compreender claramente a separação entre frontend e backend.

Imagine que o usuário preencha:

```text
Nome: João
Área: Redes de Computadores
```

e clique em:

```text
Adicionar
```

## 5.1 O formulário dispara o evento

No `script.js` temos:

```javascript
formulario.addEventListener("submit", function(evento) {
```

O navegador dispara o evento `submit`.

Antes de fazer nossa própria requisição, impedimos o comportamento padrão do formulário:

```javascript
evento.preventDefault();
```

Isso evita que o navegador recarregue ou navegue para outra página.

---

## 5.2 O frontend pega os dados

O JavaScript acessa os campos:

```javascript
const inputNome = document.querySelector("#nome");
const inputArea = document.querySelector("#area");
```

e obtém seus valores:

```javascript
inputNome.value
inputArea.value
```

---

## 5.3 O frontend envia uma requisição para o backend

O `script.js` executa:

```javascript
fetch("http://localhost:3000/api/professores", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        nome: inputNome.value,
        area: inputArea.value
    })
})
```

Nesse momento, o frontend está dizendo ao backend:

> "Quero cadastrar este professor."

Por exemplo, o corpo da requisição pode ser:

```json
{
    "nome": "João",
    "area": "Redes de Computadores"
}
```

O `JSON.stringify()` transforma o objeto JavaScript em texto JSON para que ele possa ser enviado na requisição HTTP.

---

# 6. O frontend não cadastra o professor

Este é um ponto conceitual muito importante.

O `script.js` **não modifica o `dados.json`**.

Ele apenas envia uma solicitação para o backend.

O fluxo é:

```text
script.js
   │
   │ "Cadastre este professor"
   ▼
server.js
```

Quem efetivamente realiza o cadastro é o backend.

No `server.js`, temos:

```javascript
professores.push(novoProfessor);
```

e depois:

```javascript
fs.writeFileSync(
    "dados.json",
    novoConteudo
);
```

Portanto:

```text
Frontend
    │
    │ solicita cadastro
    ▼
Backend
    │
    │ altera dados
    ▼
dados.json
```

---

# 7. O backend devolve uma resposta

Depois de cadastrar o professor, o backend envia uma resposta para o navegador.

Por exemplo:

```json
{
    "id": 7,
    "nome": "João",
    "area": "Redes de Computadores"
}
```

No `server.js`, isso é feito com:

```javascript
res.end(JSON.stringify(novoProfessor));
```

O objeto JavaScript é convertido para JSON antes de ser enviado.

---

# 8. O frontend recebe a resposta

Voltamos ao `script.js`.

Depois do `fetch()`, temos:

```javascript
.then(function(resposta) {
    return resposta.json();
})
```

Aqui, `resposta` representa a **resposta HTTP recebida do backend**.

O método:

```javascript
resposta.json()
```

interpreta o corpo da resposta como JSON.

O resultado é convertido novamente em um objeto JavaScript.

Podemos visualizar:

```text
Backend
    │
    │ JSON
    ▼
resposta
    │
    │ resposta.json()
    ▼
objeto JavaScript
```

---

# 9. O segundo `then()`

Depois temos:

```javascript
.then(function(professor) {
```

Agora `professor` representa o objeto JavaScript obtido a partir do JSON enviado pelo backend.

Por exemplo:

```javascript
{
    id: 7,
    nome: "João",
    area: "Redes de Computadores"
}
```

Podemos então utilizar esse objeto no frontend:

```javascript
adicionarProfessorNaTabela(professor);
```

Essa função modifica o DOM e coloca o novo professor na tabela.

É importante perceber:

> **O professor não está sendo cadastrado novamente no frontend.**

O cadastro já foi realizado pelo backend.

O frontend está apenas **representando na tela o resultado do cadastro**.

---

# 10. Visão completa do POST

Todo o processo pode ser resumido assim:

```text
                 NAVEGADOR
                (FRONTEND)
                     │
                     │
                     │ 1. usuário envia formulário
                     ▼
                script.js
                     │
                     │ 2. fetch()
                     │    POST + JSON
                     ▼
                server.js
                (BACKEND)
                     │
                     │ 3. processa dados
                     ▼
                dados.json
                     │
                     │ 4. professor é persistido
                     ▼
                server.js
                     │
                     │ 5. resposta JSON
                     ▼
                script.js
                     │
                     │ 6. resposta.json()
                     ▼
              objeto JavaScript
                     │
                     │ 7. atualiza DOM
                     ▼
                 TABELA
```

Esse fluxo é uma das ideias centrais do desenvolvimento Web:

> **O frontend solicita operações ao backend por meio de HTTP. O backend processa os dados e devolve uma resposta. O frontend utiliza essa resposta para atualizar a interface.**

---

# 11. JSON na comunicação

Neste exercício, JSON aparece nos dois sentidos.

### Enviando para o backend

Usamos:

```javascript
JSON.stringify({
    nome: inputNome.value,
    area: inputArea.value
})
```

Temos:

```text
Objeto JavaScript
       ↓
JSON
       ↓
HTTP
       ↓
Backend
```

### Recebendo do backend

Usamos:

```javascript
resposta.json()
```

Temos:

```text
HTTP
       ↓
JSON
       ↓
Objeto JavaScript
       ↓
Frontend
```

Portanto:

```text
FRONTEND                         BACKEND

Objeto JS
    │
    │ JSON.stringify()
    ▼
   JSON ────────────────►
                          processa
                              │
                              │
   ◄────────────────── JSON
    │
    │ resposta.json()
    ▼
Objeto JS
```

---

# 12. Por que o frontend atualiza a tabela?

Depois que o backend confirma o cadastro, o frontend recebe o professor criado:

```javascript
.then(function(professor) {
    adicionarProfessorNaTabela(professor);
});
```

A função:

```javascript
function adicionarProfessorNaTabela(professor) {
    const tabela = document.querySelector("#tabela-professores");
    const linha = document.createElement("tr");

    linha.innerHTML = `
        <td>${professor.id}</td>
        <td>${professor.nome}</td>
        <td>${professor.area}</td>
    `;

    tabela.append(linha);
}
```

não altera o banco de dados ou o arquivo JSON.

Ela apenas altera o **DOM da página**.

Isso significa que existem duas responsabilidades diferentes:

```text
BACKEND
Responsável pelos dados
        │
        ▼
   dados.json


FRONTEND
Responsável pela interface
        │
        ▼
      DOM
```

Essa separação será ainda mais importante quando substituirmos o `dados.json` por um banco de dados.

---

# 13. Tratamento de erros

O cadastro também possui um:

```javascript
.catch(function(erro) {
    console.error("Erro ao cadastrar professor:", erro);
});
```

Ele permite tratar erros relacionados à execução da requisição, como problemas de comunicação.

É importante observar que um status HTTP como `400` ou `500` não faz automaticamente o `fetch()` cair no `catch`.

O tratamento adequado dos códigos HTTP será aprofundado posteriormente.

---

# 14. CSS

O arquivo `style.css` adiciona apenas uma camada visual à aplicação.

Ele não participa da comunicação com a API.

Temos:

```text
index.html
     │
     ├── style.css
     │
     └── script.js
              │
              │ HTTP
              ▼
          server.js
              │
              ▼
          dados.json
```

O CSS é responsável apenas pela aparência da página.

---

# 15. O que foi aprendido

Neste exercício trabalhamos, na prática, com:

- separação entre frontend e backend;
- servidor Web;
- Node.js;
- API;
- HTTP;
- `GET`;
- `POST`;
- `fetch()`;
- eventos de formulário;
- `preventDefault()`;
- envio de JSON;
- recebimento de JSON;
- `JSON.stringify()`;
- `resposta.json()`;
- manipulação do DOM;
- criação dinâmica de elementos HTML;
- CORS;
- persistência em arquivo JSON;
- códigos de status HTTP;
- comunicação entre aplicações executadas em portas diferentes.

---

# 16. Executando o projeto

É necessário executar dois servidores.

### Backend

Dentro de `ex07`:

```bash
node server.js
```

O backend ficará disponível em:

```text
http://localhost:3000
```

### Frontend

Em outro terminal:

```bash
python3 -m http.server 8000
```

O frontend ficará disponível em:

```text
http://localhost:8000
```

Abra essa URL no navegador.

---

# 17. Resultado

Ao acessar a aplicação, os professores existentes são carregados pela API:

```text
GET /api/professores
```

Ao cadastrar um novo professor, o navegador envia:

```text
POST /api/professores
```

O backend:

1. recebe os dados;
2. valida os dados;
3. gera o ID;
4. adiciona o professor ao array;
5. salva o `dados.json`;
6. devolve o professor criado.

O frontend então:

1. recebe a resposta;
2. converte o JSON para objeto JavaScript;
3. adiciona o professor à tabela;
4. limpa os campos do formulário.

Assim, temos uma pequena aplicação Web completa, com **frontend, backend, API, persistência e interface gráfica**, construída sem frameworks.

---

# Próximo passo

No próximo exercício, vamos continuar exatamente a partir daqui.

O objetivo será completar as operações da API, trabalhando com:

- `PUT` — atualizar um professor;
- `DELETE` — remover um professor;
- interação dessas operações com o frontend.

Depois poderemos substituir o arquivo `dados.json` por um **banco de dados PostgreSQL**, mantendo a mesma ideia de comunicação entre frontend e backend.