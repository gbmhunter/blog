// This script is designed to be run after the menu HTML is loaded but before the page is rendered

// Main menu chevron sliding visibility toggle functionality
$('.menu-chevron').click(function() {
  let chevronEl = $(this)
  let subMenu = chevronEl.parent().parent().children('.submenu')
  subMenu.slideToggle() // Toggle the submenu
  chevronEl.toggleClass('show')
});

function showActivePage() {
  // Highlight the current page in the nav menu
  // Get the current page URL
  let currentPage = window.location.href
  console.log(currentPage)
  // Get the nav menu links
  let menuListItems = $('.menu-list-item')
  // Loop through the links
  for (let i = 0; i < menuListItems.length; i++) {
    const menuListItem = menuListItems[i];
    const menuListItemHref = $(menuListItem).find('a:first').attr('href');

    if (currentPage === menuListItemHref) {
      // See active on the current link wrapper
      $(menuListItem).find('.menu-chevron-link-wrapper').first().addClass('active');
      // Expand all parent submenus of the active menu item and set active on the wrapper
      $(menuListItem).parents('.submenu').slideToggle();
      $(menuListItem).parents('.menu-list-item').each(function() {
        $(this).children('.menu-chevron-link-wrapper').addClass('active');
        $(this).children('.menu-chevron-link-wrapper').find('.menu-chevron').addClass('show');
      });
    }
  }
}
showActivePage();

$(document).ready(function() {
  $('.hamburger-button').click(() => {
    console.log('click() called.');
    $('.drawer-modal').css('display', 'block');
    $('.drawer').width('350px');
  });

  $('.drawer-close-button').click(() => {
    $('.drawer-modal').css('display', 'none');
    $('.drawer').width('0');
  });

  // Close the drawer when the user clicks outside of it
  $('.drawer-modal').click(() => {
    $('.drawer-modal').css('display', 'none');
    $('.drawer').width('0');
  });
});