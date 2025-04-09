"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Pool } = require("pg");
const { DB_USER, DB_HOST, DB_DATABASE, DB_PASSWORD, DB_PORT } = process.env;
const port = Number(DB_PORT) || 5432;
if (!DB_USER || !DB_PASSWORD || !DB_HOST || !DB_DATABASE) {
    throw new Error("Missing one or more required environment variables.");
}
const poolConfig = {
    connectionString: `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}`,
    ssl: {
        rejectUnauthorized: false,
    },
};
const pool = new Pool(poolConfig);
exports.default = pool;
