console.log('test');

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

let found_ref_destinations: { [key: string]: RefDestination } = {};

// Prefix figcaptions with "Figure X: "
const figures = document.querySelectorAll('.figure');
console.log('figures', figures);
figures.forEach((figure, index) => {
  const figcaption = figure.querySelector('figcaption');
  if (figcaption) {
    figcaption.textContent = `Figure ${index + 1}: ` + figcaption.textContent;
  }
  // If figure has an id, add it to the found_ref_destinations array
  const id = figure.getAttribute('id');
  if (id) {
    found_ref_destinations[id] = new RefDestination('figure', index, `Figure ${index + 1}`);
  }
});

console.log('found_ref_destinations', found_ref_destinations);

// Find all ref-source elements and link them to the corresponding ref in the page
const refSources = document.querySelectorAll('.ref-source');
console.log('refSources', refSources);
refSources.forEach((refSource, index) => {
  const ref = refSource.getAttribute('id');
  console.log('ref', ref);
  // refSource.textContent = `[${index + 1}]`;
  // Check if ref is in found_ref_destinations
  if (!ref) {
    console.log('ref not found in refSource', refSource);
    return;
  }
  if (found_ref_destinations[ref]) {
    refSource.textContent = `${found_ref_destinations[ref].ref_name}`;
  } else {
    console.log('ref not found in found_ref_destinations', ref);
  }
});
