const express = require("express");
const axios = require("axios");

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

//work this session
router.post("/recipes", async (req, res) => {
  const { searchKeyword } = req.body;

  const response = await axios.get(
    `https://api.edamam.com/search?q=${searchKeyword}&app_id=83098caf&app_key=7c8da7de3bd3496782094a8758275189&from=0&to=10`
  );
  //make axios get - request to 3rd party api
  //use async await
  const hits = response.data.hits;
  const recipes = hits.map((hit) => {
    const label = hit.recipe.label;
    const imageUrl = hit.recipe.image;
    const source = hit.recipe.source;
    const ingredients = hit.recipe.ingredientLines;
    return { label, imageUrl, source, ingredients };
  });
  res.render("dashboard", { recipes });
});

module.exports = router;
