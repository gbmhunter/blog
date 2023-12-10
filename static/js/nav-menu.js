

// Only run this when DOM has loaded, otherwise it will not find the element
window.addEventListener("DOMContentLoaded", function() {
  // Main menu chevron sliding visibility toggle functionality
  $('.menu-chevron').click(function() {
    let chevronEl = $(this)
    let subMenu = chevronEl.parent().parent().children('.submenu')
    console.log('Clicked!')
    console.log(subMenu)
    // subMenu.addClass('show')
    subMenu.slideToggle() // Toggle the submenu
    chevronEl.toggleClass('show')
  });
}, false);
