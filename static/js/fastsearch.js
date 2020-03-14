// Based of https://discourse.gohugo.io/t/fast-keyboard-optimized-search-for-hugo/23824

var flexSearch; // holds our search engine
var searchVisible = false;
var firstRun = true; // allow us to delay loading json data unless search activated
var list = document.getElementById('searchResults'); // targets the <ul>
var first = list.firstChild; // first child of search list
var last = list.lastChild; // last child of search list
var maininput = document.getElementById('searchInput'); // input box for search
var resultsAvailable = false; // Did we get any search results?

$("#fast-search-button").click(function () {
  if (firstRun) {
    loadSearch(); // loads our json data and builds fuse.js search index
    firstRun = false; // let's never do this again
  }

  // Toggle visibility of search box
  if (!searchVisible) {
    $("#fast-search-outer").css("visibility", "visible");
    $("#searchInput").focus(); // put focus in input box so you can just start typing
    searchVisible = true; // search visible
  }
  else {
    hideSearchModal()
  }
});

$("#fast-search-outer").click(function (e) {
  // Make sure the user clicked on this div, and not any child div
  if (e.target !== this)
    return;
  hideSearchModal()
})

function hideSearchModal() {
  $("#fast-search-outer").css("visibility", "hidden") // hide search box
  document.activeElement.blur(); // remove focus from search box 
  searchVisible = false; // search not visible
}

// ==========================================
// The main keyboard event listener running the show
//
document.addEventListener('keydown', function (event) {

  // Allow ESC (27) to close search box
  if (event.keyCode == 27) {
    if (searchVisible) {
      hideSearchModal()
    }
  }

  // DOWN (40) arrow
  if (event.keyCode == 40) {
    if (searchVisible && resultsAvailable) {
      event.preventDefault(); // stop window from scrolling
      if (document.activeElement == maininput) { first.focus(); } // if the currently focused element is the main input --> focus the first <li>
      else if (document.activeElement == last) { last.focus(); } // if we're at the bottom, stay there
      else { document.activeElement.parentElement.nextSibling.firstElementChild.focus(); } // otherwise select the next search result
    }
  }

  // UP (38) arrow
  if (event.keyCode == 38) {
    if (searchVisible && resultsAvailable) {
      event.preventDefault(); // stop window from scrolling
      if (document.activeElement == maininput) { maininput.focus(); } // If we're in the input box, do nothing
      else if (document.activeElement == first) { maininput.focus(); } // If we're at the first item, go to input box
      else { document.activeElement.parentElement.previousSibling.firstElementChild.focus(); } // Otherwise, select the search result above the current active one
    }
  }
});


// ==========================================
// execute search as each character is typed
//
$("#searchInput").keyup(function (e) {
  executeSearch(this.value);
})


// ==========================================
// fetch some json without jquery
//
function fetchJSONFile(path, callback) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        var data = JSON.parse(httpRequest.responseText);
        if (callback) callback(data);
      }
    }
  };
  httpRequest.open('GET', path);
  httpRequest.send();
}


// ==========================================
// load our search index, only executed once
// on first call of search box (CMD-/)
//
function loadSearch() {
  $("#fast-search-please-wait").css("display", "flex")
  $("#fast-search-please-wait-text").html("Fetching search data...")
  fetchJSONFile('/index.json', function (data) {
    $("#fast-search-please-wait-text").html("Search data retrieved. Building index...")
    // Add id field to each object in the data for fastsearch
    for(var i = 0; i < data.length; i++) {
      data[i].id = i;
    }

    flexSearch = new FlexSearch({
      profile: "default",
      tokenize: "full", // "strict" will only match once whole words are typed, "forward" will allow you to match partial words from the start of the word, "full" will let you match any partial part of a word
      encode: "icase", // Ignore case
      doc: {
        id: "id",
        field: [ "title", "description", "tags", "contents" ], // "contents" is the huge one which contains the body of the page data
      },
    });
    flexSearch.add(data)
    $("#fast-search-please-wait").css('display', 'none')
    $("#fastSearch").css('display', 'inline-block')
    $("#searchInput").focus(); // put focus in input box so you can just start typing
  });
}


// ==========================================
// using the index we loaded on CMD-/, run 
// a search query (for "term") every time a letter is typed
// in the search box
//
function executeSearch(term) {
  // Sometimes during testing/debugging we won't trigger the loadSearch() the normal way, so check
  // here also
  if (!flexSearch) {
    throw Error('executeSearch() called but search index not yet created.')
  }

  // let results = fuse.search(term); // the actual query being run using fuse.js
  let searchitems = ''; // our results bucket

  let results = flexSearch.search({
    query: term,
    limit: 25,
    depth: 1,
    bool: "or",
    field: ["title", "contents"]
  });

  if (results.length === 0) { // no results based on what was typed into the input box
    resultsAvailable = false;
    searchitems = '';
  } else { // build our html 
    for (let item in results.slice(0, 5)) { // only show first 5 results
      if (results[item].description) {
        description = results[item].description;
      } else {
        description = results[item].contents.substring(0,100);
      }

      searchitems = searchitems + '<li><a href="' + results[item].permalink + '" tabindex="0">' + '<span class="title">' + results[item].title + '</span>' 
        + '<span style="float: right;">' + results[item].date + '</span>' 
        + '<br/> — <em>' + description + '</em></a></li>';
    }
    resultsAvailable = true;
  }

  document.getElementById("searchResults").innerHTML = searchitems;
  if (results.length > 0) {
    first = list.firstChild.firstElementChild; // first result container — used for checking against keyboard up/down location
    last = list.lastChild.firstElementChild; // last result container — used for checking against keyboard up/down location
  }
}