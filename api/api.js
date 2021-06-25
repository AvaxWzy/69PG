const express = require("express");
const ejs = require("ejs");

var app = express();

app.set("view engine", "ejs");

app.use(require("./routers/home"));

app.listen(process.env.PORT || 8000, () => {

    console.log("Api Started");
    console.log(`Port | ${process.env.PORT || 8000`)
});
