# EX14 — Integração com PostgreSQL

## 1. Introdução

Neste exercício, vamos evoluir a aplicação de cadastro de professores desenvolvida nos exercícios anteriores, substituindo o armazenamento de dados em um arquivo JSON por um banco de dados relacional PostgreSQL.

Até aqui, a API utiliza o arquivo `dados.json` para armazenar os professores cadastrados. Embora essa abordagem seja útil para compreender os fundamentos de uma API e implementar as operações de um CRUD, ela apresenta limitações para aplicações que precisam de persistência estruturada, integridade dos dados e recursos de consulta e atualização oferecidos por um sistema gerenciador de banco de dados.

Neste exercício, vamos configurar um banco de dados PostgreSQL, criar a tabela `professores` e integrar o servidor Node.js ao banco utilizando o pacote `pg`. Também vamos utilizar o pacote `dotenv` para carregar as configurações de conexão a partir de variáveis de ambiente, mantendo as credenciais fora do código-fonte versionado.

A migração será realizada gradualmente. As rotas da API serão modificadas para executar operações SQL no PostgreSQL, substituindo a leitura e a gravação do arquivo JSON. Ao longo desse processo, também revisaremos o tratamento de erros, a validação dos parâmetros recebidos e o uso de consultas SQL parametrizadas.

### 1.1. Por que o frontend não será modificado?

**O frontend permanecerá exatamente como foi desenvolvido no exercício anterior.** Essa decisão é intencional e está relacionada à separação de responsabilidades entre as partes da aplicação.

O frontend se comunica com a API por meio de requisições HTTP. Ele envia dados em formato JSON e recebe respostas também em JSON, utilizando os endpoints e os métodos HTTP definidos anteriormente. A forma como a API armazena os dados é uma responsabilidade interna do backend.

Antes deste exercício, a API obtinha os dados de `dados.json`. Agora, ela consultará e modificará os registros armazenados no PostgreSQL. Apesar dessa mudança interna, o contrato de comunicação entre o frontend e a API será preservado: os endpoints, os métodos HTTP, a estrutura dos dados retornados e os códigos de status esperados continuarão compatíveis com a interface existente.

Essa abordagem demonstra um princípio importante de arquitetura de software: **é possível modificar a implementação interna de um componente sem exigir mudanças nos componentes que dependem dele, desde que sua interface de comunicação seja preservada.**

Assim, o mesmo formulário e a mesma tabela de professores continuarão funcionando sem precisar conhecer o PostgreSQL, executar SQL ou estabelecer uma conexão com o banco. Toda a comunicação com o banco ficará sob responsabilidade do backend.

### 1.2. Arquitetura após a mudança

Ao final do exercício, a aplicação terá três componentes principais:

- **Frontend:** interface responsável por apresentar os dados e permitir o cadastro, a consulta, a atualização e a exclusão de professores.
- **Backend (Node.js):** API HTTP responsável por receber as requisições, validar os dados, executar as operações necessárias e devolver as respostas ao frontend.
- **Banco de dados (PostgreSQL):** componente responsável por armazenar os registros de professores de forma persistente.

O backend continuará utilizando o módulo nativo `http` do Node.js. Neste exercício, não introduziremos um framework web, como Express, pois o foco será compreender a integração entre a API já existente e um banco de dados relacional.

O fluxo de comunicação será:

**Frontend → API Node.js → PostgreSQL**

Com essa mudança, a aplicação deixa de depender do arquivo JSON como mecanismo de persistência e passa a utilizar um banco de dados relacional, mantendo a interface de usuário e a forma de comunicação entre frontend e backend.

## 2. Preparação do ambiente

### 2.1. Instalação e configuração do PostgreSQL

O PostgreSQL é o sistema gerenciador de banco de dados relacional utilizado neste exercício. O ambiente de desenvolvimento foi preparado no Ubuntu, com PostgreSQL 16 e pgAdmin 4.

O pgAdmin é uma ferramenta gráfica que permite administrar o PostgreSQL, executar consultas SQL, visualizar tabelas e inspecionar os dados armazenados.

