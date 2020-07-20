const Sequelize = require("sequelize");

const sequelize = require("../config/connection.js");

const schema = {
  userId: {
    type: Sequelize.INTEGER,
    field: "user_id",
    unique: true,
  },
  searchTerm: {
    type: Sequelize.STRING,
    allowNull: false,
    field: "search_term",
  },
  searchResults: {
    type: Sequelize.TEXT,
    get() {
      return JSON.parse(this.getDataValue(searchResults));
    },
    set(value) {
      this.setDataValue("searchResults", JSON.stringify(value));
    },
  },
};

const RecentSearchResult = sequelize.define("recentSearchResult", schema);

RecentSearchResult.sync();

module.exports = RecentSearchResult;
