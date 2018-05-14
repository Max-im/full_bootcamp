var mongoose = require("mongoose");
var passLocalMongo = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passLocalMongo);

module.exports = mongoose.model("User", UserSchema);