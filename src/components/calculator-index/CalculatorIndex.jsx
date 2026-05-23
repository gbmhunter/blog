import { useState, useMemo, useRef, useEffect } from 'preact/hooks';
import autoAnimate from '@formkit/auto-animate';
import { CATALOGS } from './catalogs.js';
import './styles.css';

// ---------- search index ----------

const SEARCH_INDEX = CATALOGS.map((c) => ({
  catalog: c,
  haystack: [c.title, c.description, ...(c.tags ?? []), ...c.categoryPath].join(' \n ').toLowerCase(),
}));

// ---------- category tree ----------

function buildTree(catalogs) {
  const root = { name: 'All calculators', path: [], count: catalogs.length, children: new Map() };
  for (const c of catalogs) {
    let node = root;
    for (let i = 0; i < c.categoryPath.length; i++) {
      const segment = c.categoryPath[i];
      if (!node.children.has(segment)) {
        node.children.set(segment, {
          name: segment,
          path: c.categoryPath.slice(0, i + 1),
          count: 0,
          children: new Map(),
        });
      }
      node = node.children.get(segment);
      node.count++;
    }
  }
  const finalise = (n) => {
    n.children = Array.from(n.children.values()).sort((a, b) => a.name.localeCompare(b.name));
    n.children.forEach(finalise);
    return n;
  };
  return finalise(root);
}

const TREE = buildTree(CATALOGS);
const pathsEqual = (a, b) => a.length === b.length && a.every((s, i) => s === b[i]);
const isAncestor = (ancestor, descendant) =>
  ancestor.length <= descendant.length && ancestor.every((s, i) => descendant[i] === s);

function rowsForSelection(selectedPath) {
  const rows = [];
  let node = TREE;
  let depth = 0;
  while (node.children.length > 0) {
    rows.push({ depth, parent: node, children: node.children });
    if (depth >= selectedPath.length) break;
    const next = node.children.find((c) => c.name === selectedPath[depth]);
    if (!next) break;
    node = next;
    depth++;
  }
  return rows;
}

// ---------- chip component ----------

function Chip({ label, count, selected, onClick }) {
  return (
    <button
      type="button"
      class={`calc-index__chip${selected ? ' calc-index__chip--selected' : ''}`}
      onClick={onClick}
    >
      <span class="calc-index__chip-label">{label}</span>
      <span class="calc-index__chip-count">{count}</span>
    </button>
  );
}

// ---------- main ----------

export default function CalculatorIndex() {
  const [query, setQuery] = useState('');
  const [selectedPath, setSelectedPath] = useState([]); // [] = no filter
  const gridRef = useRef(null);
  const filtersRef = useRef(null);

  // FLIP animation: when children of the grid (and the filter row container)
  // are added / removed / reordered, smoothly animate them between their old
  // and new positions. autoAnimate is a ~3KB drop-in that wires this up via a
  // MutationObserver on the parent element.
  useEffect(() => {
    if (gridRef.current) autoAnimate(gridRef.current, { duration: 220 });
    if (filtersRef.current) autoAnimate(filtersRef.current, { duration: 180 });
  }, []);

  const rows = rowsForSelection(selectedPath);

  const filtered = useMemo(() => {
    let result = CATALOGS;
    if (selectedPath.length > 0) {
      result = result.filter((c) =>
        selectedPath.every((seg, i) => c.categoryPath[i] === seg)
      );
    }
    const q = query.trim().toLowerCase();
    if (q !== '') {
      const terms = q.split(/\s+/).filter(Boolean);
      const allowedIds = new Set(SEARCH_INDEX
        .filter(({ haystack }) => terms.every((t) => haystack.includes(t)))
        .map(({ catalog }) => catalog.id));
      result = result.filter((c) => allowedIds.has(c.id));
    }
    return result;
  }, [query, selectedPath]);

  return (
    <div class="calc-index">
      {/* ============ FILTER BAR ============ */}
      <div class="calc-index__filters" aria-label="Filter by category" ref={filtersRef}>
        {rows.map((row) => (
          <div key={row.depth} class="calc-index__filter-row" data-depth={row.depth}>
            {row.depth === 0 ? (
              <Chip
                label="All"
                count={TREE.count}
                selected={selectedPath.length === 0}
                onClick={() => setSelectedPath([])}
              />
            ) : (
              <Chip
                label={`All ${row.parent.name}`}
                count={row.parent.count}
                selected={pathsEqual(selectedPath, row.parent.path)}
                onClick={() => setSelectedPath(row.parent.path)}
              />
            )}
            {row.children.map((child) => (
              <Chip
                key={child.name}
                label={child.name}
                count={child.count}
                selected={isAncestor(child.path, selectedPath)}
                onClick={() => setSelectedPath(child.path)}
              />
            ))}
          </div>
        ))}
      </div>

      {/* ============ SEARCH + GRID ============ */}
      <div class="calc-index__search-row">
        <input
          type="search"
          class="calc-index__search"
          value={query}
          onInput={(e) => setQuery(e.currentTarget.value)}
          placeholder="Search calculators…"
          spellcheck={false}
          autoComplete="off"
        />
        <span class="calc-index__count">
          {filtered.length} of {CATALOGS.length}
        </span>
      </div>

      {filtered.length === 0 ? (
        <div class="calc-index__empty">
          No calculators match the current filter.
          {(query !== '' || selectedPath.length > 0) && (
            <>
              {' '}
              <button
                type="button"
                class="calc-index__clear"
                onClick={() => { setQuery(''); setSelectedPath([]); }}
              >
                Clear filters
              </button>
            </>
          )}
        </div>
      ) : (
        <div class="calc-index__grid" ref={gridRef}>
          {filtered.map((c) => (
            <a key={c.id} href={c.href} class="calc-index__card">
              <div class="calc-index__card-tile">
                <img src={c.tile} alt="" loading="lazy" />
              </div>
              <div class="calc-index__card-body">
                <div class="calc-index__card-title">{c.title}</div>
                <div class="calc-index__card-desc">{c.description}</div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
