const express = require('express');
const app = express();




app.get("/", (req, res) => {
    res.send("hello word");
});


app.get("/speak/:name", (req, res) => {
    var {name} = req.params;
    var dict = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof woof"
    }
    res.send(dict[name.toLowerCase()]);
});


app.get("/repeat/:title/:num", (req, res) => {
    var {title, num} = req.params;
    var str = '';
    for(var i = 0 ; i < num ; i++ ) {
        str += title + " ";
    }
    res.send(str);
});


// 404
app.get("*", (req, res) => {
    res.send("sorry, the page is not found");
});


app.listen(process.env.PORT, process.env.IP, () => {
    console.log("The server is runing");
});

