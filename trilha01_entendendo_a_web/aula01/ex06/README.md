# EX06 — API utilizando dados externos

## Objetivo

Utilizar um arquivo JSON como fonte de dados de uma API e disponibilizar seus dados por meio de endpoints HTTP.

No exercício anterior, os dados estavam definidos diretamente no código do servidor. Agora vamos separá-los do código da aplicação.

## Estrutura

```text
ex06/
├── index.html
├── server.js
└── dados.json
```

Essa separação antecipa uma ideia importante de sistemas reais:

> o código da aplicação não precisa armazenar diretamente os dados que manipula.

## Dados

O arquivo `dados.json` contém uma coleção de objetos:

```json
[
    {
        "id": 1,
        "nome": "Bia",
        "area": "Computação"
    },
    {
        "id": 2,
        "nome": "Alice",
        "area": "Matemática"
    },
    {
        "id": 3,
        "nome": "Ana",
        "area": "Engenharia de Software"
    },
    {
        "id": 4,
        "nome": "Catarina",
        "area": "Banco de Dados"
    }
]
```

## 1. Código e dados separados

Temos agora duas responsabilidades diferentes:

```text
server.js
    ↓
lógica da aplicação

dados.json
    ↓
dados
```

O servidor sabe como obter e disponibilizar os dados, mas os dados não estão escritos diretamente na lógica do servidor.

## 2. Lendo um arquivo com Node.js

O Node.js fornece o módulo `fs` para trabalhar com arquivos.

O servidor pode ler o conteúdo do JSON:

```javascript
const dados = fs.readFileSync("dados.json", "utf-8");
```

Nesse momento, `dados` é texto.

## 3. `JSON.parse`

Para trabalhar com esse conteúdo como objetos JavaScript, utilizamos:

```javascript
const professoras = JSON.parse(dados);
```

A transformação é:

```text
texto JSON
    ↓
JSON.parse
    ↓
objeto/array JavaScript
```

Isso permite utilizar recursos da linguagem para pesquisar e manipular os dados.

## 4. `JSON.stringify`

Quando o servidor precisa enviar dados JSON na resposta HTTP, fazemos o caminho inverso:

```text
objeto/array JavaScript
    ↓
JSON.stringify
    ↓
texto JSON
    ↓
resposta HTTP
```

Assim, `JSON.parse` e `JSON.stringify` aparecem como operações complementares:

```text
JSON.parse       → JSON textual para JavaScript
JSON.stringify   → JavaScript para JSON textual
```

## 5. Endpoint para coleção

Criamos:

```text
GET /api/professoras
```

Esse endpoint representa a coleção de professoras.

A resposta contém todos os elementos disponíveis.

Conceitualmente:

```text
GET /api/professoras
        ↓
coleção de recursos
```

## 6. Endpoint para um recurso específico

Também criamos:

```text
GET /api/professoras/2
```

O número `2` identifica um recurso específico.

A API procura uma professora cujo `id` seja `2` e retorna esse objeto.

Temos, portanto, uma distinção importante:

```text
/api/professoras
        ↓
coleção

/api/professoras/2
        ↓
recurso específico
```

## 7. Recurso inexistente

Se solicitarmos:

```text
GET /api/professoras/99
```

e não existir uma professora com esse ID, a API responde:

```text
404 Not Found
```

com uma mensagem indicando que o recurso não foi encontrado.

Isso é importante porque uma API não deve apenas retornar dados quando tudo funciona. Ela também precisa comunicar situações de erro de maneira previsível.

## 8. Frontend consumindo a API

O frontend agora não acessa diretamente `dados.json`.

Ele solicita os dados à API:

```text
Frontend
   │
   │ GET /api/professoras
   ▼
API
   │
   │ lê dados.json
   ▼
dados.json
```

Depois, a API retorna os dados ao frontend.

Para obter detalhes de uma professora, o frontend realiza outra requisição:

```text
GET /api/professoras/2
```

A resposta pode então ser apresentada no DOM.

## 9. API como abstração

Este é um dos conceitos mais importantes do exercício.

O frontend não precisa saber que os dados estão em `dados.json`.

Ele conhece apenas a interface oferecida pela API:

```text
GET /api/professoras
GET /api/professoras/:id
```

Hoje a fonte dos dados é um arquivo JSON.

Posteriormente, podemos substituir essa fonte por um banco de dados sem necessariamente mudar a interface consumida pelo frontend.

A ideia pode ser representada assim:

```text
Frontend
    ↓
   API
    ↓
fonte de dados
```

A fonte pode ser:

```text
JSON
Banco de dados
Outro serviço
Arquivo
```

Essa abstração será fundamental quando começarmos a trabalhar com PostgreSQL.

## O que observar

Teste:

```text
http://localhost:3000/api/professoras
```

Depois:

```text
http://localhost:3000/api/professoras/2
```

E finalmente um ID inexistente:

```text
http://localhost:3000/api/professoras/99
```

No frontend, observe que:

1. a lista é obtida pela API;
2. cada professora possui um ID;
3. clicar em uma professora provoca uma nova requisição;
4. o detalhe é obtido pelo endpoint específico;
5. o DOM é atualizado com o resultado.

## Conceitos introduzidos

- separação entre código e dados;
- módulo `fs`;
- leitura de arquivos;
- `JSON.parse`;
- `JSON.stringify`;
- coleção de recursos;
- recurso individual;
- identificador;
- endpoint parametrizado;
- status `404`;
- consumo de API pelo frontend;
- API como abstração da fonte de dados.

## Ideia central

A aplicação cliente não precisa conhecer onde os dados estão armazenados.

Ela solicita recursos à API, e a API é responsável por obter esses dados na fonte utilizada.

Neste exercício:

```text
Frontend
   ↓
API
   ↓
dados.json
```

No próximo exercício, vamos dar um passo importante: em vez de apenas consultar os dados, a API também será capaz de **criá-los, alterá-los e removê-los**.

Isso nos levará ao conceito de **CRUD**.
