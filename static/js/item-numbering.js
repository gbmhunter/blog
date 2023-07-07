$(function() {
  var figures = {}
  var tables = {}

  const attrName = 'ref'

  // Autoincrement/reference figures
  $('figure[' + attrName + ']').each(function() {
    var figure = $(this);
    var figureRef = figure.attr(attrName);

    var number = mapIndex(figures, figureRef);

    if (number < 0) { // this table is first met
      number = mapIndices(figures) + 1

      // var annotation = table.attr("title")

      figures[figureRef] = figure;

      figure.find('figcaption').find('p').prepend('Figure '+ number + ': ')

      // var wrapper = $('<div class="referenced-table"><a name="' + tableRef + '"></a></div>');
      // wrapper.insertAfter(table);
      // wrapper.append(table);
      // wrapper.append($('<div class="annotation">Table ' + number + '. ' + annotation + '</div>'));
    }

    // Find each reference to this table in the document and insert the now-assigned number
    $('a[href="#' + figureRef + '"]').each(function () {
      var link = $(this)
      link.text('Figure ' + number)
      // var linkWrapper = $('<span></span>');
      // linkWrapper.insertAfter(link);
      // linkWrapper.append(link);
      // linkWrapper.append($('<sup>[<a href="#' + tableRef + '">' + number  + '</a>]</sup>'));
    });
  });

  $('table[' + attrName + ']').each(function() {
    var table = $(this);
    var tableRef = table.attr(attrName);

    var number = mapIndex(tables, tableRef);

    if (number < 0) { // this table is first met
      number = mapIndices(tables) + 1;

      var annotation = table.attr("title");

      tables[tableRef] = table;

      var wrapper = $('<div class="referenced-table"><a name="' + tableRef + '"></a></div>');
      wrapper.insertAfter(table);
      wrapper.append(table);
      wrapper.append($('<div class="annotation">Table ' + number + '. ' + annotation + '</div>'));
    }

    // Find each reference to this table in the document and insert the now-assigned number
    $('a[href="#' + tableRef + '"]').each(function () {
      var link = $(this);
      link.text('Table ' + number)
      // var linkWrapper = $('<span></span>');
      // linkWrapper.insertAfter(link);
      // linkWrapper.append(link);
      // linkWrapper.append($('<sup>[<a href="#' + tableRef + '">' + number  + '</a>]</sup>'));
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