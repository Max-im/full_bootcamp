var mongoose = require("mongoose");
var Blog = require("./models/blogs");
var Comment = require("./models/comments"); 

 var data = [
     {
        title: "pizza 1",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR53bsBSzg2aKSccklsq-C-azQ2UsfG_7cVbpvuan6oBW_R3gHgCA",
        body: "lorem  ipsum "
    },
    {
        title: "pizza 2",
        img: "https://www.metro.ca/userfiles/image/recipes/pizza-saucisse-piquante-2301.jpg",
        body: "lorem  ipsum "
    },
    {
        title: "pizza 3",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7Y_LOnN1CW5iZfPcbkwprBW6TQO_wMxLf3EfT91In8CwKvlKV3w",
        body: "lorem  ipsum "
    },
    {
        title: "pizza 4",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZpFe_4ABxuJAsE09Xcc9rlUK4onPeyMSb6N0UslestHtPHZea",
        body: "lorem  ipsum "
    },
    {
        title: "pizza 5",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdOY9ipE1oZYTsVQHC1cA31BjVhj6tvbj52OCsfHljsXXU7-tOJg",
        body: "lorem  ipsum "
    }
 ];



function seedDB() {
    // Remove all blog items
    Blog.remove({}, err => {
        if(err) {console.log(err)}
        else{
            console.log("all items were removed");
            
            // Add few blogs items
            data.forEach(item => {
                Blog.create(item, (err, blogItem) => {
                    if(err){ console.log(err)}
                    else{
                        console.log("Item was added");
                        Comment.create({
                            text: "Awesome pizza",
                            author: "Homer"
                        }, (err, commentItem) => {
                            if(err) console.log(err)
                            else{
                                blogItem.comments.push(commentItem)
                                blogItem.save();
                                console.log("comment was created ")
                            }
                        })
                    }
                    
                }); 
            });
        }
        
    });
    
    
    
}

module.exports = seedDB;
