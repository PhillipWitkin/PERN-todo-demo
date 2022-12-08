const Sequelize = require("sequelize");
const dbConfig = {
    HOST: process.env.POSTGRES_HOST || '127.0.0.1',
    USER: process.env.POSTGRES_USER || "postgres",
    PASSWORD: process.env.POSTGRES_PASSWORD || "postgres",
    DB: process.env.POSTGRES_DB || "todo_db",
    PORT: process.env.POSTGRES_PORT || 5432,
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    port: dbConfig.PORT,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  });

module.exports = sequelize;
