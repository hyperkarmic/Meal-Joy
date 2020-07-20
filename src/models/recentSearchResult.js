const Sequelize = require("sequelize");

const sequelize = require("../config/connection.js");

const schema = {
  userId: {
    type: Sequelize.INTEGER,
    // references: "users",
    // referencesKey: "id",
    field: "user_id",
  },
  searchTerm: {
    type: Sequelize.STRING,
    allowNull: false,
    field: "search_term",
  },
  searchResults: {
    type: Sequelize.TEXT,
    get: function () {
      return JSON.parse(this.getDataValue("searchResults"));
    },
    set: function (value) {
      this.setDataValue("searchResults", JSON.stringify(value));
    },
  },
};

const RecentSearchResult = sequelize.define("recentSearchResult", schema);

RecentSearchResult.sync();

module.exports = RecentSearchResult;
