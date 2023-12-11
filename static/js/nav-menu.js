

// Only run this when DOM has loaded, otherwise it will not find the element
window.addEventListener("DOMContentLoaded", function() {
  // Main menu chevron sliding visibility toggle functionality
  $('.menu-chevron').click(function() {
    let chevronEl = $(this)
    let subMenu = chevronEl.parent().parent().children('.submenu')
    // console.log('Clicked!')
    // console.log(subMenu)
    // subMenu.addClass('show')
    subMenu.slideToggle() // Toggle the submenu
    chevronEl.toggleClass('show')
  });

  // Highlight the current page in the nav menu
  // Get the current page URL
  let currentPage = window.location.href
  console.log(currentPage)
  // Get the nav menu links
  let menuListItems = $('.menu-list-item')
  // console.log(navLinks)
  // Loop through the links
  for (let i = 0; i < menuListItems.length; i++) {
    // console.log(menuListItems[i])
    const menuListItem = menuListItems[i];
    const menuListItemHref = $(menuListItem).find('a:first').attr('href');
    // console.log(menuListItemHref);

    if (currentPage === menuListItemHref) {
      console.log('Found current menu item!');
      console.log(menuListItem);
      // Expand all parent submenus of the active menu item
      $(menuListItem).parents('.submenu').slideToggle();
      $(menuListItem).parents('.menu-list-item').each(function() {
        console.log(this);
        $(this).children('.menu-chevron-link-wrapper').toggleClass('active');
        $(this).children('.menu-chevron-link-wrapper').find('.menu-chevron').addClass('show');
      });
    }
    // If the link href matches the current page URL, add the active class
    // if (navLinks[i].href == currentPage) {
      // navLinks[i].classList.add('active')
    // }
  }


}, false);
