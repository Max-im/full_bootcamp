var express = require('express');

var app = express();


app.get("/", (req, res) => res.render("home.ejs"));

app.get("/love/:tmpl", (req, res) => {
    var data = req.params.tmpl;
    res.render("love.ejs", {data});
});


app.get("/posts", (req, res) => {
    var posts = [
        {name: "post 1", author: "me"},
        {name: "post 2", author: "you"},
        {name: "post 3", author: "he"},
        {name: "post 4", author: "she"},
        {name: "post 5", author: "me"},
        {name: "post 6", author: "we"},
    ];
    res.render("posts.ejs", {posts})
})


app.listen(process.env.PORT, process.env.IP, ()=>console.log('server is runing'))