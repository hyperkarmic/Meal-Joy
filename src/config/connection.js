const Sequelize = require("sequelize");

const localOptions = {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
};

const productionOptions = {
  host: process.env.HOSTNAME,
  port: 3306,
  dialect: "mysql",
  use_env_variable: "JAWSDB_URL",
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
};

let sequelize;

if (process.env.NODE_ENV === "production") {
  sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USERNAME,
    process.env.PASSWORD,
    productionOptions
  );
} else {
  sequelize = new Sequelize("recipedb", "root", "mibapab23", localOptions);
}

module.exports = sequelize;
