var express         = require("express");
var app             = express();
var bodyParser      = require("body-parser");
var mongoose        = require("mongoose");


mongoose.connect("mongodb://localhost/db_app");
app.use(express.static("public")); 
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ixtended: true}));


// SCHEMA SETUP
var cameraSchema = new mongoose.Schema({
   title: String,
   img: String
});

var Camera = mongoose.model("Camera", cameraSchema);


// ADD static DB
// var data = [
//     {title: "Old", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKEqaEZGDzDF7l3QSOFmv6_gHKii_W6_BCPWDGUatvpNdybQN2MQ"},
//     {title: "Sony", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfPMNrhgJclQUgjNM1cnNkNKqHBLb7IlBj7JZu7MscVCibLxaTSw"},
//     {title: "Nikon", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4pLhAmj-PoGB6vkMsjOw6FdatKdXH1WdupS8bqYaMtj8uiGErsQ"},
//     {title: "Canon", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNlIryZxn7QrZNnHJ_IfZrQgmdAsEDAISxruJt1GbFJO9GXtplnw"}
// ];

// data.forEach(item => {
//     Camera.create(item, (err) => err ? console.log("error") : console.log("item was added"))
// })



app.get("/", (req, res) => {
    Camera.find({}, (err, data)=> err ? console.log("error") : res.render("home", {data}));
});


app.post("/add", (req, res) => {
    var newEl = { title: req.body.title, img: req.body.img };
    Camera.create(newEl, err => err ? console.log("error") : res.redirect("/"));
});

app.get("/single/:id", (req, res) => {
    Camera.findById(req.params.id, (err, data) => err ? console.log(err) : res.render("single", {data}));
});



app.listen(process.env.PORT, process.env.IP, ()=> console.log("the server is runing"));