var express = require("express");
var app = express();
var bodyParser = require('body-parser');

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ixtended: true}));

var data = [
    {name: "Salmon Creek", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn3KtbOiRwG3108BddHpNSY1dKxatBtBLHgH_vLmT8OK4mweUx7w"},
    {name: "Granite Hill", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtMT2a3Tnzwg9X0VQq1kUNvTQLQbEFIxYHIV-Y4qAhdgjFQd2z"},
    {name: "Mountian Rest", img: "http://trinixy.ru/pics5/20171208/beautiful_girls_01.jpg"},
    {name: "Salmon Creek", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn3KtbOiRwG3108BddHpNSY1dKxatBtBLHgH_vLmT8OK4mweUx7w"},
    {name: "Granite Hill", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtMT2a3Tnzwg9X0VQq1kUNvTQLQbEFIxYHIV-Y4qAhdgjFQd2z"},
    {name: "Mountian Rest", img: "http://trinixy.ru/pics5/20171208/beautiful_girls_01.jpg"}
];

app.get("/", (req, res) => {
    res.render("landing");
});


app.get("/campgrounds", (req, res) => {
    res.render("campgrounds", {data})
});


app.post("/campgrounds", (req, res) => {
    var {title, url} = req.body;
    var newEl = {name: title, img: url};
    data.push(newEl);  
    res.redirect("/campgrounds");
});


app.get("/campgrounds/new", (req, res) => {
    res.render("new.ejs")
});

app.listen(process.env.PORT, process.env.IP, () => console.log('server is runing'));