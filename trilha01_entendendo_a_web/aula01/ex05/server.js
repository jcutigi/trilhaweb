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