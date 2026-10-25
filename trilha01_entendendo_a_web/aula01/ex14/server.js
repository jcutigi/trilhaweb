const http = require("http");
const pool = require("./db");

// Cria o servidor HTTP. A função será executada sempre que uma requisição chegar.
const servidor = http.createServer(async function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8000");

    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    
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

        req.on("end", async function () {

            try{
                const dados = JSON.parse(corpo);
                if (typeof dados.nome !== "string" || !dados.nome.trim() ||
                    typeof dados.area !== "string" || !dados.area.trim()) {
                    res.writeHead(400);

                    res.end(JSON.stringify({
                        erro: "Nome e área são obrigatórios (Ambos em formato texto)"
                    }));

                    return;
                }

                const resultado = await pool.query(
                    `INSERT INTO professores (nome, area)
                    VALUES ($1, $2)
                    RETURNING id, nome, area`,
                    [dados.nome.trim(), dados.area.trim()]
                );

                const novoProfessor = resultado.rows[0];

                res.writeHead(201);
                res.end(JSON.stringify(novoProfessor));

            } catch (erro) {
                console.error("Erro ao cadastrar professor:", erro);

                if (erro instanceof SyntaxError) {
                    res.writeHead(400);
                    res.end(JSON.stringify({
                        erro: "O corpo da requisição deve ser um JSON válido"
                    }));
                    return;
                }

                res.writeHead(500);
                res.end(JSON.stringify({
                    erro: "Erro interno ao cadastrar professor"
                }));
            }
        });
    // PUT /api/professores/:id
    // Aqui tratamos uma URL como: /api/professores/3
    } else if (req.method === "PUT" && req.url.startsWith("/api/professores")) {
        const id = Number(req.url.split("/")[3]);

        if (!Number.isInteger(id) || id <= 0) {
            res.writeHead(400);
            res.end(JSON.stringify({
                erro: "O ID deve ser um número inteiro positivo"
            }));
            return;
        }

        let corpo = ""
        req.on("data", function(parte) {
            corpo += parte
        });

        req.on("end", async function() {
            try {
                const dados = JSON.parse(corpo)
                if (typeof dados.nome !== "string" || !dados.nome.trim() ||
                    typeof dados.area !== "string" || !dados.area.trim()) {
                    res.writeHead(400);

                    res.end(JSON.stringify({
                        erro: "Nome e área são obrigatórios (Ambos em formato texto)"
                    }));

                    return;
                }

                const resultado = await pool.query(
                    `UPDATE professores
                    SET nome = $1, area = $2
                    WHERE id = $3
                    RETURNING id, nome, area`,
                    [dados.nome.trim(), dados.area.trim(), id]
                );

                if (resultado.rows.length === 0) {
                    res.writeHead(404);
                    res.end(JSON.stringify({
                        erro: "Professor não encontrado"
                    }));
                    return;
                }

                res.writeHead(200);
                res.end(JSON.stringify(resultado.rows[0]));
            } catch (erro) {
                console.error("Erro ao atualizar professor:", erro);

                if (erro instanceof SyntaxError) {
                    res.writeHead(400);
                    res.end(JSON.stringify({
                        erro: "O corpo da requisição deve ser um JSON válido"
                    }));
                    return;
                }

                res.writeHead(500);
                res.end(JSON.stringify({
                    erro: "Erro interno ao atualizar professor"
                }));
            }
        });

    // DELETE /api/professores
    // Exclui um professor específico do banco de dados.
    }  else if (req.method === "DELETE" && req.url.startsWith("/api/professores/")) {
        const id = Number(req.url.split("/")[3]);

        if (!Number.isInteger(id) || id <= 0) {
            res.writeHead(400);
            res.end(JSON.stringify({
                erro: "O ID deve ser um número inteiro positivo"
            }));
            return;
        }

        try {
            const resultado = await pool.query(
                `DELETE FROM professores
                 WHERE id = $1
                 RETURNING id, nome, area`,
                [id]
            );

            if (resultado.rows.length === 0) {
                res.writeHead(404);
                res.end(JSON.stringify({
                    erro: "Professor não encontrado"
                }));
                return;
            }

            res.writeHead(200);
            res.end(JSON.stringify({
                mensagem: "Professor excluído com sucesso",
                professor: resultado.rows[0]
            }));

        } catch (erro) {
            console.error("Erro ao excluir professor:", erro);

            res.writeHead(500);
            res.end(JSON.stringify({
                erro: "Erro interno ao excluir professor"
            }));
        }
    } else if (req.method === "GET" && req.url === "/api/professores") {
        try {
            const resultado = await pool.query(
                "SELECT id, nome, area FROM professores ORDER BY id"
            );

            res.writeHead(200);
            res.end(JSON.stringify(resultado.rows));
        } catch (erro) {
            console.error("Erro ao consultar professores:", erro);

            res.writeHead(500);
            res.end(JSON.stringify({
                erro: "Erro interno ao consultar professores"
            }));
        }
    // GET /api/professores/:id
    } else if (req.method === "GET" && req.url.startsWith("/api/professores/")) {
        const id = Number(req.url.split("/")[3]);

        if (!Number.isInteger(id) || id <= 0) {
            res.writeHead(400);
            res.end(JSON.stringify({
                erro: "O ID deve ser um número inteiro positivo"
            }));
            return;
        }

        try {
            const resultado = await pool.query(
                "SELECT id, nome, area FROM professores WHERE id = $1",
                [id]
            );

            if (resultado.rows.length === 0) {
                res.writeHead(404);
                res.end(JSON.stringify({
                    erro: "Professor não encontrado"
                }));
                return;
            }

            res.writeHead(200);
            res.end(JSON.stringify(resultado.rows[0]));

        } catch (erro) {
            console.error("Erro ao consultar professor:", erro);

            res.writeHead(500);
            res.end(JSON.stringify({
                erro: "Erro interno ao consultar professor"
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

