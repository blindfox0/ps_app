var zIndex = 99;
var currentID = "firstQuestion";
var r = 190;
var g = 39;
var newSectionPrev;
var timeoutPreview = 500;
var toScroll;
let history = [];
var backupButtons = [];
var currentHistoryIndex = 0;

function changeColor(button) {
    button.style.backgroundColor = "#fff";
    button.style.color = "#000";
}

function returnTo(button) {

    function findElement(element) {
        return element == button.parentNode;
    }
    var index = history.findIndex(findElement);

    if(index < 0) { //obsluga bledu z indexem < 0, czyli kiedy kliknie sie w pierwszy modul
        window.location.reload();
    } else {
        var historyLength = history.length;
        
        for (i = index; i < historyLength; i++) {
            history[i].remove();
        }

        var currentOption = history[index][0];
        currentID = history[index].id;

        zIndex = zIndex - 1;
        
        var template = document.querySelector("#content").innerHTML;

        var renderedContent = Mustache.render(template, currentOption);

        const answers = document.querySelector("#answers");

        newSectionPrev = document.createElement("section");
        newSectionPrev.classList.add("faq");
        newSectionPrev.classList.add("next");

        r = history[index][1];
        g = history[index][2];
        
        newSectionPrev.style.zIndex = zIndex;
        newSectionPrev.style.backgroundColor = `rgb(${r}, ${g}, 30)`;
        
        newSectionPrev.innerHTML = renderedContent;
        newSectionPrev.classList.add("active");

        setTimeout(function() {
            newSectionPrev.classList.add("visible");
        }, 1);

        newSectionPrev.id = currentID;

        answers.appendChild(newSectionPrev);

        for (i = index; i < historyLength; i++) {
            history.pop();
        }
        currentHistoryIndex = index;

        history[currentHistoryIndex] = newSectionPrev;
        history[currentHistoryIndex][0] = currentOption;
        history[currentHistoryIndex][1] = r; //kolor tla r
        history[currentHistoryIndex][2] = g; //kolor tla g

        currentHistoryIndex++;

        r = r - 10;
        g = g + 10;

        var nextOption;
        var nextOptionButtons = newSectionPrev.querySelectorAll("button");
        for(var i = 0; i < nextOptionButtons.length; i++) {
            if (button.innerHTML == nextOptionButtons[i].innerHTML) {
                nextOption = nextOptionButtons[i];
            }
        }

        var outerFunctionName = nextOption.getAttribute("onmouseover");
        var innerFunctionName = outerFunctionName.match(/\(([^,]+),/);
        var firstParamName;

        if(innerFunctionName) {
            firstParamName = innerFunctionName[1].trim();
            console.log("Nazwa pierwszego parametru to: " + firstParamName);
        } else {
            console.log("Nie znaleziono nazwy pierwszego parametru");
        }

        var firstParamVar = window[firstParamName];

        // clearTimeout(myTimeout);
        setTimeout(function() {
            changeColor(nextOption);
            preview(firstParamVar, nextOption);
            setTimeout(function() {
                answer(firstParamVar, nextOption);
                scrollBy({
                    top: toScroll,
                    behavior: "smooth"
                });
            }, 2)
        }, 10);
    }
}

function preview(option) {

    zIndex = zIndex - 1;
            
    var template = document.querySelector("#content").innerHTML;

    var renderedContent = Mustache.render(template, option);

    const answers = document.querySelector("#answers");

    newSectionPrev = document.createElement("section");
    newSectionPrev.classList.add("faq");
    newSectionPrev.classList.add("next");
    
    newSectionPrev.style.zIndex = zIndex;
    
    newSectionPrev.innerHTML = renderedContent;
    newSectionPrev.classList.add("active");

    setTimeout(function() {
        newSectionPrev.classList.add("partialy-visible");
    }, 1);

    answers.appendChild(newSectionPrev);

    toScroll = newSectionPrev.offsetHeight - 60;
}

function answer(option, button) {

    function getVariableName(variable) {
        for (var key in window) {
            if (window[key] === variable)
                return key;
        }
    }

    newSectionPrev.style.backgroundColor = `rgb(${r}, ${g}, 30)`;
    newSectionPrev.classList.remove("partialy-visible");
    newSectionPrev.classList.add("visible");
    var oldID = currentID; //to save old to safely change button functions here ->
    currentID = getVariableName(option);
    newSectionPrev.id = currentID;

    history[currentHistoryIndex] = newSectionPrev;
    history[currentHistoryIndex][0] = option;
    history[currentHistoryIndex][1] = r; //kolor tla r
    history[currentHistoryIndex][2] = g; //kolor tla g

    currentHistoryIndex++;

    var currentQuestion = document.querySelector("#"+oldID);
    var buttons = currentQuestion.querySelectorAll("button");

    for (var i = 0; i < buttons.length; i++) { //<- here
        buttons[i].setAttribute("onclick", "returnTo(this)");
        buttons[i].removeAttribute("onmouseover");
        buttons[i].onmouseout = null;
    }

    changeColor(button);
    r = r - 10;
    g = g + 10;
}

function show(option, button) {
    const myTimeout = setTimeout(function() {
        
        var fasterPreview;

        preview(option);
        button.onmouseout = function() {
            newSectionPrev.remove();
            newSectionPrev = null;
            zIndex = zIndex + 1;
            fasterPreview = setTimeout(function() {
                timeoutPreview = 500;
            }, 3000);
        }

        button.onclick = function() {
            answer(option, button);
            clearTimeout(fasterPreview);
            timeoutPreview = 500;
            scrollBy({
                top: toScroll,
                behavior: "smooth"
            });
            
        }

        clearTimeout(fasterPreview);
        timeoutPreview = 30;
    }, timeoutPreview);

    button.onmouseout = function() {
        clearTimeout(myTimeout);
    }

    button.onclick = function() {
        clearTimeout(myTimeout);
        preview(option, button);
        setTimeout(function() {
            answer(option, button);
            scrollBy({
                top: toScroll,
                behavior: "smooth"
            });
        }, 2);
        
    }
}