"""
Flatten the Affinity Designer export `electronic-components.svg` into a clean
SVG <symbol> library (`symbols.svg`) plus a JSON index (`symbols.json`).

Each `<g id="...">` in the export (skipping Affinity's duplicate placements,
which carry a serif:id attribute) becomes one <symbol>. All nested matrix
transforms are baked into the path coordinates, the whole thing is rescaled so
the library's drawing grid becomes GRID px, and the symbol is translated so its
bounding box starts at a grid point at the origin. Because the library was drawn
on the grid, this keeps every pin end on a grid point.

Run with:  uv run --with svgelements python libraries/build_symbols.py
"""
import json, math, re
from xml.sax.saxutils import escape
from pathlib import Path as FsPath
from svgelements import SVG, Group, Path, Text, Shape, Matrix, Point

HERE = FsPath(__file__).parent
SRC = HERE / 'electronic-components.svg'
OUT_SVG = HERE / 'symbols.svg'
OUT_JSON = HERE / 'symbols.json'

RAW_GRID = 23.622 * 0.64        # one library grid step in export px (=15.118)
HALF = RAW_GRID / 2             # library uses half-grid offsets too
GRID = 10.0                     # target px per library grid step
K = GRID / RAW_GRID             # scale factor
SERIF_ID = '{http://www.serif.com/}id'
BLUE = '#3465a4'                # rgb(52,101,164) library stroke colour
# Per-symbol origin nudges (in target px) where the automatic pin-alignment
# heuristic picks the wrong parity, e.g. the LED's stem sits on the half grid.
ORIGIN_NUDGE = {'diode-led': (-5, 0)}
# Hand-defined symbols that are not in the Affinity library. Geometry is centred on
# the origin so `translate(x,y)` puts the feature exactly at (x,y); the snapbox keeps
# Inkscape's visual bbox on the grid. (name, body, w, h, pins)
EXTRA_SYMBOLS = [
    ('junction',
     '    <rect class="snapbox" x="-10" y="-10" width="20" height="20" fill="none" stroke="none"/>\n'
     '    <circle cx="0" cy="0" r="4.5" fill="currentColor" stroke="none"/>',
     0, 0, [(0, 0)]),
]

def fmt(v):
    v = round(v, 2)
    return str(int(v)) if v == int(v) else f'{v:.2f}'.rstrip('0').rstrip('.')

def snap(v, step):
    return math.floor(v / step + 1e-6) * step

def collect(group, out):
    for e in group:
        if isinstance(e, Group):
            collect(e, out)
        elif isinstance(e, (Path, Shape, Text)):
            out.append(e)

def color(c):
    if c is None or c.value is None:
        return 'none'
    return c.hex if c.hex != BLUE else 'currentColor'

