// Make background image change position w/ mouse
var sign = Math.sign || function(x) { return x > 0 ? 1 : x < 0 ? -1 : x; }
var pattern = document.getElementById("image-pattern");
document.addEventListener("mousemove", function (e) {
  var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  var ratioX = Math.sqrt(Math.pow(width / 2 - e.clientX, 2)) / Math.sqrt(Math.pow(width / 2, 2));
  var ratioY = Math.sqrt(Math.pow(height / 2 - e.clientY, 2)) / Math.sqrt(Math.pow(height / 2, 2));
  pattern.setAttribute("x", -10 + 3 * ratioX * sign(width / 2 - e.clientX) + "%");
  pattern.setAttribute("y", 11 + 2 * ratioY * sign(height / 2 - e.clientY) + "%");
});

var nav = document.querySelector("nav");
var hamburger = document.querySelector("nav > a");
hamburger.addEventListener("click", function (e) {
  if (nav.classList.contains("active")) {
    nav.classList.remove("active");
  } else {
    nav.classList.add("active");
  }
  e.preventDefault();
});
