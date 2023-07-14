// This script numbers figures and tables, as well as updating references to these
// tables the correct number (see the "ref" shortcode).
// Idea from https://stackoverflow.com/questions/34467324/auto-numbering-table-figures-in-html
$(function() {
  var figures = {}
  var tables = {}

  // Attribute to look for in HTML elements
  const attrName = 'ref'
  //===================================
  // Number figures
  //===================================
  $('figure[' + attrName + ']').each(function() {
    var figure = $(this);
    var figureRef = figure.attr(attrName)
    var number = mapIndex(figures, figureRef)
    console.log('figureRef=', figureRef)

    if (number < 0) { // this figure is first met
      number = mapIndices(figures) + 1
      figures[figureRef] = figure
      const figCaption = figure.find('figcaption')
      if (figCaption.length == 0){
        console.error('Found no caption for figure "' + figureRef + '"')
      } else {
        figCaption.find('p').prepend('Figure '+ number + ': ')
      }
    }

    // Find each reference to this table in the document and insert the now-assigned number
    $('a[href="#' + figureRef + '"]').each(function () {
      var link = $(this)
      link.text('Figure ' + number)
    })
  })

  //===================================
  // Number tables
  //===================================
  $('table[' + attrName + ']').each(function() {
    var table = $(this)
    var tableRef = table.attr(attrName)

    var number = mapIndex(tables, tableRef)

    if (number < 0) { // this table is first met
      number = mapIndices(tables) + 1

      tables[tableRef] = table

      // Prefix the caption with "Table 1: "
      const caption = table.find('caption')
      // The caption may contain a paragraph with the text in it, or it may be directly in the caption element
      // itself. Work out which case it is:
      const paragraph = caption.find('p')
      if (paragraph.length > 0) {
        paragraph.prepend('Table ' + number + ': ')
      } else {
        caption.prepend('Table ' + number + ': ')
      }
      // Add wrapper so we can have an anchorz
      var wrapper = $('<div class="referenced-table"><a name="' + tableRef + '"></a></div>')
      wrapper.insertAfter(table)
      wrapper.append(table)
    }

    // Find each reference to this table in the document and insert the now-assigned number
    $('a[href="#' + tableRef + '"]').each(function () {
      var link = $(this);
      link.text('Table ' + number)
    });
  });

  // can do some other stuff with tables map here
});
function mapIndex(map, key) {
    var index = 0;
    for (var i in map)
        if (i == key)
            return index;
        else
            index++;

    return -1;
}

function mapIndices(map) {
    var index = 0;
    for (var i in map)
        index++;

    return index;
}