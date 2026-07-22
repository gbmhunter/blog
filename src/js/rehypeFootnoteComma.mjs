/**
 * Rehype plugin that inserts a superscript comma between two footnote
 * citations placed directly next to each other in the markdown (e.g.
 * `[^ref-1][^ref-2]`). Without it, each citation renders as its own
 * <sup><a>N</a></sup> with nothing in between, so the numbers run together
 * and look like one big number (e.g. "67" instead of "6,7").
 *
 * This can't be done in pure CSS: the adjacent-sibling combinator (sup + sup)
 * ignores text nodes, so it would also insert commas between citations that
 * are separated by ordinary sentence text.
 */
export default function rehypeFootnoteComma() {
  const isFootnoteSup = (node) =>
    node?.type === 'element' &&
    node.tagName === 'sup' &&
    node.children?.some(
      (child) =>
        child.type === 'element' &&
        child.tagName === 'a' &&
        child.properties &&
        'dataFootnoteRef' in child.properties,
    );

  const walk = (node) => {
    if (!node.children) return;
    // Iterate backwards so splicing doesn't disturb the indices still to visit
    for (let i = node.children.length - 1; i > 0; i--) {
      if (isFootnoteSup(node.children[i]) && isFootnoteSup(node.children[i - 1])) {
        node.children.splice(i, 0, {
          type: 'element',
          tagName: 'sup',
          properties: { className: ['footnote-separator'] },
          children: [{ type: 'text', value: ',' }],
        });
      }
    }
    node.children.forEach(walk);
  };

  return (tree) => walk(tree);
}
