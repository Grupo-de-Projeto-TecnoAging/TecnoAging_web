require('dotenv').config();

module.exports = {
  development: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    port: process.env.POSTGRES_PORT,
    timezone: '-03:00',
    define: {
      timestamps: true,
    },
  },
  test: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: 'test_db',
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    port: process.env.POSTGRES_PORT,
    timezone: '-03:00',
    define: {
      timestamps: true,
    },
  },
  production: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    port: process.env.POSTGRES_PORT,
    timezone: '-03:00',
    define: {
      timestamps: true,
    },
  },
};
