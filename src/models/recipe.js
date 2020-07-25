const Sequelize = require("sequelize");

const sequelize = require("../config/connection.js");

const schema = {
  userId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  recipeId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  label: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [1, 140],
    },
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  source: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [1, 140],
    },
  },
  ingredients: {
    type: Sequelize.TEXT("long"),
    allowNull: false,
  },
  caloriesPerPerson: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  serves: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  favorite: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
};

const Recipe = sequelize.define("recipe", schema);

Recipe.sync();

module.exports = Recipe;