Após instalar e iniciar o PostgreSQL, configure uma conexão local no pgAdmin com os parâmetros correspondentes à instalação:

- Host: `localhost`
- Porta: `5432`
- Usuário: `postgres`
- Banco de dados: inicialmente, o banco de manutenção ou outro banco disponível para estabelecer a conexão.

A senha deve ser a definida durante a configuração do PostgreSQL.

### 2.2. Criação do banco de dados

No pgAdmin, crie um banco de dados chamado:

```text
cadastro_professores
```

Esse banco será utilizado exclusivamente pela aplicação deste exercício.

### 2.3. Criação da tabela

A tabela `professores` será responsável por armazenar os registros da aplicação.

O comando SQL utilizado está no arquivo `sql/01_criar_tabela_professores.sql`:

```sql
CREATE TABLE professores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    area VARCHAR(100) NOT NULL
);
```

A estrutura contém três colunas:

- `id`: identificador único gerado pelo PostgreSQL. A propriedade `IDENTITY` dispensa a aplicação de calcular o próximo identificador.
- `nome`: nome do professor, obrigatório e limitado a 100 caracteres.
- `area`: área de atuação, também obrigatória e limitada a 100 caracteres.

A chave primária garante a identificação única de cada registro. As restrições `NOT NULL` impedem que as colunas `nome` e `area` recebam valores nulos.

O arquivo SQL é mantido no repositório para registrar a estrutura necessária ao banco e permitir que a tabela seja criada novamente em outro ambiente.

## 3. Preparação do projeto Node.js

A integração com o PostgreSQL exige um driver para que o código JavaScript possa enviar consultas SQL e receber seus resultados. Também precisamos organizar as dependências e as configurações de conexão.

### 3.1. Inicialização do projeto com npm

Dentro da pasta do EX14, foi inicializado um projeto Node.js com:

```bash
npm init -y
```

O npm é o gerenciador de pacotes do ecossistema Node.js. Ele permite instalar bibliotecas, registrar dependências e executar comandos definidos pelo projeto.

Esse comando cria o arquivo `package.json`, que registra informações sobre o projeto, suas dependências e seus scripts.

Também é criado o arquivo `package-lock.json`, que registra a resolução das dependências instaladas, ajudando a reproduzir o ambiente em outras instalações. As bibliotecas instaladas ficam na pasta `node_modules`, que não precisa ser versionada no Git.

### 3.2. Instalação das dependências

Instale os pacotes necessários:

```bash
npm install pg dotenv
```

O pacote `pg` é o driver que permite ao Node.js se comunicar com o PostgreSQL. Ele disponibiliza recursos como `Pool` e `query()`.

O pacote `dotenv` carrega variáveis de ambiente definidas em um arquivo `.env`, tornando possível separar as configurações de conexão do código-fonte.

No `package.json`, foi definido o script de inicialização:

```json
{
    "scripts": {
        "start": "node server.js"
    }
}
```

O arquivo pode conter outras informações e dependências além das mostradas nesse trecho. O script permite iniciar a aplicação com:

```bash
npm start
```

### 3.3. Proteção das credenciais com `.env` e `.gitignore`

As informações necessárias para conectar ao banco são armazenadas em um arquivo `.env`, criado na pasta do EX14:

```dotenv
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cadastro_professores
DB_USER=postgres
DB_PASSWORD=sua_senha
```

Substitua `sua_senha` pela senha configurada no PostgreSQL. O valor é apenas um exemplo; não coloque a senha real no README nem em arquivos públicos.

O arquivo `.gitignore` contém as seguintes regras:

```gitignore
# Dependências instaladas pelo npm
node_modules/

# Arquivos com variáveis de ambiente e credenciais
.env
.env.*

# Permite versionar um modelo sem segredos
!.env.example

# Logs
npm-debug.log*
```

Essas regras impedem que o Git versione o arquivo `.env` e as dependências instaladas. A exceção permite versionar um eventual arquivo `.env.example`, que pode documentar as variáveis necessárias sem conter credenciais reais.

