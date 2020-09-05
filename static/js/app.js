// Set Algolia options
const options = {
  appId: "6WHHDU8RNV",
  apiKey: "567f7ff586e6ff70b274bede0e731860",
  indexName: "blog.mbedded.ninja",
  hitsPerPage: 10,
  routing: true,
};

// Parse options to instantsearch
console.log('Initializing search...')
const search = instantsearch(options);

// create variable for custom hit template
var hitTemplate =
  '<div class="List-item" style="display: flex;">' +
    '<div class="List-image">' +
      '<img src="{{images}}" style="width:200px;" />' +
    '</div>' +
    '<div style="width: 100px;"></div>' +
    '<div class="List-title-and-summary">' +
      '<div class="List-title"><a href="{{ permalink }}">{{{_highlightResult.title.value}}}</a></div>' +
      '<div class="List-summary">{{{summary}}}</div>' + 
    '</div>' +
  '</a>';

// initialize hits widget
search.addWidget(
  instantsearch.widgets.hits({
    // define container
    container: "#hits",
    // add classes for styling
    cssClasses: {
      root: "Search-hits",
      empty: "Search-hits--empty",
    },
    templates: {
      // call custom hit template
      item: hitTemplate,
      empty: 'Didn’t find any results for the search  <em>"{{query}}"</em>',
    },
  })
);

// initialize SearchBox
search.addWidget(
  instantsearch.widgets.searchBox({
    container: "#search-box",
    placeholder: "Search for post",
    reset: false,
    cssClasses: {
      root: "Search-box-container",
      input: "Search-box-input",
    },
  })
);

// make all this stuff happen
search.start();