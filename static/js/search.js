const pagefind = await import("/pagefind/pagefind.js");

const MAX_RESULTS = 10;
const MAX_SUBRESULTS = 3;

// Initialize pagefind on page load, it doesn't take long
pagefind.init();

$(document).ready(function() {
  $('.search-modal-input').keyup(async function() {
    const search = await pagefind.search($(this).val());
    const resultData = await Promise.all(search.results.slice(0, MAX_RESULTS).map(r => r.data()));
    // Clear any existing results using jQuery
    $('.search-results').empty();

    // Iterate over results and add them to div element using jQuery
    for (const result of resultData) {
      // Create the sub results
      let subResults = $('<div class="search-subresults"></div>');
      
      let count = 0;
      for (const subResult of result.sub_results) {
        // Check if anchor is defined
        let subResultText = ''
        if (subResult.anchor) {
          subResultText += `<span class="search-subresult-anchor-text">${subResult.anchor.text}</span>` + ' - ';
        }
        subResultText += subResult.excerpt;
        // The anchor wraps the entire div so you don't have to click on just the text
        subResults.append(
          `<a href="${subResult.url}"><div class="search-subresult">${subResultText}</div></a>`
        );
        count += 1;
        if (count >= MAX_SUBRESULTS) {
          break;
        }
      }

      let resultElement = $(`<div class="search-result"><a href="${result.url}"><div class="search-result-title">${result.meta.title}</div></a></div>`);
      resultElement.append(subResults);
      $('.search-results').append(resultElement);
    }
  });

  // Show search modal
  $('.nav-bar-search-input').click(function() {
    $('.search-modal').css('display', 'flex');
    // Focus on the input in the modal
    $('.search-modal-input').focus();
  });

  // Hide search modal if close button clicked
  $('.search-modal-close-button').click(function() {
    $('.search-modal').css('display', 'none');
  });

  // Also hide search modal if modal overlay is clicked
  $('.search-modal').click(function() {
    $('.search-modal').css('display', 'none');
  });
});