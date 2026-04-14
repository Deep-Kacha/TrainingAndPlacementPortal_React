const { Sequelize } = require('sequelize');

// Initialize Sequelize with your Postgres connection string from .env
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // Set to console.log if you want to see raw SQL queries
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL database connected successfully.');
  } catch (error) {
    console.error('Unable to connect to the PostgreSQL database:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };