"""Build entity-relationship diagrams for the Latimer Core Data Package.

Reads every table schema in ltc-dp/table-schemas, derives the relationships
from the declared foreign keys, and writes to docs/diagrams/:

  ltc-dp-erd.svg / .png         all 106 tables (entity + junction), crow's-foot notation
  ltc-dp-erd-slide.svg / .png   16:9 presentation version: the entity tables only, with
                                junction tables collapsed into many-to-many lines and the
                                three cross-cutting tables (identifier, reference,
                                measurement-or-fact) summarised in a strip at the bottom

PNG rasterisation uses headless Chrome (path in CHROME below).

Usage:  python src/build-erd.py
"""
import glob
import json
import os
import subprocess
from collections import defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
SCHEMA_DIR = os.path.join(ROOT, "ltc-dp", "table-schemas")
OUT_DIR = os.path.join(ROOT, "docs", "diagrams")
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
FONT = "Helvetica, Arial, sans-serif"

HUBS = ["identifier", "reference", "measurement-or-fact"]


# --------------------------------------------------------------------------- model
def load_model():
    tables = {}
    for path in sorted(glob.glob(os.path.join(SCHEMA_DIR, "*.json"))):
        with open(path, encoding="utf-8") as fh:
            tables[os.path.basename(path)[:-5]] = json.load(fh)
    entities = sorted(n for n, t in tables.items() if t.get("primaryKey"))
    junctions = sorted(n for n, t in tables.items() if not t.get("primaryKey"))
    one_to_many = []   # (parent, child, is_self)
    many_to_many = []  # (junction, owner_entity, target_entity)
    for name in entities:
        for fk in tables[name].get("foreignKeys", []):
            parent = fk["reference"]["resource"] or name
            one_to_many.append((parent, name, parent == name))
    for name in junctions:
        fks = tables[name]["foreignKeys"]
        assert len(fks) == 2 and name.startswith(fks[0]["reference"]["resource"]), name
        many_to_many.append((name, fks[0]["reference"]["resource"], fks[1]["reference"]["resource"]))
    return entities, junctions, one_to_many, many_to_many


# ----------------------------------------------------------------------- svg utils
def text_width(s, size, bold=False):
    w = 0.0
    for ch in s:
        if ch in "iljtf.,:;'|!":
            w += 0.30
        elif ch in "mw":
            w += 0.85
        elif ch in "MW":
            w += 0.95
        elif ch == "-":
            w += 0.36
        elif ch == " ":
            w += 0.28
        elif ch.isupper():
            w += 0.68
        else:
            w += 0.56
    return w * size * (1.06 if bold else 1.0)


def mark(kind, px, py, ux, uy, color, scale=1.0):
    """Crow's-foot end mark at box-edge point (px,py); (ux,uy) points away from the box."""
    L, W, R = 14 * scale, 6 * scale, 4 * scale
    qx, qy = -uy, ux
    out = []
    sw = 1.4 * scale

    def ln(x1, y1, x2, y2):
        out.append(f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" '
                   f'stroke="{color}" stroke-width="{sw:.1f}" stroke-linecap="round"/>')

    def circ(d):
        out.append(f'<circle cx="{px+ux*d:.1f}" cy="{py+uy*d:.1f}" r="{R:.1f}" fill="#fff" '
                   f'stroke="{color}" stroke-width="{sw:.1f}"/>')

    def tick(d):
        ln(px + ux * d - qx * W, py + uy * d - qy * W, px + ux * d + qx * W, py + uy * d + qy * W)

    if kind == "many":            # o{  zero or many
        ax, ay = px + ux * L, py + uy * L
        ln(ax, ay, px + qx * W, py + qy * W)
        ln(ax, ay, px, py)
        ln(ax, ay, px - qx * W, py - qy * W)
        circ(L + R + 1)
    elif kind == "one":           # ||  exactly one
        tick(7 * scale)
        tick(13 * scale)
    elif kind == "zero_one":      # o|  zero or one
        tick(8 * scale)
        circ(8 * scale + 2 + R + 3)
    return "\n".join(out)


def box(x, y, w, h, label, fill, stroke, fontsize, bold=False, dashed=False, sw=1.2, color="#111", rx=4):
    dash = ' stroke-dasharray="6 4"' if dashed else ""
    weight = ' font-weight="bold"' if bold else ""
    return (f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" rx="{rx}" fill="{fill}" '
            f'stroke="{stroke}" stroke-width="{sw}"{dash}/>'
            f'<text x="{x + w/2:.1f}" y="{y + h/2:.1f}" text-anchor="middle" dominant-baseline="central" '
            f'font-family="{FONT}" font-size="{fontsize}"{weight} fill="{color}">{label}</text>')


