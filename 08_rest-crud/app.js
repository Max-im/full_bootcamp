var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");

mongoose.connect("mongodb://localhost/rest_crud");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
	
	
var blogSchema = new mongoose.Schema({
	title: String,
	img: String,
	body: String,
	created: { type: Date, default: Date.now }
});
	
var Blog = mongoose.model("Blog", blogSchema);
	
	
//  Blog.create({
//      title: "pizza 1",
//      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR53bsBSzg2aKSccklsq-C-azQ2UsfG_7cVbpvuan6oBW_R3gHgCA",
//      body: "lorem  ipsum "
//  });
	
	
	//ROUTES
app.get("/", (req, res) => res.redirect("/blogs") );
	
app.get("/blogs", (req, res) => {
	Blog.find({}, (err, data) => err ? console.log("error - /blogs") : res.render("index", {data}));
});
	
	
//CREATE NEW POST
app.get("/blogs/new", (req, res) => res.render("newPost") );

app.post("/blogs", (req, res) => {
	Blog.create(req.body.blog, err => err ? res.render("newPost") : res.redirect("/blogs") );
});


// SINGLE PAGE
app.get("/blogs/:id", (req, res) => {
	Blog.findById(req.params.id, (err, data) => err ? console.log("error - /single") : res.render("single", {data}));
});
	

// EDIT
app.get("/blogs/:id/edit", (req, res) => {
	Blog.findById(req.params.id, (err, data) => {
		if(err) console.log("error - /update");
		else res.render("edit", {data})
	});
});

// UPDATE
app.put("/blogs/:id", (req, res) => {
	console.log("put works")
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, data) => err ? console.log("error - /update") : res.redirect("/blogs/"+req.params.id));		
});



// REMOVE
app.delete("/blogs/:id", (req, res) => {
	Blog.findByIdAndRemove(req.params.id, (err) => res.redirect("/blogs"));
});



//LAUNCH	
app.listen(process.env.PORT, process.env.IP, () => console.log("server is runing"));