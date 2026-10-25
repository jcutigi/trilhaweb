// Exemplo didático de teste de conexão

// Importa a instância do pool de conexões configurada no arquivo db.js local
const pool = require("./db");

// Define uma função assíncrona para testar a comunicação com o banco de dados
async function testarConexao() {
    try {
        // Envia uma consulta SQL para buscar todos os registros da tabela "professores"
        // O "await" pausa a execução até que o banco de dados responda à query
        const resultado = await pool.query("SELECT * FROM professores");

        // Exibe mensagens de sucesso no console e mostra as linhas retornadas pela consulta
        console.log("Consulta à tabela professores realizada com sucesso!");
        console.log("Professores cadastrados:", resultado.rows);
    } catch (erro) {
        // Caso ocorra qualquer falha na conexão ou na query, captura o erro e exibe a mensagem
        console.error("Erro ao conectar ao PostgreSQL:", erro.message);
    } finally {
        // O bloco "finally" é executado sempre, independentemente de ter dado certo ou errado
        // Encerra todas as conexões abertas do pool (ideal para scripts de teste pontuais)
        await pool.end();
    }
}

// Executa a função de teste criada acima
testarConexao();