def main():
    svg = SVG.parse(str(SRC), reify=True)
    symbols = {}

    def find(group):
        for e in group:
            if isinstance(e, Group):
                sid = e.values.get('id')
                if sid and SERIF_ID not in e.values and not re.search(r'\d$', sid) and sid not in symbols:
                    symbols[sid] = e
                else:
                    find(e)
    find(svg)

    sym_xml, index = [], {}
    for sid, g in sorted(symbols.items()):
        elems = []
        collect(g, elems)
        shapes = [e for e in elems if isinstance(e, (Path, Shape)) and not isinstance(e, Text)]
        texts = [e for e in elems if isinstance(e, Text)]
        paths = []
        for s in shapes:
            p = s if isinstance(s, Path) else Path(s)
            p.reify()
            if len(p) == 0:
                continue
            paths.append((p, s))
        if not paths and not texts:
            continue
        # bbox over paths (texts excluded: their metrics are unreliable)
        xs, ys = [], []
        for p, _ in paths:
            bb = p.bbox()
            if bb: xs += [bb[0], bb[2]]; ys += [bb[1], bb[3]]
        if not xs:
            continue
        # Some symbols sit off-grid in the Affinity file. Find the dominant sub-grid
        # residual of open-path endpoints and shift so they land on the half-grid.
        from collections import Counter
        rx, ry = Counter(), Counter()
        for p, s in paths:
            if s.stroke is None or s.stroke.value is None: continue
            for sub in p.as_subpaths():
                sp = Path(sub)
                if sp.d().strip().upper().endswith('Z'): continue
                for pt in (sp.first_point, sp.current_point):
                    if pt is None: continue
                    rx[round((pt.x % HALF), 1) % round(HALF, 1)] += 1
                    ry[round((pt.y % HALF), 1) % round(HALF, 1)] += 1
        dx = rx.most_common(1)[0][0] if rx else 0.0
        dy = ry.most_common(1)[0][0] if ry else 0.0
        x0, y0 = snap(min(xs) - dx + 1e-3, RAW_GRID) + dx, snap(min(ys) - dy + 1e-3, RAW_GRID) + dy
        # Prefer an origin that puts the majority of endpoints on the FULL grid
        # (multiples of GRID), even if that leaves the geometry starting at GRID/2.
        def majority_on_half(vals, o):
            on5 = sum(1 for v in vals if abs(((v - o) * K) % GRID - GRID/2) < 0.3)
            on0 = sum(1 for v in vals if ((v - o) * K) % GRID < 0.3 or ((v - o) * K) % GRID > GRID - 0.3)
            return on5 > on0
        epx, epy = [], []
        for p, s in paths:
            if s.stroke is None or s.stroke.value is None: continue
            for sub in p.as_subpaths():
                sp = Path(sub)
                if sp.d().strip().upper().endswith('Z'): continue
                for pt in (sp.first_point, sp.current_point):
                    if pt is not None: epx.append(pt.x); epy.append(pt.y)
        # only endpoints near the outer edges are real pins; ignore internal geometry
        edge_x = [v for v in epx if min(abs(v - min(xs)), abs(v - max(xs))) < HALF + 0.5]
        edge_y = [v for v in epy if min(abs(v - min(ys)), abs(v - max(ys))) < HALF + 0.5]
        if majority_on_half(edge_x, x0): x0 -= HALF
        if majority_on_half(edge_y, y0): y0 -= HALF
        nx, ny = ORIGIN_NUDGE.get(sid, (0, 0))
        x0 += nx / K; y0 += ny / K
        x1, y1 = max(xs), max(ys)
        w, h = math.ceil((x1 - x0) * K / GRID - 1e-3) * GRID, math.ceil((y1 - y0) * K / GRID - 1e-3) * GRID
        M = Matrix.translate(-x0, -y0) * Matrix.scale(K)

        body, pins = [], set()
        body.append(f'    <rect class="snapbox" x="{fmt(-GRID)}" y="{fmt(-GRID)}" width="{fmt(w + 2*GRID)}" height="{fmt(h + 2*GRID)}" fill="none" stroke="none"/>')
        for p, s in paths:
            q = Path(p) * M
            q.reify()
            fill, stroke = color(s.fill), color(s.stroke)
            sw = (s.stroke_width or 0) * K
            # library strokes are all ~2.7px at export scale -> normalise into classes
            cls = []
            if stroke != 'none':
                cls.append('sw-thick' if sw > 2.2 else 'sw')
            d = re.sub(r'-?\d+\.?\d*(?:e-?\d+)?', lambda m: fmt(float(m.group())), q.d(relative=False, transformed=True))
            attrs = f'd="{d}"'
            attrs += f' fill="{fill}" stroke="{stroke}"'
            if cls: attrs += f' class="{" ".join(cls)}"'
            body.append(f'    <path {attrs}/>')
            # candidate pins: endpoints of open subpaths lying on the bbox edge, on the half-grid
            if stroke != 'none':
                for sub in re.split(r'(?=M)', d):
                    sub = sub.strip()
                    if not sub or sub.endswith('Z'):
                        continue
                    nums = [float(v) for v in re.findall(r'-?\d+\.?\d*', sub)]
                    for x, y in ((nums[0], nums[1]), (nums[-2], nums[-1])):
                        on_edge = min(abs(x), abs(y), abs(x - w), abs(y - h)) < GRID/2 + 0.6
                        on_grid = abs(x / 5 - round(x / 5)) < 0.05 and abs(y / 5 - round(y / 5)) < 0.05
                        if on_edge and on_grid:
                            pins.add((round(x), round(y)))
        for t in texts:
            tm = (t.transform or Matrix()) * M
            pt = tm.point_in_matrix_space(Point(t.x or 0, t.y or 0))
            fs = (t.font_size or 12) * math.sqrt(abs(tm.determinant))
            fill = color(t.fill)
            fa = f' fill="{fill}"'
            body.append(f'    <text x="{fmt(pt.x)}" y="{fmt(pt.y)}" font-size="{fmt(fs)}"{fa}>{escape(t.text if t.text else "")}</text>')

        sym_xml.append(f'  <symbol id="{sid}" overflow="visible">\n' + '\n'.join(body) + '\n  </symbol>')
        index[sid] = {'w': w, 'h': h, 'pins': sorted(pins)}

    for sid, body, w, h, pins in EXTRA_SYMBOLS:
        sym_xml.append(f'  <symbol id="{sid}" overflow="visible">\n' + body + '\n  </symbol>')
        index[sid] = {'w': w, 'h': h, 'pins': pins}

    header = f'''<?xml version="1.0" encoding="UTF-8"?>
<!-- GENERATED by build_symbols.py from electronic-components.svg. Do not hand-edit.
     Grid: {GRID:g} px per library grid step. Symbol geometry sits in [0,w]x[0,h] (see symbols.json for size and pin ends).
     Each symbol also carries an invisible 'snapbox' rect padded by one grid step, so in Inkscape the clone's
     visual bounding box is exactly (-{GRID:g},-{GRID:g})-(w+{GRID:g},h+{GRID:g}) and snaps cleanly to the grid.
     Use with: <use href="#resistor-american" transform="translate(x,y)"/> -->
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="0" height="0" color="{BLUE}">
  <style>
    .sw {{ stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }}
    .sw-thick {{ stroke-width: 2.6; stroke-linecap: round; stroke-linejoin: round; }}
    text {{ font-family: Arial, Helvetica, sans-serif; }}
  </style>
'''
    OUT_SVG.write_text(header + '\n'.join(sym_xml) + '\n</svg>\n', encoding='utf-8', newline='\n')
    OUT_JSON.write_text(json.dumps(index, indent=1), encoding='utf-8', newline='\n')
    print(f'{len(index)} symbols -> {OUT_SVG.name}, {OUT_JSON.name}')

if __name__ == '__main__':
    main()