**Importante:** o `.gitignore` evita que arquivos não rastreados sejam adicionados ao Git, mas não remove automaticamente arquivos que já estejam versionados. Credenciais nunca devem ser incluídas em commits.

## 4. Configuração da conexão com o banco

Para não misturar a configuração do banco com o código responsável pelas requisições HTTP, criamos o arquivo `db.js`.

Seu conteúdo é:

```js
require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

module.exports = pool;
```

### 4.1. Carregamento das variáveis de ambiente

A instrução:

```js
require("dotenv").config();
```

carrega as variáveis do arquivo `.env` para `process.env`.

Por exemplo, o valor definido em `DB_NAME` fica disponível em `process.env.DB_NAME`. Assim, as configurações não precisam ser escritas diretamente no código JavaScript.

### 4.2. O pool de conexões

O módulo `pg` fornece a classe `Pool`, utilizada para gerenciar um conjunto de conexões com o PostgreSQL.

```js
const { Pool } = require("pg");
```

Em seguida, criamos uma instância:

```js
const pool = new Pool({
    // configurações de conexão
});
```

O pool administra as conexões utilizadas pelas consultas, evitando que a aplicação precise abrir e encerrar manualmente uma nova conexão para cada operação.

A porta é convertida para número com `Number(process.env.DB_PORT)`, pois os valores das variáveis de ambiente são tratados como texto.

Por fim:

```js
module.exports = pool;
```

permite que outros arquivos, como `server.js`, importem e utilizem o pool.

### 4.3. Teste inicial da conexão

Antes de integrar o banco às rotas, foi criado um arquivo temporário chamado `teste-banco.js` para verificar a conexão.

Uma consulta simples como:

```js
const resultado = await pool.query("SELECT NOW()");
console.log(resultado.rows);
```

permite confirmar que o Node.js consegue executar uma consulta no PostgreSQL.

Em seguida, testamos a tabela:

```js
const resultado = await pool.query(
    "SELECT * FROM professores"
);

console.log(resultado.rows);
```

Quando a tabela ainda não possuía registros, o resultado foi um array vazio. Isso confirmou que a consulta funcionava mesmo sem dados cadastrados.

O arquivo de teste foi útil durante a configuração inicial, mas não faz parte do fluxo normal da API.

## 5. Integração do PostgreSQL à API

Com a conexão funcionando, começamos a migrar as rotas do `server.js`. A estratégia foi substituir uma operação por vez, testar seu funcionamento e somente então avançar para a próxima.

Essa abordagem permite identificar problemas com mais facilidade e preservar o restante da aplicação durante a migração.

### 5.1. Importação do pool

No início de `server.js`, adicionamos:

```js
const pool = require("./db");
```

A partir desse momento, as rotas podem executar consultas SQL por meio de `pool.query()`.

Como o PostgreSQL é acessado de forma assíncrona, as operações que aguardam resultados utilizam `await`. As funções que contêm esses comandos precisam ser declaradas com `async`.

Um detalhe importante aparece nas rotas que recebem o corpo da requisição. No código com o módulo nativo `http`, utilizamos `req.on("end", ...)` para processar os dados quando o recebimento termina. Se o callback desse evento executar uma consulta com `await`, ele também precisa ser declarado como `async`:

```js
req.on("end", async function () {
    // processamento do corpo e consultas assíncronas
});
```

O `async` da função que cria o servidor não torna automaticamente assíncronos os callbacks definidos dentro dela.

### 5.2. GET — listar professores

Endpoint:

```http
GET /api/professores
```

A consulta utilizada é:

```sql
SELECT id, nome, area
FROM professores
ORDER BY id
```

No backend, a consulta é executada com:

```js
const resultado = await pool.query(
    "SELECT id, nome, area FROM professores ORDER BY id"
);
```

O driver retorna um objeto com diversas informações sobre a consulta. Os registros encontrados ficam em `resultado.rows`.

Por isso, a resposta da API é produzida com:

```js
res.writeHead(200);
res.end(JSON.stringify(resultado.rows));
```

