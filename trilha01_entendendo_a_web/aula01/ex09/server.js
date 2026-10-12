const http = require("http");
const fs = require("fs");

// Cria o servidor HTTP. A função será executada sempre que uma requisição chegar.
const servidor = http.createServer(function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8000");

    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    
    if (req.method === "OPTIONS") {
        res.writeHead(204); // 204 = resposta sem conteúdo.
        res.end();
        return;
    }

    // POST /api/professores
    if (req.method === "POST" && req.url === "/api/professores") {
        let corpo = "";

        req.on("data", function (parte) {
            corpo += parte;
        });

        req.on("end", function () {

            try{
                const dados = JSON.parse(corpo);
                if (!dados.nome || !dados.area) {
                    res.writeHead(400);

                    res.end(JSON.stringify({
                        erro: "Nome e área são obrigatórios"
                    }));

                    return;
                }

                const conteudo = fs.readFileSync("dados.json", "utf-8");
                const professores = JSON.parse(conteudo);
    
                const novoId = professores.length > 0
                    ? Math.max(...professores.map(function (item) {
                        return item.id;
                    })) + 1
                    : 1;

                const novoProfessor = {
                    id: novoId,
                    nome: dados.nome,
                    area: dados.area
                };
                professores.push(novoProfessor);
    
                const novoConteudo = JSON.stringify(professores, null, 4);

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
    // PUT /api/professores/:id
    // Aqui tratamos uma URL como: /api/professores/3
    } else if (req.method === "PUT" && req.url.startsWith("/api/professores")) {
        const id = Number(req.url.split("/")[3]);

        let corpo = ""
        req.on("data", function(parte) {
            corpo += parte
        });

        req.on("end", function() {
            try {
                const dados = JSON.parse(corpo)

                const dadosArquivo = fs.readFileSync("dados.json", "utf-8");
                const professores = JSON.parse(dadosArquivo);
                const indice = professores.findIndex(function(item) {
                    return item.id === id;
                })
                
                if (indice === -1) {
                    res.writeHead(404);
                    res.end(JSON.stringify({
                        erro: "Professor não encontrado"
                    }));
                    return;
                }

                professores[indice] = {
                    id: id,
                    nome: dados.nome,
                    area: dados.area
                }

                const novoConteudo = JSON.stringify(professores, null, 4);
                fs.writeFileSync("dados.json", novoConteudo);

                // console.log("PUT recebido para o professor", id);
                // console.log("Dados recebidos", dados);
                // console.log("Índice encontrado", indice);
                
                res.writeHead(200);
                res.end(JSON.stringify(professores[indice]));
            } catch (erro) {
                res.writeHead(400);
                res.end(JSON.stringify({
                    erro: "O corpo da requisição deve ser um JSON válido"
                }))
            }
        });

    // GET /api/professores
    // Se não for o POST acima e a URL for /api/professores, buscamos todos os professores no arquivo JSON.
    }  else if (req.method === "DELETE" && req.url.startsWith("/api/professores")) {
        const id = Number(req.url.split("/")[3]);

        const dadosArquivo = fs.readFileSync("dados.json", "utf-8");
        const professores = JSON.parse(dadosArquivo);

        const indice = professores.findIndex(function (item) {
            return item.id === id;
        });

        if (indice === -1) {
            res.writeHead(404);
            res.end(JSON.stringify({
                erro: "Professor não encontrado"
            }));
            return;
        }

        const professorExcluido = professores[indice];

        professores.splice(indice, 1);

        const novoConteudo = JSON.stringify(professores, null, 4);

        fs.writeFileSync("dados.json", novoConteudo);

        res.writeHead(200);
        res.end(JSON.stringify({
            mensagem: "Professor excluído com sucesso",
            professor: professorExcluido
        }));
    } else if (req.method === "GET" && req.url === "/api/professores") {
        const dados = fs.readFileSync("dados.json", "utf-8");

        const professores = JSON.parse(dados);

        res.writeHead(200); // 200 = requisição processada com sucesso.

        res.end(JSON.stringify(professores));

    // GET /api/professores/:id
    } else if (req.method === "GET" && req.url.startsWith("/api/professores/")) {
        const id = Number(req.url.split("/")[3]);

        const dados = fs.readFileSync("dados.json", "utf-8");
        const professores = JSON.parse(dados);

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
// no terminal: 
servidor.listen(3000, function () {
    console.log("Servidor rodando em http://localhost:3000");
});

