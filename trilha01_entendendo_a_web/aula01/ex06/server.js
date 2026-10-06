const http = require("http");
const fs = require("fs");

const servidor = http.createServer(function (req, res) {

    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8000");
    res.setHeader("Content-Type", "application/json; charset=utf-8");

    if (req.url === "/api/professoras") {

        const dados = fs.readFileSync("dados.json", "utf-8");
        const professoras = JSON.parse(dados);

        res.writeHead(200);
        res.end(JSON.stringify(professoras));

    } else if (req.url.startsWith("/api/professoras/")) {
        const id = Number(req.url.split("/")[3]);

        const dados = fs.readFileSync("dados.json", "utf-8");
        const professoras = JSON.parse(dados);

        const professora = professoras.find(function (item) {
            return item.id === id;
        });

        if (professora) {
            res.writeHead(200);
            res.end(JSON.stringify(professora));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({
                erro: "Professora não encontrada"
            }));
        }

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