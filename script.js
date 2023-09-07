var faqs = document.querySelectorAll(".next");

function answer1() {
    faqs[0].classList.add("active");
    setTimeout(function() {
        faqs[0].classList.add("visible");
    }, 1);
}