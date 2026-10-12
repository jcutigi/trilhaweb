# EX09 — Excluindo professores com DELETE

Neste exercício, continuamos o cadastro de professores desenvolvido nos exercícios anteriores.

No EX08, implementamos a atualização de professores com `PUT`. Agora, implementamos a exclusão com `DELETE`, completando as quatro operações fundamentais do CRUD na API.

O foco deste exercício é compreender como uma API identifica um recurso, verifica sua existência, remove os dados e persiste a alteração.

---

## 1. Objetivos

Neste exercício, aprendemos a:

- compreender o método HTTP `DELETE`;
- excluir um recurso identificado pelo ID;
- localizar um elemento em um array com `findIndex()`;
- remover um elemento de um array com `splice()`;
- persistir alterações em um arquivo JSON;
- retornar informações sobre a exclusão;
- tratar tentativas de excluir recursos inexistentes;
- testar a API diretamente pelo Postman.

---

## 2. O que é DELETE?

O método HTTP `DELETE` é utilizado para solicitar a exclusão de um recurso.

No nosso cadastro de professores, utilizamos o endpoint:

```text
DELETE /api/professores/2
```

Essa requisição solicita a exclusão do professor cujo ID é `2`.

Observe que não precisamos enviar o nome nem a área do professor. O ID informado na URL identifica o recurso que queremos excluir.

---

## 3. Implementando a rota

No arquivo `server.js`, adicionamos uma condição específica para requisições `DELETE`:

```javascript
} else if (
    req.method === "DELETE" &&
    req.url.startsWith("/api/professores/")
) {
```

A condição verifica duas coisas:

- o método HTTP é `DELETE`;
- a URL corresponde ao padrão utilizado para identificar um professor específico.

Assim, uma requisição `DELETE /api/professores/2` será direcionada para esse bloco.

---

## 4. Extraindo o ID

Para identificar o professor, extraímos o ID da URL:

```javascript
const id = Number(req.url.split("/")[3]);
```

Para a URL:

```text
/api/professores/2
```

obtemos o número `2`.

O ID será utilizado para localizar o professor nos dados armazenados.

---

## 5. Lendo os professores

Como nos exercícios anteriores, os dados estão armazenados no arquivo `dados.json`.

Primeiro, lemos o arquivo e convertemos seu conteúdo para um array JavaScript:

```javascript
const dadosArquivo = fs.readFileSync("dados.json", "utf-8");
const professores = JSON.parse(dadosArquivo);
```

Agora podemos procurar e remover um elemento do array.

---

## 6. Localizando o professor

Utilizamos `findIndex()` para encontrar a posição do professor:

```javascript
const indice = professores.findIndex(function (item) {
    return item.id === id;
});
```

O resultado pode ser:

- um número igual ou maior que zero, quando o professor é encontrado;
- `-1`, quando não existe professor com o ID informado.

Por exemplo, se o professor procurado estiver na primeira posição do array, o resultado será `0`.

É importante distinguir o ID do professor de sua posição no array. O ID identifica o recurso; o índice indica onde ele está armazenado naquele array.

---

## 7. Tratando professor inexistente

Antes de excluir qualquer elemento, verificamos se ele foi encontrado:

```javascript
if (indice === -1) {
    res.writeHead(404);
    res.end(JSON.stringify({
        erro: "Professor não encontrado"
    }));
    return;
}
```

Se o professor não existir, a API responde com:

```text
404 Not Found
```

E retorna um JSON com a mensagem de erro.

O `return` encerra o processamento daquela requisição, impedindo que o código continue tentando excluir um professor inexistente.

---

## 8. Removendo o professor

Quando o professor existe, guardamos seus dados antes de removê-lo:

```javascript
const professorExcluido = professores[indice];
```

Isso permite retornar ao cliente informações sobre o recurso excluído.

Em seguida, removemos o elemento do array:

```javascript
professores.splice(indice, 1);
```

O método `splice()` modifica o próprio array. Nesse caso, remove um elemento a partir da posição indicada por `indice`.

---

## 9. Persistindo a exclusão

Remover um elemento do array altera os dados que estão na memória do programa, mas não modifica automaticamente o arquivo `dados.json`.

Por isso, precisamos gravar o novo conteúdo:

