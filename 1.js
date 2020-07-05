const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".opened__menu");
const close = document.querySelector(".close-icon");
const body = document.querySelector("body");

hamburger.addEventListener("click", function(event) {
  event.preventDefault();
  menu.classList.add("opened__menu--active");
  body.classList.add("noscroll");
})

close.addEventListener("click", function(event) {
  menu.classList.remove("opened__menu--active");
  body.classList.remove("noscroll");
})
