var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var list = ["Max","Bob", "Tanya"];


app.get("/", (req, res) => {
     res.render("home");
});


app.get("/friends", (req, res) => {
    res.render("friends", {list}); 
});


app.post("/add", (req, res) => {
    var {friendName} = req.body;
    list.push(friendName);
    res.redirect("/friends")
});



app.listen(process.env.PORT, process.env.IP, () => console.log("server is starting"));