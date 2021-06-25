const { Router } = require("express");
var route = Router();

route.get("/", (req, res) => {

    res.render("home.ejs");
});

module.exports = route;
