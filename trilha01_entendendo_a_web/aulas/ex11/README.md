# EX11 — Tratamento de erros e validação

## Objetivo

Neste exercício, aprimoramos a aplicação de cadastro de professores, acrescentando tratamento de erros no frontend e validação dos dados no backend.

O objetivo é compreender que uma aplicação não deve apenas funcionar quando tudo dá certo. Ela também precisa identificar situações inesperadas, impedir dados inválidos e informar quando uma operação não foi concluída.

## 1. Verificando o resultado das requisições HTTP

No frontend, as operações de cadastro e edição utilizam `fetch()` para enviar dados à API.

Inicialmente, o código convertia a resposta para JSON sem verificar se a requisição havia sido bem-sucedida.

Acrescentamos a verificação da propriedade `resposta.ok`:

```javascript
.then(function(resposta) {
    if (!resposta.ok) {
        throw new Error("Erro na requisição: " + resposta.status);
    }

    return resposta.json();
})
```

A propriedade `ok` vale `true` quando o status HTTP está entre 200 e 299.

Quando a resposta indica um erro, a instrução `throw` cria um erro e interrompe a sequência normal dos métodos `.then()` seguintes. Esse erro é encaminhado ao `.catch()`.

É importante observar que `fetch()` não rejeita automaticamente a Promise quando recebe respostas HTTP como `400`, `404` ou `500`. Esses status indicam respostas do servidor, e cabe ao código verificar se a operação foi bem-sucedida.

## 2. Tratando erros com catch

O método `.catch()` permite tratar erros ocorridos durante o processamento da Promise, incluindo os erros gerados por `throw`.

No formulário, utilizamos:

```javascript
.catch(function(erro) {
    console.error("Erro ao salvar professor:", erro);

    mensagem.textContent = erro.message;
});
```

O `console.error()` registra detalhes para facilitar a depuração. Já `mensagem.textContent` apresenta uma mensagem na própria página.

Assim, o usuário não precisa abrir as ferramentas de desenvolvedor para perceber que uma operação falhou.

O tratamento também impede que o código responsável por limpar o formulário e atualizar a tabela seja executado como se a operação tivesse sido concluída com sucesso.

## 3. Limpando mensagens anteriores

Para evitar que uma mensagem antiga continue aparecendo durante uma nova tentativa, acrescentamos ao início do evento `submit`:

```javascript
mensagem.textContent = "";
```

Dessa maneira, cada envio começa sem a mensagem de erro da tentativa anterior.

## 4. Validando os dados no frontend

Antes de enviar o formulário, verificamos se o nome e a área foram preenchidos.

A validação utiliza o método `trim()`, que remove espaços em branco do começo e do fim de uma string.

Isso impede que um campo contendo apenas espaços seja considerado válido.

Quando algum campo está vazio, a aplicação apresenta uma mensagem e utiliza `return` para encerrar o tratamento do evento antes de chamar `fetch()`.

Essa validação melhora a experiência do usuário, pois permite identificar o problema antes de enviar a requisição.

## 5. Validando os dados no backend

A validação no frontend não substitui a validação no backend. Uma pessoa pode enviar requisições diretamente à API, utilizando ferramentas como Postman, sem passar pelo formulário.

No início do exercício, a API já validava os dados recebidos pelo `POST`, mas não aplicava a mesma regra ao `PUT`. Isso permitia atualizar um professor com campos vazios.

Corrigimos essa inconsistência e passamos a validar os dados nas duas operações.

A condição utilizada verifica se os valores são strings e se não estão vazios após a remoção dos espaços:

```javascript
if (
    typeof dados.nome !== "string" ||
    !dados.nome.trim() ||
    typeof dados.area !== "string" ||
    !dados.area.trim()
) {
    res.writeHead(400);

    res.end(JSON.stringify({
        erro: "Nome e área são obrigatórios"
    }));

    return;
}
```

A validação deve aparecer tanto no tratamento do `POST` quanto no tratamento do `PUT`.

### Por que usamos typeof?

O operador `typeof` permite verificar o tipo de um valor.

Como a API espera strings nos campos `nome` e `area`, rejeitamos valores de outros tipos. Isso também evita tentar executar `.trim()` em valores como `null` ou números.

A condição `!dados.nome.trim()` verifica se a string fica vazia depois da remoção dos espaços.

O status HTTP `400` indica que a requisição contém dados inválidos para a operação.

## 6. Por que validar no frontend e no backend?

As duas validações têm finalidades complementares.

- **Frontend:** oferece retorno imediato ao usuário e evita requisições desnecessárias.
- **Backend:** protege a API independentemente da origem da requisição.

O backend não deve confiar que todos os clientes validarão os dados corretamente. Por isso, as regras essenciais precisam ser verificadas no servidor.

## 7. Testando a aplicação

Os testes podem ser divididos entre navegador e Postman.

### No navegador

- Cadastrar um professor com nome e área preenchidos.
- Tentar enviar o formulário com o nome vazio.
- Tentar enviar o formulário com a área vazia.
- Preencher um campo somente com espaços.
- Provocar uma resposta de erro e conferir a mensagem na página.
- Fazer uma nova tentativa e verificar se a mensagem anterior desaparece.

### No Postman

- Enviar um `POST` com dados válidos.
- Enviar um `POST` com campos vazios ou preenchidos somente com espaços.
- Enviar um `PUT` com dados válidos para um professor existente.
- Enviar um `PUT` com campos inválidos e verificar se os dados anteriores são preservados.
- Enviar um `PUT` para um ID inexistente e conferir a resposta `404`.
- Enviar valores que não sejam strings em `nome` e `area`.

As requisições inválidas devem ser rejeitadas com status `400`. Uma tentativa de atualizar um professor inexistente deve retornar `404`.

## 8. Conceitos aprendidos

Neste exercício, trabalhamos com:

- Status HTTP e a propriedade `resposta.ok`.
- Erros gerados com `throw new Error()`.
- Tratamento de erros com `.catch()`.
- Promises e interrupção do fluxo normal de execução.
- Exibição de mensagens no DOM com `textContent`.
- Validação de campos com `trim()`.
- Verificação de tipos com `typeof`.
- Diferenças entre validação no frontend e no backend.
- Uso de status HTTP para indicar falhas.
- Testes de API com Postman.

## Conclusão

Com o EX11, a aplicação passou a tratar melhor as respostas de erro e a rejeitar dados inválidos tanto no frontend quanto no backend.

Essas melhorias tornam o comportamento da aplicação mais previsível e ajudam a evitar alterações indevidas nos dados.

A API continua implementada com os recursos nativos do Node.js, e os dados permanecem armazenados no arquivo `dados.json`.

**Próximo passo:** melhorar as mensagens e a experiência de uso da interface, mantendo a simplicidade do código antes de introduzir novas tecnologias.