O status `200 OK` indica que a consulta foi concluída com sucesso. O frontend continua recebendo um array JSON, como recebia quando os dados vinham do arquivo.

O `ORDER BY id` define a ordem dos registros retornados.

### 5.3. POST — cadastrar professor

Endpoint:

```http
POST /api/professores
```

O corpo da requisição contém os dados do novo professor em JSON:

```json
{
    "nome": "Ana Silva",
    "area": "Computação"
}
```

A rota mantém a leitura do corpo da requisição, a interpretação do JSON e a validação dos campos obrigatórios. Depois, em vez de ler e atualizar `dados.json`, executa uma inserção no banco:

```js
const resultado = await pool.query(
    `INSERT INTO professores (nome, area)
     VALUES ($1, $2)
     RETURNING id, nome, area`,
    [dados.nome.trim(), dados.area.trim()]
);

const novoProfessor = resultado.rows[0];

res.writeHead(201);
res.end(JSON.stringify(novoProfessor));
```

Os marcadores `$1` e `$2` indicam os parâmetros da consulta. Os valores correspondentes são enviados no array passado como segundo argumento de `pool.query()`.

O uso de parâmetros evita a concatenação direta dos dados recebidos com o texto SQL e ajuda a prevenir SQL injection.

O método `trim()` remove espaços em branco no início e no final dos textos. A validação anterior à consulta garante que os campos sejam textos não vazios.

A cláusula `RETURNING` solicita ao PostgreSQL os dados do registro inserido, incluindo o identificador gerado pelo banco. Dessa forma, a API pode devolver o professor cadastrado sem precisar executar outra consulta.

O status `201 Created` indica que um recurso foi criado.

### 5.4. PUT — atualizar professor

Endpoint:

```http
PUT /api/professores/:id
```

O identificador do professor é extraído da URL. Por exemplo, em `/api/professores/3`, o ID é `3`.

Depois da leitura e da validação do JSON, a rota executa:

```js
const resultado = await pool.query(
    `UPDATE professores
     SET nome = $1, area = $2
     WHERE id = $3
     RETURNING id, nome, area`,
    [dados.nome.trim(), dados.area.trim(), id]
);
```

Os parâmetros são associados na ordem em que aparecem no array:

- `$1`: novo nome;
- `$2`: nova área;
- `$3`: ID do professor a ser atualizado.

O `WHERE id = $3` restringe a alteração ao registro solicitado. Sem essa condição, a instrução poderia atualizar todos os registros da tabela.

A cláusula `RETURNING` devolve os dados atualizados. Se `resultado.rows` estiver vazio, nenhum registro corresponde ao ID informado:

```js
if (resultado.rows.length === 0) {
    res.writeHead(404);
    res.end(JSON.stringify({
        erro: "Professor não encontrado"
    }));
    return;
}
```

Caso contrário, a API responde com `200 OK` e o objeto atualizado.

### 5.5. DELETE — excluir professor

Endpoint:

```http
DELETE /api/professores/:id
```

A exclusão é realizada diretamente no banco:

```js
const resultado = await pool.query(
    `DELETE FROM professores
     WHERE id = $1
     RETURNING id, nome, area`,
    [id]
);
```

O parâmetro `$1` recebe o ID informado na URL.

A cláusula `RETURNING` permite recuperar os dados do professor excluído. Se nenhum registro for encontrado, a API responde com `404 Not Found`.

Em caso de sucesso, a resposta mantém a estrutura esperada pela aplicação:

```json
{
    "mensagem": "Professor excluído com sucesso",
    "professor": {
        "id": 3,
        "nome": "Ana Silva",
        "area": "Computação"
    }
}
```

Os valores desse exemplo são ilustrativos. A resposta real contém os dados do registro efetivamente excluído.

### 5.6. GET — consultar professor por ID

Endpoint:

```http
GET /api/professores/:id
```

A consulta de um registro específico utiliza:

```js
const resultado = await pool.query(
    "SELECT id, nome, area FROM professores WHERE id = $1",
    [id]
);
```

A resposta depende do resultado:

- Se o professor existir, a API retorna `200 OK` e `resultado.rows[0]`.
- Se nenhum registro corresponder ao ID, retorna `404 Not Found`.

