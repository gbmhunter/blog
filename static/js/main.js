// ===== Scroll to Top ==== 
// Based of code at https://codepen.io/rdallaire/pen/apoyx
$(window).scroll(function() {
  if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
      $('#return-to-top').fadeIn(200);    // Fade in the arrow
  } else {
      $('#return-to-top').fadeOut(200);   // Else fade out the arrow
  }
});
$('#return-to-top').click(function() {      // When arrow is clicked
  $('body,html').animate({
      scrollTop : 0                       // Scroll to top of body
  }, 500);
});

$('.menu-chevron').click(function() {
  let chevronEl = $(this)
  let subMenu = chevronEl.parent().parent().children('.submenu')
  console.log('Clicked!')
  console.log(subMenu)
  // subMenu.addClass('show')
  subMenu.slideToggle() // Toggle the submenu
  chevronEl.toggleClass('show')
})