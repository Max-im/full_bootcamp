(function(){
    document.querySelector(".cameras").addEventListener("click", e=> {
        e.stopPropagation();
        var target = e.target.closest("li");
        if(!target) return;
        var id = target.dataset.title;
        var url = "/single/"+id;
        window.location.href = url;
    })
}());