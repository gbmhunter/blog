
var storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
if (storedTheme) {
  document.documentElement.setAttribute('data-theme', storedTheme);
} else {
  document.documentElement.setAttribute('data-theme', 'light');
}

// Only run this when DOM has loaded, otherwise it will not find the element
window.addEventListener("DOMContentLoaded", function() {
  var toggle = document.getElementById("theme-toggle");
  toggle.onclick = function() {
    var currentTheme = document.documentElement.getAttribute("data-theme");
    var targetTheme = "light";

    if (currentTheme === "light") {
        targetTheme = "dark";
    }

    document.documentElement.setAttribute('data-theme', targetTheme)
    localStorage.setItem('theme', targetTheme);
  };
}, false);