Assim como nas demais operações, o ID é enviado como parâmetro da consulta SQL.

### 5.7. Validação dos IDs

Nas rotas PUT, DELETE e GET por ID, o valor recebido pela URL é convertido para número:

```js
const id = Number(req.url.split("/")[3]);
```

Essa conversão, por si só, não garante que o resultado seja um identificador válido. Por exemplo, uma URL com o texto `abc` produz `NaN`, enquanto `1.5` resulta em um número que não é inteiro.

Por isso, adicionamos a validação:

```js
if (!Number.isInteger(id) || id <= 0) {
    res.writeHead(400);
    res.end(JSON.stringify({
        erro: "O ID deve ser um número inteiro positivo"
    }));
    return;
}
```

Essa verificação impede que IDs inválidos cheguem às consultas SQL.

É importante distinguir dois casos:

- **ID inválido:** a requisição é malformada e recebe `400 Bad Request`.
- **ID válido, mas inexistente:** a requisição é válida, porém o professor não foi encontrado; a resposta é `404 Not Found`.

## 6. Tratamento de erros e validação

Além de integrar o banco de dados, revisamos o tratamento de erros para que a API forneça respostas mais adequadas a cada situação.

### 6.1. JSON inválido e dados obrigatórios

O corpo das requisições POST e PUT é interpretado com `JSON.parse()`. Se o conteúdo não for um JSON válido, a operação não pode prosseguir.

Os blocos `try/catch` permitem capturar o erro de interpretação e devolver uma resposta apropriada.

No POST e no PUT, o código identifica erros de sintaxe com `erro instanceof SyntaxError` e retorna `400 Bad Request` com a mensagem:

```json
{
    "erro": "O corpo da requisição deve ser um JSON válido"
}
```

A validação dos campos `nome` e `area` continua separada. Quando os valores não são textos válidos ou estão vazios após a remoção dos espaços, a API também retorna `400`.

### 6.2. Falhas internas

Uma falha de conexão ou de execução de uma consulta ao PostgreSQL não significa que o cliente enviou um JSON inválido. Por isso, os erros inesperados das operações de banco recebem `500 Internal Server Error`.

O POST e o PUT foram ajustados para distinguir erros de sintaxe do JSON de outros erros. As rotas de consulta e exclusão também possuem tratamento de exceções, registrando detalhes no terminal do servidor e devolvendo mensagens genéricas ao cliente.

Esse cuidado evita expor detalhes internos do banco na resposta HTTP.

### 6.3. Resumo dos códigos HTTP

| Código | Significado no exercício |
|---|---|
| `200 OK` | Consulta, atualização ou exclusão concluída com sucesso. |
| `201 Created` | Professor cadastrado com sucesso. |
| `204 No Content` | Requisição OPTIONS atendida sem conteúdo de resposta. |
| `400 Bad Request` | JSON inválido, campos obrigatórios inválidos ou ID inválido. |
| `404 Not Found` | Endpoint ou professor solicitado não encontrado. |
| `500 Internal Server Error` | Falha interna inesperada durante uma operação. |

O código HTTP informa o resultado geral da requisição. O corpo JSON complementa essa informação com dados ou uma mensagem de erro.

## 7. Testes da API

Os testes foram realizados tanto com `curl`, para verificar diretamente as respostas HTTP, quanto pela interface web, para confirmar a integração completa.

### 7.1. Iniciar a aplicação

Na pasta do EX14, execute:

```bash
npm start
```

O servidor deve informar que está disponível em:

```text
http://localhost:3000
```

O frontend continua sendo servido separadamente em:

```text
http://localhost:8000
```

### 7.2. Listar professores

```bash
curl -i http://localhost:3000/api/professores
```

A resposta deve conter `200 OK` e um array JSON com os professores cadastrados. Se a tabela estiver vazia, o corpo será `[]`.

### 7.3. Cadastrar professor

```bash
curl -i -X POST http://localhost:3000/api/professores \
  -H "Content-Type: application/json" \
  -d '{"nome":"Ana Silva","area":"Computação"}'
```