```javascript
const novoConteudo = JSON.stringify(
    professores,
    null,
    4
);

fs.writeFileSync("dados.json", novoConteudo);
```

O fluxo é:

```text
dados.json
    ↓
JSON.parse()
    ↓
Array JavaScript
    ↓
Remoção com splice()
    ↓
JSON.stringify()
    ↓
fs.writeFileSync()
    ↓
dados.json atualizado
```

Assim, o professor deixa de aparecer no arquivo e continuará excluído mesmo depois que o servidor for reiniciado.

---

## 10. Respondendo ao cliente

Depois de persistir a alteração, a API responde com `200 OK` e um JSON contendo uma mensagem e os dados do professor excluído:

```javascript
res.writeHead(200);
res.end(JSON.stringify({
    mensagem: "Professor excluído com sucesso",
    professor: professorExcluido
}));
```

Por exemplo, uma resposta pode ser:

```json
{
    "mensagem": "Professor excluído com sucesso",
    "professor": {
        "id": 2,
        "nome": "Alice",
        "area": "Matemática"
    }
}
```

Os dados apresentados são ilustrativos e dependem do conteúdo do arquivo no momento da requisição.

Neste exercício, escolhemos `200 OK` para que a resposta contenha informações sobre a operação realizada. Também existe o status `204 No Content`, utilizado quando a operação é bem-sucedida e não há conteúdo a retornar.

---

## 11. Testando pelo Postman

### Teste 1 — Excluir um professor existente

Configure a requisição:

```text
Método: DELETE
URL: http://localhost:3000/api/professores/2
```

Não é necessário preencher o Body.

**Resultado esperado:**

- status `200 OK`;
- mensagem de exclusão bem-sucedida;
- dados do professor excluído na resposta.

Depois, faça uma requisição:

```text
GET http://localhost:3000/api/professores
```

Verifique se o professor excluído não aparece mais na lista.

### Teste 2 — Excluir um professor inexistente

Configure:

```text
Método: DELETE
URL: http://localhost:3000/api/professores/999
```

**Resultado esperado:**

```text
404 Not Found
```

Com uma resposta semelhante a:

```json
{
    "erro": "Professor não encontrado"
}
```

Esse teste confirma que a API verifica a existência do recurso antes de removê-lo.

---

## 12. O CRUD da API está completo

CRUD é uma sigla para quatro operações fundamentais de manipulação de dados:

| Operação | Método HTTP | Endpoint |
|---|---|---|
| Create — criar | `POST` | `/api/professores` |
| Read — consultar | `GET` | `/api/professores` |
| Update — atualizar | `PUT` | `/api/professores/1` |
| Delete — excluir | `DELETE` | `/api/professores/1` |

Ao final do EX09, nossa API já consegue realizar as quatro operações.

Entretanto, ainda precisamos integrar todas elas à interface gráfica.

---

## 13. O que aprendemos

Neste exercício, aprendemos a:

- receber requisições `DELETE`;
- identificar recursos pelo ID;
- localizar elementos em um array;
- remover elementos com `splice()`;
- salvar as alterações em um arquivo JSON;
- retornar informações ao cliente;
- utilizar `200 OK` e `404 Not Found`;
- testar o comportamento da API com o Postman.

Mais importante, consolidamos o fluxo de uma operação realizada pelo servidor:

```text
Requisição HTTP
    ↓
Identificação do recurso
    ↓
Verificação de existência
    ↓
Processamento
    ↓
Persistência
    ↓
Resposta HTTP
```

---

## 14. Como executar

Abra um terminal no diretório `ex09` e execute:

```bash
node server.js
```

O servidor será iniciado em:

```text
http://localhost:3000
```

Utilize o Postman para executar os testes descritos anteriormente.

---

## 15. Próximo passo

No EX10, vamos construir um CRUD completo no frontend.

A interface permitirá:

- listar os professores em uma tabela;
- cadastrar novos professores;
- editar professores existentes;
- excluir professores por meio de botões na tabela;
- atualizar a interface após cada operação.

Até aqui, testamos a API diretamente pelo Postman. No próximo exercício, vamos conectar essas operações à interface e compreender como o frontend e o backend trabalham juntos em uma aplicação Web.