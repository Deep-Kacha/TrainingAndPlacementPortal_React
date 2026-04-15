const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user:     process.env.DB_USER,
  host:     process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: String(process.env.DB_PASSWORD),   // must always be a string
  port:     Number(process.env.DB_PORT) || 5432,
});

pool.connect()
  .then(() => console.log(`✅ PostgreSQL Connected → ${process.env.DB_NAME} @ ${process.env.DB_HOST}`))
  .catch(err => console.error("❌ DB Connection Error:", err.message));

module.exports = pool;