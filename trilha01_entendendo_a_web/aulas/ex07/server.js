const http = require("http");
const fs = require("fs");

// Cria o servidor HTTP. A função será executada sempre que uma requisição chegar.
const servidor = http.createServer(function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8000");

    // Informa ao navegador que a API aceita o cabeçalho Content-Type. Isso é necessário, por exemplo, quando enviamos JSON em um POST.
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Informa que as respostas da API serão no formato JSON.
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    
    // REQUISIÇÃO OPTIONS — PREFLIGHT DO CORS
    // Antes de algumas requisições, o navegador envia uma requisição OPTIONS para verificar se o servidor permite aquela operação.
    // Por exemplo, antes de um POST com Content-Type: application/json, o navegador pode fazer:
    //     OPTIONS /api/professores
    // Se o servidor permitir, o navegador poderá então realizar o POST.
    if (req.method === "OPTIONS") {
        res.writeHead(204); // 204 = resposta sem conteúdo.
        res.end();
        return;
    }

    // POST /api/professores
    if (req.method === "POST" && req.url === "/api/professores") {
        // O corpo da requisição chega ao servidor em partes. Por isso, começamos com uma string vazia.
        let corpo = "";
        
        // Cada vez que chega uma parte do corpo, adicionamos essa parte à variável "corpo".
        req.on("data", function (parte) {
            corpo += parte;
        });

        // O evento "end" acontece quando todo o corpo da requisição já foi recebido.
        req.on("end", function () {

            try{
                // Converte o texto JSON para um objeto JavaScript.
                const dados = JSON.parse(corpo);
                // Verifica se os campos obrigatórios foram enviados.
                if (!dados.nome || !dados.area) {

                    res.writeHead(400);

                    res.end(JSON.stringify({
                        erro: "Nome e área são obrigatórios"
                    }));

                    return;
                }

                const conteudo = fs.readFileSync("dados.json", "utf-8");
                const professores = JSON.parse(conteudo);
    
                // Encontra o maior ID existente e acrescenta 1. Se não houver nenhum professor, o primeiro ID será 1.
                const novoId = professores.length > 0
                    ? Math.max(...professores.map(function (item) {
                        return item.id;
                    })) + 1
                    : 1;
                // Criamos um novo objeto representando o professor que será adicionado.
                const novoProfessor = {
                    id: novoId,
                    nome: dados.nome,
                    area: dados.area
                };
                professores.push(novoProfessor);
    
                // Converte o array novamente para texto JSON.
                const novoConteudo = JSON.stringify(professores, null, 4);
                // Grava o novo conteúdo no arquivo. O arquivo anterior será substituído pelo conteúdo atualizado.
                fs.writeFileSync("dados.json", novoConteudo);
    
                res.writeHead(201); // 201 = recurso criado.
    
                res.end(JSON.stringify(novoProfessor));
            } catch (erro) {
                console.error("Erro:", erro);
                res.writeHead(400); // 400 = Bad Request - estamos tratando principalmente um JSON inválido enviado pelo cliente
                res.end(JSON.stringify({
                    erro: "O corpo da requisição deve ser um JSON válido"
                }));
            }
        });

    // GET /api/professores
    // Se não for o POST acima e a URL for /api/professores, buscamos todos os professores no arquivo JSON.
    } else if (req.url === "/api/professores") {
        // Lê o conteúdo do arquivo como texto.
        // readFileSync é síncrono: o Node espera a leitura terminar antes de continuar executando o código.
        const dados = fs.readFileSync("dados.json", "utf-8");

        // O arquivo contém JSON, portanto precisamos transformar o texto recebido em um objeto/array JavaScript.
        const professores = JSON.parse(dados);

        res.writeHead(200); // 200 = requisição processada com sucesso.

        // JSON.stringify faz o caminho inverso:
        // transforma o array JavaScript novamente em texto JSON para podermos enviá-lo na resposta HTTP.
        res.end(JSON.stringify(professores));

    // GET /api/professores/:id
    // Aqui tratamos uma URL como:
    //     /api/professores/3
    // O startsWith permite identificar que estamos acessando um professor específica.
    } else if (req.url.startsWith("/api/professores/")) {
        const id = Number(
            req.url.split("/")[3]
        );

        const dados = fs.readFileSync("dados.json", "utf-8");
        const professores = JSON.parse(dados);

        // Procuramos no array um professor cujo ID seja igual ao ID recebido na URL.
        const professor = professores.find(function (item) {
            return item.id === id;
        });

        if (professor) {
            res.writeHead(200); // 200 = encontrada com sucesso.
            res.end(JSON.stringify(professor));
        } else {
            res.writeHead(404); // 404 = recurso não encontrado.

            res.end(JSON.stringify({
                erro: "Professor não encontrado"
            }));
        }
    // QUALQUER OUTRA ROTA
    } else {
        // Se nenhuma das condições anteriores foi satisfeita, significa que não temos uma rota para aquela requisição.
        res.writeHead(404);
        res.end(JSON.stringify({
            erro: "Endpoint não encontrado"
        }));
    }
});


// Inicia o servidor na porta 3000.
servidor.listen(3000, function () {
    console.log("Servidor rodando em http://localhost:3000");
});

