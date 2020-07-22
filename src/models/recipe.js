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
    type: Sequelize.STRING,
    allowNull: false,
  },
  calories: {
    type: Sequelize.DOUBLE(10, 2),
    allowNull: false,
  },
};

const Recipe = sequelize.define("recipe", schema);

Recipe.sync();

module.exports = Recipe;
