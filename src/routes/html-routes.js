const express = require("express");

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

module.exports = router;