A resposta esperada é `201 Created`, acompanhada do registro inserido e do ID gerado pelo PostgreSQL.

### 7.4. Consultar por ID

Use o ID devolvido pelo cadastro:

```bash
curl -i http://localhost:3000/api/professores/1
```

Substitua `1` pelo ID real do registro. Se ele existir, a resposta será `200 OK`.

### 7.5. Atualizar professor

```bash
curl -i -X PUT http://localhost:3000/api/professores/1 \
  -H "Content-Type: application/json" \
  -d '{"nome":"Ana Silva","area":"Engenharia de Software"}'
```

Use o ID real do professor. A resposta esperada é `200 OK`, com os dados atualizados.

### 7.6. Excluir professor

```bash
curl -i -X DELETE http://localhost:3000/api/professores/1
```

Use um ID existente. A resposta esperada é `200 OK`, com uma mensagem de sucesso e os dados do professor excluído.

### 7.7. Testar erros

Para verificar a rejeição de JSON inválido no POST:

```bash
curl -i -X POST http://localhost:3000/api/professores \
  -H "Content-Type: application/json" \
  -d '{"nome": "Teste",'
```

A resposta esperada é `400 Bad Request`.

Para verificar a validação do ID:

```bash
curl -i http://localhost:3000/api/professores/abc
```

A resposta esperada é `400 Bad Request`.

Para consultar um ID positivo que não corresponda a nenhum professor:

```bash
curl -i http://localhost:3000/api/professores/99999
```

Se esse ID não existir, a resposta esperada é `404 Not Found`.

Os IDs usados nos testes devem ser adaptados ao conteúdo atual da tabela. O PostgreSQL controla a geração dos identificadores, que não precisam voltar a um valor anterior depois de exclusões.

### 7.8. Testar pelo frontend

Por fim, acesse `http://localhost:8000` e execute as operações pela interface:

1. Cadastre um professor.
2. Confira se o registro aparece na tabela.
3. Edite seus dados.
4. Consulte ou visualize o registro atualizado.
5. Exclua o professor.
6. Confira se ele desaparece da tabela.

Os testes pela interface foram concluídos com sucesso. Isso confirma que a API continua compatível com o frontend mesmo depois da substituição do mecanismo de persistência.

Também foi realizada uma consulta diretamente no PostgreSQL para confirmar que os registros estavam sendo gravados no banco.

## 8. Resultado e aprendizados

Ao concluir o exercício, a aplicação passou a utilizar o PostgreSQL como mecanismo de persistência. As cinco operações da API — listar, cadastrar, atualizar, excluir e consultar por ID — foram migradas do arquivo JSON para consultas SQL.

Os principais aprendizados são:

- Configurar um banco de dados PostgreSQL para uma aplicação Node.js.
- Utilizar npm para gerenciar as dependências do projeto.
- Utilizar `pg` para executar consultas SQL a partir do JavaScript.
- Organizar a conexão com o banco em um módulo separado.
- Carregar configurações por meio de variáveis de ambiente com `dotenv`.
- Proteger credenciais com regras adequadas no `.gitignore`.
- Executar consultas parametrizadas e compreender a associação entre `$1`, `$2`, `$3` e os valores enviados à consulta.
- Utilizar `INSERT`, `SELECT`, `UPDATE` e `DELETE`, incluindo `RETURNING`.
- Integrar operações assíncronas ao servidor HTTP nativo do Node.js.
- Validar os dados recebidos e distinguir erros de entrada de falhas internas.
- Preservar o contrato da API para manter o frontend inalterado.

O aspecto arquitetural mais importante é que a troca do mecanismo de persistência não exigiu mudanças na interface. Como o backend manteve a forma de comunicação com o frontend, foi possível substituir o arquivo JSON por um banco relacional sem reescrever a aplicação cliente.

Esse princípio será útil em evoluções futuras: quando as responsabilidades estão bem separadas e as interfaces são preservadas, podemos modificar componentes internos sem necessariamente alterar todos os demais componentes do sistema.