def svg_doc(w, h, body):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">\n'
            f'<rect width="{w}" height="{h}" fill="#ffffff"/>\n{body}\n</svg>\n')


# palette for referenced ("target") tables in the full diagram
CHANNEL_COLORS = {
    "identifier": "#1f77b4", "reference": "#d62728", "measurement-or-fact": "#2ca02c",
    "person-role": "#9467bd", "address": "#ff7f0e", "contact-detail": "#8c564b",
    "temporal-coverage": "#17a2b8", "object-group": "#e377c2", "resource-relationship": "#8a8f00",
    "ecological-context": "#5c6b1e", "geographic-context": "#393b79", "person": "#a0522d",
    "role": "#2f7f6f", "latimer-core-scheme": "#b8860b",
}
ENT_FILL, ENT_STROKE, ENT_TEXT = "#dbe7f5", "#1f4e79", "#0b2540"
JUN_FILL, JUN_STROKE, JUN_TEXT = "#f5f5f5", "#9a9a9a", "#333333"
TREE = "#6b6b6b"


# ----------------------------------------------------------------- full diagram
def build_full(entities, junctions, o2m, m2m):
    owned = defaultdict(list)
    for j, owner, tgt in m2m:
        owned[owner].append(j)
    self_ref = {child for parent, child, is_self in o2m if is_self}

    left_col = ["object-group", "event", "ecological-context", "geographic-context", "geological-context",
                "chronometric-age", "taxon", "object-classification", "collection-status-history",
                "storage-location", "temporal-coverage"]
    right_col = ["record-level", "resource-relationship", "organisational-unit", "person-role", "person",
                 "role", "address", "contact-detail", "latimer-core-scheme", "scheme-term",
                 "scheme-measurement-or-fact", "identifier", "reference", "measurement-or-fact"]
    assert sorted(left_col + right_col) == entities

    # ---- geometry
    FS_E, FS_J = 12, 11
    ROW_E, ROW_J, GAP, INDENT, PAD = 30, 24, 22, 44, 18
    TOP, MARGIN = 136, 40
    CH_STEP = 24

    def block_width(e):
        w = text_width(e, FS_E, True) + PAD
        for j in owned[e]:
            w = max(w, INDENT + text_width(j, FS_J) + PAD)
        return w

    colw = {"L": max(block_width(e) for e in left_col), "R": max(block_width(e) for e in right_col)}

    col_of = {e: "L" for e in left_col} | {e: "R" for e in right_col}
    for j, owner, tgt in m2m:
        col_of[j] = col_of[owner]

    # channel (referenced table) ordering: tables referenced mostly from the left go nearest the left
    refs = defaultdict(list)  # target -> list of source tables
    for j, owner, tgt in m2m:
        refs[tgt].append(j)
    for parent, child, is_self in o2m:
        if not is_self:
            refs[parent].append(child)
    score = {t: sum(1 if col_of[s] == "L" else -1 for s in srcs) for t, srcs in refs.items()}
    channels = sorted(refs, key=lambda t: (-score[t], -len(refs[t]), t))
    for t in channels:
        assert t in CHANNEL_COLORS, t

    gutter_x0 = MARGIN + colw["L"] + 36
    ch_x = {t: gutter_x0 + i * CH_STEP for i, t in enumerate(channels)}
    gutter_x1 = gutter_x0 + (len(channels) - 1) * CH_STEP + 36
    right_edge = gutter_x1 + colw["R"]
    width = right_edge + MARGIN

    # ---- place boxes: name -> (x, y, w, h)
    pos = {}
    for col, names in (("L", left_col), ("R", right_col)):
        y = TOP
        for e in names:
            ew, eh = text_width(e, FS_E, True) + PAD, ROW_E - 6
            x = MARGIN if col == "L" else right_edge - ew
            pos[e] = (x, y, ew, eh)
            y += ROW_E
            for j in owned[e]:
                jw, jh = text_width(j, FS_J) + PAD, ROW_J - 6
                x = MARGIN + INDENT if col == "L" else right_edge - INDENT - jw
                pos[j] = (x, y, jw, jh)
                y += ROW_J
            y += GAP
    height = max(y for x, y, w, h in pos.values()) + 40 + 60

    # ---- ports on the gutter-facing edge: list of (kind, channel) per box
    ports = defaultdict(list)
    for t in channels:
        ports[t].append(("one", t))               # trunk of its own channel enters here
    for j, owner, tgt in m2m:
        ports[j].append(("many", tgt))
    for parent, child, is_self in o2m:
        if not is_self:
            ports[child].append(("many", parent))

    lines, marks, dots = [], [], []
    ch_span = {t: [pos[t][1] + pos[t][3] / 2] * 2 for t in channels}
    for name, plist in ports.items():
        plist.sort(key=lambda p: ch_x[p[1]])
        n = len(plist)
        for i, (kind, ch) in enumerate(plist):
            x, y, w, h = pos[name]
            py = y + h * (i + 1) / (n + 1)
            if col_of[name] == "L":
                ex, ux = x + w, 1
            else:
                ex, ux = x, -1
            cx = ch_x[ch]
            color = CHANNEL_COLORS[ch]
            lines.append(f'<line x1="{ex:.1f}" y1="{py:.1f}" x2="{cx:.1f}" y2="{py:.1f}" stroke="{color}" stroke-width="1.3"/>')
            marks.append(mark(kind, ex, py, ux, 0, color))
            if kind == "many":
                dots.append(f'<circle cx="{cx:.1f}" cy="{py:.1f}" r="2.4" fill="{color}"/>')
            lo, hi = ch_span[ch]
            ch_span[ch] = [min(lo, py), max(hi, py)]
    trunks = []
    for t in channels:
        lo, hi = ch_span[t]
        trunks.append(f'<line x1="{ch_x[t]:.1f}" y1="{lo:.1f}" x2="{ch_x[t]:.1f}" y2="{hi:.1f}" '
                      f'stroke="{CHANNEL_COLORS[t]}" stroke-width="1.8"/>')

    # ---- owner -> junction trees and self loops
    trees = []
    for e in entities:
        x, y, w, h = pos[e]
        if owned[e]:
            tx = x + 12 if col_of[e] == "L" else x + w - 12
            last = pos[owned[e][-1]]
            ly = last[1] + last[3] / 2
            trees.append(f'<line x1="{tx:.1f}" y1="{y + h:.1f}" x2="{tx:.1f}" y2="{ly:.1f}" stroke="{TREE}" stroke-width="1.3"/>')
            marks.append(mark("one", tx, y + h, 0, 1, TREE))
            for j in owned[e]:
                jx, jy, jw, jh = pos[j]
                jc = jy + jh / 2
                if col_of[e] == "L":
                    trees.append(f'<line x1="{tx:.1f}" y1="{jc:.1f}" x2="{jx:.1f}" y2="{jc:.1f}" stroke="{TREE}" stroke-width="1.3"/>')
                    marks.append(mark("many", jx, jc, -1, 0, TREE))
                else:
                    trees.append(f'<line x1="{tx:.1f}" y1="{jc:.1f}" x2="{jx + jw:.1f}" y2="{jc:.1f}" stroke="{TREE}" stroke-width="1.3"/>')
                    marks.append(mark("many", jx + jw, jc, 1, 0, TREE))
        if e in self_ref:  # loop on the outer edge
            d = 30
            if col_of[e] == "L":
                ox, ux = x, -1
            else:
                ox, ux = x + w, 1
            y1, y2 = y + 6, y + h - 6
            trees.append(f'<polyline points="{ox:.1f},{y1:.1f} {ox + ux*d:.1f},{y1:.1f} {ox + ux*d:.1f},{y2:.1f} {ox:.1f},{y2:.1f}" '
                         f'fill="none" stroke="{TREE}" stroke-width="1.3"/>')
            marks.append(mark("zero_one", ox, y1, ux, 0, TREE))
            marks.append(mark("many", ox, y2, ux, 0, TREE))

    # ---- boxes
    boxes = []
    for e in entities:
        x, y, w, h = pos[e]
        stroke = CHANNEL_COLORS.get(e, ENT_STROKE)
        boxes.append(box(x, y, w, h, e, ENT_FILL, stroke, FS_E, bold=True, sw=1.8, color=ENT_TEXT))
    for j in junctions:
        x, y, w, h = pos[j]
        boxes.append(box(x, y, w, h, j, JUN_FILL, JUN_STROKE, FS_J, color=JUN_TEXT))

    # ---- title, legend
    head = [f'<text x="{MARGIN}" y="42" font-family="{FONT}" font-size="22" font-weight="bold" fill="#111">'
            f'Latimer Core Data Package — table relationships</text>',
            f'<text x="{MARGIN}" y="64" font-family="{FONT}" font-size="12.5" fill="#444">'
            f'{len(entities)} entity tables (primary key) and {len(junctions)} junction tables (two foreign keys, no primary key). '
            f'Each junction table hangs beneath the entity that owns it (grey tree);</text>',
            f'<text x="{MARGIN}" y="80" font-family="{FONT}" font-size="12.5" fill="#444">'
            f'its second foreign key runs to the coloured trunk of the table it references. Lines of one colour join '
            f'(&#9679;) a trunk that enters the referenced table. Loops are self references.</text>']
    lx, ly = MARGIN, 98
    leg = [box(lx, ly, 96, 20, "entity table", ENT_FILL, ENT_STROKE, 11, bold=True, sw=1.6, color=ENT_TEXT),
           box(lx + 106, ly, 104, 20, "junction table", JUN_FILL, JUN_STROKE, 10, color=JUN_TEXT)]
    cx0 = lx + 240
    for kind, label in (("one", "exactly one"), ("zero_one", "zero or one"), ("many", "zero or many")):
        leg.append(f'<line x1="{cx0}" y1="{ly+10}" x2="{cx0+34}" y2="{ly+10}" stroke="#333" stroke-width="1.3"/>')
        leg.append(mark(kind, cx0, ly + 10, 1, 0, "#333"))
        leg.append(f'<text x="{cx0+40}" y="{ly+10}" dominant-baseline="central" font-family="{FONT}" '
                   f'font-size="11.5" fill="#333">{label}</text>')
        cx0 += 40 + text_width(label, 11.5) + 22
    foot = [f'<text x="{MARGIN}" y="{height-22}" font-family="{FONT}" font-size="11" fill="#666">'
            f'Source: ltc-dp/table-schemas (foreign keys). Generated by src/build-erd.py.</text>']

    body = "\n".join(head + leg + trunks + lines + dots + trees + boxes + marks + foot)
    return svg_doc(int(width), int(height), body), int(width), int(height)


