const Pool = require("pg").Pool;

const devConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

const prodConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: { 
    //rejectUnauthorized: false,
    sslmode: 'require',
  }
};

const pool = new Pool(
  process.env.NODE_ENV === "production" ? prodConfig : devConfig
);

module.exports = pool;
