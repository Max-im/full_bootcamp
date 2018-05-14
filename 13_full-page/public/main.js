(function($){
    $(".comment__text").on("click", editComment);
    $(".comment__input").on("blur", editCommentBack);
    
    function editComment(e) {
        $(e.target).toggleClass('hide');
        $(e.target)
            .closest(".comment__item")
            .find(".comment__input")
            .toggleClass("hide")
            .focus();
    }
    
    function editCommentBack(e){
        $(e.target).toggleClass('hide');
        $(e.target)
            .closest(".comment__item")
            .find(".comment__text")
            .toggleClass("hide")
            .text(e.target.value);
        

        const url = $(".removeComment__form").attr("action").replace(/\?_method=DELETE/, "").replace(/removeComment/, "editComment");
        $.ajax({
            url,
            data: { "newData": e.target.value },
            method: "PUT" 
        });
    }
    
    
    $('.addPostToggle').on("click", e => {
       const el = $("#"+$(e.target).attr('data-target'));
       $(el).toggleClass('hide');
    });
    
})($);