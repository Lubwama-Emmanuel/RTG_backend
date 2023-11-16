const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "rtg",
  password: "6723",
  port: 5432,
});

module.exports = pool;
