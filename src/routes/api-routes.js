const express = require("express");
const axios = require("axios");

const passport = require("../config/passport");
const User = require("../models/user");

const router = express.Router();

router.get("/dashboard", (req, res) => {
  if (!req.user) {
    res.status(401);
  } else {
    res.json({
      email: req.user.email,
      id: req.user.id,
    });
  }
});

router.post("/auth/login", passport.authenticate("local"), (req, res) => {
  res.json(req.user);
});

router.post("/auth/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const payload = {
      email,
      password,
    };

    await User.create(payload);

    res.redirect(302, "/login");
  } catch (err) {
    res.status(401).json(err);
  }
});

//work this session
router.get("/recipes", async (req, res) => {
  const searchKeyword = req.query.text;
  console.log(req.query);

  const response = await axios.get(
    `https://api.edamam.com/search?q=${searchKeyword}&app_id=83098caf&app_key=7c8da7de3bd3496782094a8758275189&from=0&to=10`
  );
  //make axios get - request to 3rd party api
  //use async await
  const hits = response.data.hits;
  const recipes = hits.map((hit) => {
    const label = hit.recipe.label;
    return { label };
  });
  res.json({ recipes });
});

module.exports = router;
