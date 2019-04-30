(function() {
  $( document ).ready(function() {
    console.log('Looking for references.')
    let resources = {}
    $("#bib-list").children().each(function (index) {
      let id = $(this).attr('id')
      ref_num = index + 1
      resources[id] = ref_num
      $(this).html("[" + ref_num + "] " + $(this).html())
    })

    $(".bib-link").each(function (index) {
      let href = $(this).attr('href')
      number = resources[href.substring(1)]
      $(this).children().text("[" + number + "]")
    })
  });
})()