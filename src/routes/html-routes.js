const express = require("express");
const axios = require("axios");

const Recipe = require("../models/recipe");
const RecentSearchResult = require("../models/recentSearchResult");
const isAuthenticated = require("../middleware/isAuthenticated");

const router = express.Router();

router.get("/", (req, res) => {
  if (req.user) {
    res.redirect("/dashboard");
  }
  res.render("login");
});

router.get("/login", (req, res) => {
  if (req.user) {
    res.redirect("/dashboard");
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.user) {
    res.redirect("/dashboard");
  }
  res.render("signup");
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/dashboard", isAuthenticated, async (req, res) => {
  const recentSearches = await RecentSearchResult.findOne({
    where: { userId: req.user.id },
    raw: true,
  });

  const data = {
    searchResults:
      recentSearches !== null
        ? JSON.parse(recentSearches.searchResults)
        : undefined,
    searchTerm: recentSearches !== null ? recentSearches.searchTerm : undefined,
  };

  res.render("dashboard", data);
});

router.post("/dashboard", async (req, res) => {
  const { searchKeyword } = req.body;
  const API_ID = "83098caf";
  const API_KEY = "7c8da7de3bd3496782094a8758275189";

  const response = await axios.get(
    `https://api.edamam.com/search?q=${searchKeyword}&app_id=${API_ID}&app_key=${API_KEY}&from=0&to=9`
  );
  //make axios get - request to 3rd party api
  //use async await
  const hits = response.data.hits;
  const recipes = hits.map((hit) => {
    const recipeUrl = hit.recipe.uri;
    const recipeUrlLength = recipeUrl.length;
    const recipeUrlIndex = recipeUrlLength - 51;
    const recipeId = recipeUrl.slice(-recipeUrlIndex);
    const label = hit.recipe.label;
    const imageUrl = hit.recipe.image;
    const source = hit.recipe.source;
    const ingredients = hit.recipe.ingredientLines;
    const calories = hit.recipe.calories;
    const userId = req.user.id;
    return { userId, recipeId, label, imageUrl, source, ingredients, calories };
  });

  const recentSearch = {
    userId: req.user.id,
    searchResults: recipes,
    searchTerm: searchKeyword,
  };

  await RecentSearchResult.upsert(recentSearch);

  res.render("dashboard", { recipes });
});

router.post("/save/recipe", async (req, res) => {
  try {
    console.log(req.body);
    const {
      userId,
      recipeId,
      label,
      imageUrl,
      ingredients,
      source,
      calories,
    } = req.body;
    const payload = {
      userId,
      recipeId,
      label,
      imageUrl,
      source,
      ingredients,
      calories,
    };
    await Recipe.create(payload);
    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
    res.status(401).json(err);
  }
});

module.exports = router;
