module.exports = {
    "development": {
      "username": process.env.POSTGRES_USER || "postgres",
      "password": process.env.POSTGRES_PASSWORD || "postgres",
      "database": process.env.POSTGRES_DB || "todo_db",
      "host": process.env.POSTGRES_HOST || "127.0.0.1",
      "port": process.env.POSTGRES_PORT || 5432,
      "dialect": "postgres"
    },
    "test": {
      "username": process.env.POSTGRES_USER || "postgres",
      "password": process.env.POSTGRES_PASSWORD || "postgres",
      "database": process.env.POSTGRES_DB || "todo_db",
      "host": process.env.POSTGRES_HOST || "127.0.0.1",
      "port": process.env.POSTGRES_PORT || 5432,
      "dialect": "postgres"
    },
    "production": {
      "username": process.env.POSTGRES_USER || "postgres",
      "password": process.env.POSTGRES_PASSWORD || "postgres",
      "database": process.env.POSTGRES_DB || "todo_db",
      "host": process.env.POSTGRES_HOST || "127.0.0.1",
      "port": process.env.POSTGRES_PORT || 5432,
      "dialect": "postgres"
    }
  }