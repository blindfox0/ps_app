var instructions = function(param) {

    var instructionsContent = document.querySelector("#instructions");

    if(param == "show") {
        instructionsContent.style.display = "block";
        setTimeout(function(){
            instructionsContent.style.opacity = "1";
        }, 1);
    } else if (param == "hide") {
        instructionsContent.style.opacity = "0";
        setTimeout(function(){
            instructionsContent.style.display = "none";
        }, 500);
    }
}