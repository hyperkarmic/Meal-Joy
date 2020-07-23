const express = require("express");
const axios = require("axios");

const Recipe = require("../models/recipe");
const RecentSearchResult = require("../models/recentSearchResult");
const isAuthenticated = require("../middleware/isAuthenticated");
const e = require("express");

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

  const searchTerm =
    recentSearches !== null ? recentSearches.searchTerm : undefined;

  const recipes =
    recentSearches !== null
      ? JSON.parse(recentSearches.searchResults)
      : undefined;

  const savedRecipes = await Recipe.findAll({
    where: { userId: req.user.id },
    raw: true,
  });

  const savedData = savedRecipes.map((recipe) => {
    const userId = recipe !== null ? recipe.userId : undefined;
    const recipeId = recipe !== null ? recipe.recipeId : undefined;
    const label = recipe !== null ? recipe.label : undefined;
    const imageUrl = recipe !== null ? recipe.imageUrl : undefined;
    const caloriesPerPerson =
      recipe !== null ? recipe.caloriesPerPerson : undefined;
    const serves = recipe !== null ? recipe.serves : undefined;
    const source = recipe !== null ? recipe.source : undefined;
    const ingredients = recipe !== null ? recipe.ingredients : undefined;
    return {
      userId,
      recipeId,
      label,
      imageUrl,
      caloriesPerPerson,
      serves,
      source,
      ingredients,
    };
  });

  res.render("dashboard", { recipes, searchTerm, savedRecipes: savedData });
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
    const serves = hit.recipe.yield;
    const calories = hit.recipe.calories;
    const caloriesPerPerson = Math.floor(calories / serves);
    const userId = req.user.id;

    return {
      userId,
      recipeId,
      label,
      imageUrl,
      caloriesPerPerson,
      serves,
      source,
      ingredients,
    };
  });

  const recentSearch = {
    userId: req.user.id,
    searchResults: recipes,
    searchTerm: searchKeyword,
  };

  await RecentSearchResult.upsert(recentSearch);

  const savedRecipes = await Recipe.findAll({
    where: { userId: req.user.id },
    raw: true,
  });

  const savedData = savedRecipes.map((recipe) => {
    const userId = recipe !== null ? recipe.userId : undefined;
    const recipeId = recipe !== null ? recipe.recipeId : undefined;
    const label = recipe !== null ? recipe.label : undefined;
    const imageUrl = recipe !== null ? recipe.imageUrl : undefined;
    const caloriesPerPerson =
      recipe !== null ? recipe.caloriesPerPerson : undefined;
    const serves = recipe !== null ? recipe.serves : undefined;
    const source = recipe !== null ? recipe.source : undefined;
    const ingredients = recipe !== null ? recipe.ingredients : undefined;
    return {
      userId,
      recipeId,
      label,
      imageUrl,
      caloriesPerPerson,
      serves,
      source,
      ingredients,
    };
  });

  res.render("dashboard", {
    recipes,
    searchTerm: searchKeyword,
    savedRecipes: savedData,
  });
});

router.post("/save/recipe", async (req, res) => {
  try {
    const {
      userId,
      recipeId,
      label,
      imageUrl,
      caloriesPerPerson,
      serves,
      ingredients,
      source,
    } = req.body;
    const payload = {
      userId,
      recipeId,
      label,
      imageUrl,
      caloriesPerPerson,
      serves,
      source,
      ingredients,
    };
    await Recipe.create(payload);
    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
    res.status(401).json(err);
  }
});

router.get("/my-recipes", async (req, res) => {
  const recipes = await Recipe.findAll({
    where: { userId: req.user.id },
    raw: true,
  });
  res.render("savedRecipes", { recipes });
});

router.post("/favorite/recipe", async (req, res) => {
  try {
    const { favorite, recipeId, label } = req.body;
    if (favorite == false) {
      await Recipe.update({ favorite }, { where: { recipeId } });
    } else {
      await Recipe.update({ favorite: false }, { where: { recipeId } });
    }
    res.redirect("/my-recipes");
  } catch (err) {
    console.log(err);
    res.status(401).json(err);
  }
});

module.exports = router;
