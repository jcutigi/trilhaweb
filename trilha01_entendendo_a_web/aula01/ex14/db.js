// Carrega as variáveis de ambiente a partir do arquivo .env para o process.env
require("dotenv").config();

// Importa a classe Pool do pacote "pg" para gerenciar o pool de conexões com o PostgreSQL
const { Pool } = require("pg");

// Cria e configura o pool de conexões usando as credenciais de ambiente
const pool = new Pool({
    host: process.env.DB_HOST,       // Endereço do servidor do banco de dados
    port: Number(process.env.DB_PORT), // Porta do banco de dados (convertida para número)
    database: process.env.DB_NAME,   // Nome do banco de dados a ser conectado
    user: process.env.DB_USER,       // Nome de usuário para autenticação
    password: process.env.DB_PASSWORD // Senha do usuário do banco de dados
});

// Exporta o pool para que possa ser utilizado em outros módulos da aplicação
module.exports = pool;
