var mongoose = require("mongoose");


var BlogSchema = new mongoose.Schema({
    title: String,
    img: String,
    body: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Comment" }
    ],
	created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Blog", BlogSchema);