# ---------------------------------------------------------------- slide diagram
def build_slide(entities, junctions, o2m, m2m):
    W, H = 1920, 1080
    FS = 17
    BH = 46
    PADX = 26
    LINE = "#3a3a3a"

    # hand layout (centre points) for the 22 non-hub entity tables
    centre = {
        "scheme-term": (150, 200), "scheme-measurement-or-fact": (150, 340), "latimer-core-scheme": (430, 290),
        "record-level": (860, 130), "resource-relationship": (650, 300),
        "taxon": (330, 440), "chronometric-age": (330, 540), "geological-context": (330, 640),
        "object-classification": (330, 760),
        "object-group": (860, 500),
        "collection-status-history": (560, 860), "storage-location": (930, 860), "temporal-coverage": (1300, 680),
        "ecological-context": (985, 300), "geographic-context": (1300, 270),
        "event": (1230, 540),
        "person-role": (1500, 470), "person": (1790, 330), "role": (1830, 190),
        "organisational-unit": (1520, 878), "address": (1850, 790), "contact-detail": (1640, 690),
    }
    size = {"object-group": (300, 84), "event": (170, 56), "person-role": (190, 56)}
    pos = {}
    for n, (cx, cy) in centre.items():
        w, h = size.get(n, (text_width(n, FS, True) + PADX, BH))
        pos[n] = (cx - w / 2, cy - h / 2, w, h)

    hubset = set(HUBS)
    rels = []  # (a, kind_a, b, kind_b)
    for parent, child, is_self in o2m:
        if not is_self:
            rels.append((parent, "one", child, "many"))
    for j, owner, tgt in m2m:
        if owner in hubset or tgt in hubset:
            continue
        rels.append((owner, "many", tgt, "many"))
    selfs = {child for parent, child, is_self in o2m if is_self}

    def side_of(name, tx, ty):
        """Which side of the box faces point (tx,ty), plus a sort key along that side."""
        x, y, w, h = pos[name]
        cx, cy = x + w / 2, y + h / 2
        dx, dy = tx - cx, ty - cy
        sx = (w / 2) / abs(dx) if dx else float("inf")
        sy = (h / 2) / abs(dy) if dy else float("inf")
        if sx < sy:
            return ("right" if dx > 0 else "left"), dy / abs(dx)
        return ("bottom" if dy > 0 else "top"), dx / abs(dy)

    # collect the line ends on each box side, then spread them along the side
    wants = defaultdict(list)  # (name, side) -> [(sortkey, rel_index, end)]
    for i, (a, ka, b, kb) in enumerate(rels):
        ax, ay, aw, ah = pos[a]
        bx, by, bw, bh = pos[b]
        sa, key_a = side_of(a, bx + bw / 2, by + bh / 2)
        sb, key_b = side_of(b, ax + aw / 2, ay + ah / 2)
        wants[(a, sa)].append((key_a, i, 0))
        wants[(b, sb)].append((key_b, i, 1))
    port = {}  # (rel_index, end) -> (px, py)
    for (name, side), lst in wants.items():
        lst.sort()
        x, y, w, h = pos[name]
        n = len(lst)
        if side in ("left", "right"):
            length, c0 = h, y + h / 2
        else:
            length = w - (52 if (name in selfs and side == "top") else 0)
            c0 = x + length / 2
        spacing = min(34, (length - 16) / max(n, 1))
        for k, (_, i, end) in enumerate(lst):
            off = (k - (n - 1) / 2) * spacing
            if side == "left":
                port[(i, end)] = (x, c0 + off)
            elif side == "right":
                port[(i, end)] = (x + w, c0 + off)
            elif side == "top":
                port[(i, end)] = (c0 + off, y)
            else:
                port[(i, end)] = (c0 + off, y + h)

    def seg_hits_box(x1, y1, x2, y2, name, margin=6):
        x, y, w, h = pos[name]
        x, y, w, h = x - margin, y - margin, w + 2 * margin, h + 2 * margin
        for i in range(1, 80):
            t = i / 80
            px, py = x1 + (x2 - x1) * t, y1 + (y2 - y1) * t
            if x <= px <= x + w and y <= py <= y + h:
                return True
        return False

    lines, marks, problems = [], [], []
    for i, (a, ka, b, kb) in enumerate(rels):
        pax, pay = port[(i, 0)]
        pbx, pby = port[(i, 1)]
        d = ((pbx - pax) ** 2 + (pby - pay) ** 2) ** 0.5
        ux, uy = (pbx - pax) / d, (pby - pay) / d
        lines.append(f'<line x1="{pax:.1f}" y1="{pay:.1f}" x2="{pbx:.1f}" y2="{pby:.1f}" stroke="{LINE}" stroke-width="1.8"/>')
        marks.append(mark(ka, pax, pay, ux, uy, LINE, scale=1.35))
        marks.append(mark(kb, pbx, pby, -ux, -uy, LINE, scale=1.35))
        for other in pos:
            if other not in (a, b) and seg_hits_box(pax, pay, pbx, pby, other):
                problems.append(f"{a} -- {b} crosses {other}")
    for s in sorted(selfs):  # loop on the top edge, right-hand end
        x, y, w, h = pos[s]
        x1, x2, top = x + w - 44, x + w - 12, y - 34
        lines.append(f'<polyline points="{x1:.1f},{y:.1f} {x1:.1f},{top:.1f} {x2:.1f},{top:.1f} {x2:.1f},{y:.1f}" '
                     f'fill="none" stroke="{LINE}" stroke-width="1.8"/>')
        marks.append(mark("zero_one", x1, y, 0, -1, LINE, scale=1.2))
        marks.append(mark("many", x2, y, 0, -1, LINE, scale=1.2))

    boxes = []
    for n, (x, y, w, h) in pos.items():
        fill, stroke, fs = ENT_FILL, ENT_STROKE, FS
        if n == "object-group":
            fill, stroke, fs = "#c5d9ef", "#0b2540", 21
        boxes.append(box(x, y, w, h, n, fill, stroke, fs, bold=True, sw=2, color=ENT_TEXT, rx=6))

    # ---- bottom strip: cross-cutting hub tables
    counts = {h: 0 for h in HUBS}
    for j, owner, tgt in m2m:
        if tgt in hubset:
            counts[tgt] += 1
        elif owner in hubset:
            counts[owner] += 1
    sy = 955
    strip = [f'<line x1="60" y1="{sy-28}" x2="{W-60}" y2="{sy-28}" stroke="#c8c8c8" stroke-width="1.5"/>',
             f'<text x="60" y="{sy+14}" font-family="{FONT}" font-size="15" fill="#333">'
             f'<tspan font-weight="bold">Cross-cutting tables</tspan> — linked many-to-many (through junction tables, '
             f'not shown) to most of the tables above and to each other:</text>']
    sx = 60
    ry = sy + 36
    for hname in HUBS:
        aw = text_width("any table above", FS - 2) + 22
        strip.append(box(sx, ry, aw, 40, "any table above", "#ffffff", "#888", FS - 2, dashed=True, color="#444"))
        lx1, lx2 = sx + aw, sx + aw + 90
        strip.append(f'<line x1="{lx1}" y1="{ry+20}" x2="{lx2}" y2="{ry+20}" stroke="{LINE}" stroke-width="1.8"/>')
        strip.append(mark("many", lx1, ry + 20, 1, 0, LINE, scale=1.35))
        strip.append(mark("many", lx2, ry + 20, -1, 0, LINE, scale=1.35))
        hw = text_width(hname, FS, True) + PADX
        strip.append(box(lx2, ry - 3, hw, BH, hname, "#fdf1d2", "#8a5a00", FS, bold=True, sw=2, color="#3b2600", rx=6))
        strip.append(f'<text x="{lx2 + hw + 12}" y="{ry+20}" dominant-baseline="central" font-family="{FONT}" '
                     f'font-size="14" fill="#555">{counts[hname]} tables</text>')
        sx = lx2 + hw + 12 + text_width(f"{counts[hname]} tables", 14) + 70

    # legend (top right)
    lg = []
    lx, ly = W - 60 - 420, 40
    for kind, label in (("one", "exactly one"), ("zero_one", "zero or one"), ("many", "zero or many")):
        lg.append(f'<line x1="{lx}" y1="{ly}" x2="{lx+40}" y2="{ly}" stroke="#333" stroke-width="1.8"/>')
        lg.append(mark(kind, lx, ly, 1, 0, "#333", scale=1.35))
        lg.append(f'<text x="{lx+48}" y="{ly}" dominant-baseline="central" font-family="{FONT}" font-size="14" fill="#333">{label}</text>')
        lx += 48 + text_width(label, 14) + 26

    head = [f'<text x="60" y="58" font-family="{FONT}" font-size="34" font-weight="bold" fill="#111">Latimer Core Data Package</text>',
            f'<text x="60" y="86" font-family="{FONT}" font-size="17" fill="#555">Entity tables and how they relate '
            f"(crow's-foot notation)</text>"]
    body = "\n".join(head + lg + lines + boxes + marks + strip)
    return svg_doc(W, H, body), problems


