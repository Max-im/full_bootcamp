var express = require("express");
var app = express();
var request = require("request");

var apiKey = '90feee63';

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("search")
});

app.get("/res", (req, res) => {
    var {movie} = req.query;
    request(`http://www.omdbapi.com/?s=${movie}&apikey=${apiKey}`, (error, response, body) => {
        if(!error && response.statusCode === 200){
            var bodyRes = JSON.parse(body);
            res.render("results", {data:bodyRes});
        }
    });
});


app.listen(process.env.PORT, process.env.IP, () => console.log("the server is runing")) 