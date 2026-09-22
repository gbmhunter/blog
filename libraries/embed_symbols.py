"""
Sync the <defs id="symbols"> block of one or more diagram SVGs with symbols.svg.

For every `<use href="#foo">` / `xlink:href="#foo"` in the diagram, the matching
<symbol> (and the shared symbol <style>) is copied from symbols.svg into a
<defs id="symbols"> block, replacing whatever was there. Symbols no longer
referenced are dropped. Diagrams stay self-contained for the browser and for
Inkscape, and re-running this after a library change refreshes them.

Run with:  python libraries/embed_symbols.py path/to/diagram.svg [...]
"""
import re
import sys
from pathlib import Path

LIB = Path(__file__).parent / 'symbols.svg'


def load_library():
    lib = LIB.read_text(encoding='utf-8')
    style = re.search(r'<style>.*?</style>', lib, re.S).group(0)
    syms = {m.group(1): m.group(0)
            for m in re.finditer(r'<symbol id="([^"]+)".*?</symbol>', lib, re.S)}
    return style, syms


def sync(path, style, syms):
    src = Path(path).read_text(encoding='utf-8')
    refs = sorted(set(re.findall(r'href="#([^"]+)"', src)))
    used = [r for r in refs if r in syms]
    block = ('<defs id="symbols"><!-- GENERATED from libraries/symbols.svg by embed_symbols.py; do not hand-edit -->\n'
             + '  ' + style.replace('\n', '\n  ') + '\n'
             + '\n'.join(syms[r] for r in used) + '\n</defs>')
    if re.search(r'<defs id="symbols">.*?</defs>', src, re.S):
        out = re.sub(r'<defs id="symbols">.*?</defs>', lambda _: block, src, count=1, flags=re.S)
    else:
        out = re.sub(r'(<svg\b[^>]*>\s*)', lambda m: m.group(1) + block + '\n', src, count=1)
    Path(path).write_text(out, encoding='utf-8', newline='\n')
    unknown = [r for r in refs if r not in syms]
    print(f'{path}: embedded {len(used)} symbols'
          + (f'; refs not in library (markers etc.): {unknown}' if unknown else ''))


if __name__ == '__main__':
    style, syms = load_library()
    for p in sys.argv[1:]:
        sync(p, style, syms)