# ------------------------------------------------------------------- rasterise
def svg_to_png(svg_path, png_path, width, height, scale=2):
    html = svg_path[:-4] + ".tmp.html"
    with open(html, "w", encoding="utf-8") as fh:
        fh.write(f'<html><body style="margin:0;background:#fff"><img src="{os.path.basename(svg_path)}" '
                 f'style="display:block;width:{width}px;height:{height}px"></body></html>')
    subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--no-sandbox", "--hide-scrollbars",
                    f"--force-device-scale-factor={scale}", f"--window-size={width},{height}",
                    f"--screenshot={png_path}", "file:///" + os.path.abspath(html).replace("\\", "/")],
                   check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    os.remove(html)


if __name__ == "__main__":
    os.makedirs(OUT_DIR, exist_ok=True)
    entities, junctions, o2m, m2m = load_model()
    print(f"{len(entities)} entity tables, {len(junctions)} junction tables, "
          f"{len(o2m)} one-to-many, {len(m2m)} many-to-many")

    svg, w, h = build_full(entities, junctions, o2m, m2m)
    p = os.path.join(OUT_DIR, "ltc-dp-erd.svg")
    with open(p, "w", encoding="utf-8") as fh:
        fh.write(svg)
    svg_to_png(p, os.path.join(OUT_DIR, "ltc-dp-erd.png"), w, h)
    print(f"full diagram {w}x{h}")

    svg, problems = build_slide(entities, junctions, o2m, m2m)
    p = os.path.join(OUT_DIR, "ltc-dp-erd-slide.svg")
    with open(p, "w", encoding="utf-8") as fh:
        fh.write(svg)
    svg_to_png(p, os.path.join(OUT_DIR, "ltc-dp-erd-slide.png"), 1920, 1080)
    print("slide diagram 1920x1080")
    for pr in problems:
        print("  slide: line", pr)
