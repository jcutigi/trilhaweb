const pool = require("./db");

async function testarConexao() {
    try {
        const resultado = await pool.query("SELECT * FROM professores");

        console.log("Consulta à tabela professores realizada com sucesso!");
        console.log("Professores cadastrados:", resultado.rows);
    } catch (erro) {
        console.error("Erro ao conectar ao PostgreSQL:", erro.message);
    } finally {
        await pool.end();
    }
}

testarConexao();
