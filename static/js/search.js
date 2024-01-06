const pagefind = await import("/pagefind/pagefind.js");

console.log('Search JS loaded');
pagefind.init();

$(document).ready(function() {
  console.log('ready() called');
  $('.search-modal-input').keyup(async function() {
    console.log('keyup() called. value: ' + $(this).val());
    const search = await pagefind.search($(this).val());
    const fiveResults = await Promise.all(search.results.slice(0, 5).map(r => r.data()));
    console.log(fiveResults);
    // Clear any existing results using jQuery
    $('.search-modal-results').empty();

    // Iterate over results and add them to div element using jQuery
    for (const result of fiveResults) {
      console.log(result);
      $('.search-modal-results').append(`<div class="search-modal-result"><a href="${result.url}">${result.meta.title}</a></div>`);
    }
  });

  $('.search-input').click(function() {
    console.log('click() called');
    // Show search modal
    $('.search-modal').css('display', 'flex');
  });

  $('.search-modal-close-button').click(function() {
    console.log('click() called');
    // Hide search modal
    $('.search-modal').css('display', 'none');
  });
});