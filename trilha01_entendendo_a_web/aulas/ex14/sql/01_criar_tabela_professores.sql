-- Cria a tabela de professores.
-- O identificador é gerado automaticamente pelo PostgreSQL.

CREATE TABLE professores (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    area VARCHAR(100) NOT NULL
);
