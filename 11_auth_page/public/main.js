(function(){
    if(document.querySelector('.addNewPost')){
        document.querySelector('.addNewPost').addEventListener("click", () => {
            document.querySelector('.addNewPostForm').classList.toggle("hide");
        });
    }
})()