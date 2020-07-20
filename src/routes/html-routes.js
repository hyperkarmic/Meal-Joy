const express = require("express");
const axios = require("axios");

const Recipe = require("../models/recipe");
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

router.get("/dashboard", isAuthenticated, (req, res) => {
  res.render("dashboard", { email: req.user.email });
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
    const label = hit.recipe.label;
    const imageUrl = hit.recipe.image;
    const source = hit.recipe.source;
    const ingredients = hit.recipe.ingredientLines;
    const calories = hit.recipe.calories;
    return { label, imageUrl, source, ingredients, calories };
  });

  res.render("dashboard", { recipes });
});

router.post("/save/recipe", async (req, res) => {
  try {
    console.log(req.body);
    const { label, imageUrl, ingredients, source, calories } = req.body;
    const payload = {
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
