var mongoose = require("mongoose");


mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
    name: String,
    age: Number
});

var Cat = mongoose.model("Cat", catSchema);

// CREATE
// var newCat = new Cat({
//     name: "Sleepy",
//     age: 5
// });

// newCat.save((err, cat) => {
//     if(err){
//         console.log("error");
//     }
//     else {
//         console.log("done");
//         console.log(cat);
//     }
// });


Cat.create({
    name: "Black",
    age: 4
}, (err, cat) => {
     if(err){
        console.log("error");
    }
    else {
        console.log("done");
        console.log(cat);
    }
})




// READ
Cat.find({}, (err, cats) => {
    if(err) {
        console.log("error")
    }
    else{
        console.log("read is done");
        console.log(cats)
    }
})