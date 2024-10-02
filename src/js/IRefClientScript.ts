/**
 * This script is run in the user's browser and adds "Item Reference" (IRef) functionality.
 * Item references are used to link to specific elements in the page, such as figures, tables, equations, e.t.c. They
 * are different from "references" which are used to cite sources.
 * It prefixes figure captions with "Figure 1", "Figure 2", etc.
 * It also looks for <IRef /> components and replaces the text and link to the corresponding item.
 */

/**
 * Represents a reference destination in the page.
 */
class RefDestination {
  type: string;
  index: number;
  ref_name: string;
  constructor(type: string, index: number, ref_name: string) {
    this.type = type;
    this.index = index;
    this.ref_name = ref_name;
  }
}

function create_ref_links() {
  let found_iref_destinations: { [key: string]: RefDestination } = {};

  const markdownContentDiv = document.querySelector('.sl-markdown-content');
  if (!markdownContentDiv) {
    console.error('markdownContentDiv not found');
    return;
  }

  // Find all figures.
  // 1) Prefix figcaptions with "Figure X: "
  // 2) Add figure to found_ref_destinations if ref present
  const figures = markdownContentDiv.querySelectorAll('.figure');
  console.log('figures', figures);
  figures.forEach((figure, index) => {
    const figcaption = figure.querySelector('figcaption');
    if (figcaption) {
      // Must set innerHTML and not textContent because figcaption can contain HTML
      figcaption.innerHTML = `Figure ${index + 1}: ` + figcaption.innerHTML;
    }
    // If figure has an id, add it to the found_ref_destinations array
    const iref = figure.getAttribute('data-iref');
    if (iref) {
      found_iref_destinations[iref] = new RefDestination('figure', index, `Figure ${index + 1}`);
    }
  });

  // Find all tables under the markdown content div
  // 1) Prefix table captions with "Table X: "
  // 2) Add table to found_ref_destinations if iref present
  const tables = markdownContentDiv.querySelectorAll('table');
  console.log('tables', tables);
  tables.forEach((table, index) => {
    const tableCaption = table.querySelector('caption');
    console.log('tableCaption', tableCaption);
    if (tableCaption) {
      // Must set innerHTML and not textContent because the table caption can contain HTML
      tableCaption.innerHTML = `Table ${index + 1}: ` + tableCaption.innerHTML;
    }
    // If table has an iref, add it to the found_ref_destinations array
    const iref = table.getAttribute('data-iref');
    if (iref) {
      found_iref_destinations[iref] = new RefDestination('table', index, `Table ${index + 1}`);
      // Add id to table so we can link to it
      table.id = iref;
    }
  });

  // Find all tables that are wrapped in a div with class "table-container"
  const containerTables = markdownContentDiv.querySelectorAll('.table-container');
  console.log('containerTables', containerTables);

  console.log('found_ref_destinations', found_iref_destinations);

  // Find all ref-source elements and link them to the corresponding item ref in the page
  const refSources = document.querySelectorAll('.ref-source');
  console.log('refSources', refSources);
  refSources.forEach((refSource) => {
    const ref = refSource.getAttribute('data-iref');
    console.log('ref', ref);
    // Check if ref is in found_ref_destinations
    if (!ref) {
      console.error('ref not found in refSource', refSource);
      return;
    }
    if (found_iref_destinations[ref]) {
      refSource.textContent = `${found_iref_destinations[ref].ref_name}`;
    } else {
      // This is an error, it means there is an <IRef /> component in the markdown
      // that does not have a corresponding figure, table, etc.
      console.error('ref not found in found_ref_destinations', ref);
    }
  });
}

// Create ref links on page load (e.g. navigating to the site from a different site)
create_ref_links()

// Re-link figures after swapping pages (i.e. navigating between pages on this site)
// We need to do this because page transitions do not reload the entire page and
// trigger this script file to be reparsed.
// Using after-swap is better than page-load because it is before the page is rendered
document.addEventListener("astro:after-swap", create_ref_links)