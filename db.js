const { Pool } = require("pg");

const pool = new Pool({
  user: "siolwenb",
  password: "wdbnqQ9dqd0HyxDjbTaQjeIw7bcq5SBq",
  database: "siolwenb",
  host: "trumpet.db.elephantsql.com",
});

module.exports = pool;
