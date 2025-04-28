require('dotenv').config();
const envs = process.env;

module.exports = {
    client: 'pg',
    verbose: true,
    host: envs.DB_HOST || 'localhost',
    port: envs.DB_PORT || 5432,
    database: envs.DB_NAME || 'test_my_class',
    user: envs.DB_USER || 'postgres',
    password: envs.DB_PASSWORD || 'strong_password',
    schema: envs.DB_SCHEMA || 'public',
    dir: './migrations',
    migrationsTable: 'migrations',
};
