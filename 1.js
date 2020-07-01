const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".opened__menu");
const close = document.querySelector(".close-icon");

hamburger.addEventListener("click", function() {
  menu.classList.add(".opened__menu--active");
})

close.addEventListener("click", function() {
  menu.classList.remove(".opened__menu--active");
})
