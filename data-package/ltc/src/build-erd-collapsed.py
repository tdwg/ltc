"""Build entity-relationship diagrams for the collapsed Latimer Core Data Package (ltc-dp-collapsed).

Reads every table schema in ltc-dp-collapsed/table-schemas, derives the 97 one-to-many
relations from the declared foreign keys, and writes to docs/diagrams/:

  ltc-dp-collapsed-erd.svg / .png          all 25 tables and all 97 relations, crow's-foot
                                           notation. Tables step down a diagonal so that every
                                           table has a free vertical lane above and below it and
                                           a free horizontal lane to its right; the three
                                           cross-cutting tables are drawn as bars (measurement-
                                           or-fact along the top, identifier along the bottom,
                                           reference down the right) so the 59 relations into
                                           them are straight lines that cross no table.
  ltc-dp-collapsed-erd-slide.svg / .png    16:9 presentation version: the 22 entity tables with
                                           their 38 relations, and the three cross-cutting tables
                                           summarised in a strip at the bottom.
  ltc-dp-collapsed-erd-grouped.svg / .png  16:9 version with the tables grouped by theme
                                           (collection, scope and context, agents, scheme,
                                           cross-cutting).
  ltc-dp-collapsed-erd-plain.svg / .png    the slide layout without crow's-foot notation: plain
                                           connectors only, for audiences who do not read ERDs.

All connectors are orthogonal (elbow) lines that leave and enter a table perpendicular to its
edge, so every crow's-foot mark sits flush against the table it belongs to.

Shares its drawing helpers (crow's-foot marks, boxes, rasterisation) with build-erd.py.
With --plan FILE it also writes a JSON description of every shape and connector (with the
relative attachment point of each connector end on its shape) for reproducing the diagrams in
another tool.

Usage:  python src/build-erd-collapsed.py [--plan plan.json]
"""
import argparse
import glob
import importlib.util
import json
import math
import os
import random
from collections import defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
PKG = "ltc-dp-collapsed"
SCHEMA_DIR = os.path.join(ROOT, PKG, "table-schemas")
OUT_DIR = os.path.join(ROOT, "docs", "diagrams")

_spec = importlib.util.spec_from_file_location("build_erd", os.path.join(HERE, "build-erd.py"))
be = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(be)
text_width, mark, box, svg_doc, svg_to_png, FONT = be.text_width, be.mark, be.box, be.svg_doc, be.svg_to_png, be.FONT
ENT_FILL, ENT_STROKE, ENT_TEXT = be.ENT_FILL, be.ENT_STROKE, be.ENT_TEXT

HUBS = ["identifier", "reference", "measurement-or-fact"]
HUB_COLOR = {"identifier": "#1f77b4", "reference": "#d62728", "measurement-or-fact": "#2ca02c"}
HUB_FILL = {"identifier": "#dbe7f5", "reference": "#fbe3e3", "measurement-or-fact": "#dff2df"}
GREY = "#3a3a3a"
LEGEND = (("one", "exactly one"), ("zero_one", "zero or one"), ("many", "zero or many"))
STYLE = {"one": "CFN ERD Exactly One Arrow", "zero_one": "CFN ERD Zero Or One Arrow",
         "many": "CFN ERD Zero Or More Arrow"}


# --------------------------------------------------------------------------- model
def load_model():
    tables = {}
    for path in sorted(glob.glob(os.path.join(SCHEMA_DIR, "*.json"))):
        with open(path, encoding="utf-8") as fh:
            tables[os.path.basename(path)[:-5]] = json.load(fh)
    rels = []  # (parent, child, fk field, is_self)
    for name, t in tables.items():
        assert t.get("primaryKey"), "%s has no primary key; is this the collapsed package?" % name
        for fk in t.get("foreignKeys", []):
            parent = fk["reference"]["resource"] or name
            rels.append((parent, name, fk["fields"], parent == name))
    return sorted(tables), rels


# ------------------------------------------------------------------------ plan I/O
class Plan:
    """Collects shapes and connectors for the JSON plan while the SVG is being drawn."""

    def __init__(self):
        self.shapes, self.lines, self.texts = [], [], []

    def shape(self, name, x, y, w, h, kind="entity", **kw):
        d = dict(name=name, x=round(x, 1), y=round(y, 1), w=round(w, 1), h=round(h, 1), kind=kind)
        d.update(kw)
        self.shapes.append(d)
        return d

    def line(self, a, a_pos, b, b_pos, a_kind, b_kind, color=GREY, shape="diagonal", width=1.8):
        """a/b are shape names; a_pos/b_pos are (x, y) fractions on the shape."""
        self.lines.append(dict(a=a, a_pos=[round(a_pos[0], 3), round(a_pos[1], 3)], a_style=STYLE.get(a_kind, "None"),
                               b=b, b_pos=[round(b_pos[0], 3), round(b_pos[1], 3)], b_style=STYLE.get(b_kind, "None"),
                               color=color, shape=shape, width=width))

    def text(self, x, y, s, size, bold=False, color="#333"):
        self.texts.append(dict(x=round(x, 1), y=round(y, 1), text=s, size=size, bold=bold, color=color,
                               width=round(text_width(s, size, bold), 1)))


def rel_pos(bx, x, y):
    """Fraction of a point on box bx=(x,y,w,h)."""
    X, Y, W, H = bx
    return ((x - X) / W, (y - Y) / H)


def legend(svg, x, y, size=13, scale=1.2):
    for kind, label in LEGEND:
        svg.append(f'<line x1="{x}" y1="{y}" x2="{x+36}" y2="{y}" stroke="#333" stroke-width="1.6"/>')
        svg.append(mark(kind, x, y, 1, 0, "#333", scale=scale))
        svg.append(f'<text x="{x+44}" y="{y}" dominant-baseline="central" font-family="{FONT}" '
                   f'font-size="{size}" fill="#333">{label}</text>')
        x += 44 + text_width(label, size) + 26


def polyline(pts, color, sw=1.8):
    return '<polyline points="%s" fill="none" stroke="%s" stroke-width="%s"/>' % (
        " ".join(f"{px:.1f},{py:.1f}" for px, py in pts), color, sw)


# ------------------------------------------------------------------- full diagram
ORDER = ["record-level", "latimer-core-scheme", "scheme-term", "scheme-measurement-or-fact",
         "object-group", "resource-relationship", "event", "ecological-context", "geographic-context",
         "organisational-unit", "person", "role", "person-role", "storage-location", "address",
         "contact-detail", "collection-status-history", "temporal-coverage", "taxon",
         "chronometric-age", "geological-context", "object-classification"]


def build_full(tables, rels):
    assert sorted(ORDER + HUBS) == tables
    pos_in = {n: i for i, n in enumerate(ORDER)}
    for parent, child, _, is_self in rels:
        if not is_self and parent not in HUBS and child not in HUBS:
            assert pos_in[parent] < pos_in[child], (parent, child)

    plan = Plan()
    FS, BH, ROW, STEP_GAP = 12, 32, 48, 14
    X0, TOP = 40, 120
    BAR_H = 34
    selfs = {c for p, c, _, s in rels if s}
    EXTRA = 26      # room for the self-reference loop drawn below a table
    pos = {}
    x_left = X0 + 70
    y = TOP + BAR_H + 70
    for i, n in enumerate(ORDER):
        w = text_width(n, FS, True) + 26
        if i:
            px, pyy, pw, ph = pos[ORDER[i - 1]]
            x_left = px + pw / 2 + STEP_GAP
        pos[n] = (x_left, y, w, BH)
        y += ROW + (EXTRA if n in selfs else 0)
    XR = max(x + w for x, _, w, _ in pos.values()) + 60
    IB_Y = y - ROW + BH + 60                       # identifier bar
    MB_Y = TOP                                     # measurement-or-fact bar
    REF_X, REF_W = XR + 96, 120
    pos["measurement-or-fact"] = (X0, MB_Y, XR - X0, BAR_H)
    pos["identifier"] = (X0, IB_Y, XR - X0, BAR_H)
    pos["reference"] = (REF_X, MB_Y, REF_W, IB_Y + BAR_H - MB_Y)
    W, H = REF_X + REF_W + 40, IB_Y + BAR_H + 60

    lines, marks = [], []

    def seg(x1, y1, x2, y2, color, sw=1.6):
        lines.append(f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{color}" stroke-width="{sw}"/>')

    for parent, child, fk, is_self in rels:
        cx, cy, cw, ch = pos[child]
        px, py, pw, ph = pos[parent]
        if is_self:
            x1, x2, yb = cx + 0.72 * cw, cx + 0.92 * cw, cy + ch
            lines.append(polyline([(x1, yb), (x1, yb + 13), (x2, yb + 13), (x2, yb)], GREY, 1.6))
            marks.append(mark("zero_one", x1, yb, 0, 1, GREY, 1.1))
            marks.append(mark("many", x2, yb, 0, 1, GREY, 1.1))
            plan.line(child, (0.72, 1), child, (0.92, 1), "zero_one", "many", shape="elbow")
        elif child in HUBS and parent in HUBS:
            color = HUB_COLOR[child]
            if child == "identifier" and parent == "measurement-or-fact":
                x = X0 + 22
                seg(x, MB_Y + BAR_H, x, IB_Y, color)
                marks.append(mark("one", x, MB_Y + BAR_H, 0, 1, color))
                marks.append(mark("many", x, IB_Y, 0, -1, color))
                plan.line(parent, rel_pos(pos[parent], x, MB_Y + BAR_H), child, rel_pos(pos[child], x, IB_Y), "one", "many", color)
            elif child == "reference" and parent == "measurement-or-fact":
                yy = MB_Y + BAR_H / 2
                seg(XR, yy, REF_X, yy, color)
                marks.append(mark("one", XR, yy, 1, 0, color))
                marks.append(mark("many", REF_X, yy, -1, 0, color))
                plan.line(parent, rel_pos(pos[parent], XR, yy), child, rel_pos(pos[child], REF_X, yy), "one", "many", color)
            else:  # identifier <-> reference, one line each way, near the bottom-right corner
                yy = IB_Y + (10 if child == "identifier" else 24)
                seg(XR, yy, REF_X, yy, color)
                if child == "identifier":   # parent reference: one at reference (right), many at identifier (left)
                    marks.append(mark("many", XR, yy, 1, 0, color))
                    marks.append(mark("one", REF_X, yy, -1, 0, color))
                    plan.line(parent, rel_pos(pos[parent], REF_X, yy), child, rel_pos(pos[child], XR, yy), "one", "many", color)
                else:
                    marks.append(mark("one", XR, yy, 1, 0, color))
                    marks.append(mark("many", REF_X, yy, -1, 0, color))
                    plan.line(parent, rel_pos(pos[parent], XR, yy), child, rel_pos(pos[child], REF_X, yy), "one", "many", color)
        elif child == "identifier":
            x = px + pw / 2
            seg(x, py + ph, x, IB_Y, HUB_COLOR[child])
            marks.append(mark("one", x, py + ph, 0, 1, HUB_COLOR[child]))
            marks.append(mark("many", x, IB_Y, 0, -1, HUB_COLOR[child]))
            plan.line(parent, (0.5, 1), child, rel_pos(pos[child], x, IB_Y), "one", "many", HUB_COLOR[child])
        elif child == "measurement-or-fact":
            x = px + pw / 2
            seg(x, py, x, MB_Y + BAR_H, HUB_COLOR[child])
            marks.append(mark("one", x, py, 0, -1, HUB_COLOR[child]))
            marks.append(mark("many", x, MB_Y + BAR_H, 0, 1, HUB_COLOR[child]))
            plan.line(parent, (0.5, 0), child, rel_pos(pos[child], x, MB_Y + BAR_H), "one", "many", HUB_COLOR[child])
        elif child == "reference":
            yy = py + ph / 2
            seg(px + pw, yy, REF_X, yy, HUB_COLOR[child])
            marks.append(mark("one", px + pw, yy, 1, 0, HUB_COLOR[child]))
            marks.append(mark("many", REF_X, yy, -1, 0, HUB_COLOR[child]))
            plan.line(parent, (1, 0.5), child, rel_pos(pos[child], REF_X, yy), "one", "many", HUB_COLOR[child])
        else:  # hierarchy: down the parent's lane, then along the child's row into its left edge
            x = px + 0.3 * pw
            yc = cy + ch / 2
            lines.append(polyline([(x, py + ph), (x, yc), (cx, yc)], GREY, 1.6))
            marks.append(mark("one", x, py + ph, 0, 1, GREY))
            marks.append(mark("many", cx, yc, -1, 0, GREY))
            plan.line(parent, (0.3, 1), child, (0, 0.5), "one", "many", GREY, shape="elbow")

    boxes = []
    for n in ORDER:
        x, y, w, h = pos[n]
        boxes.append(box(x, y, w, h, n, ENT_FILL, ENT_STROKE, FS, bold=True, sw=1.8, color=ENT_TEXT, rx=5))
        plan.shape(n, x, y, w, h)
    for hname in HUBS:
        x, y, w, h = pos[hname]
        boxes.append(box(x, y, w, h, hname, HUB_FILL[hname], HUB_COLOR[hname], 13, bold=True, sw=2, color=ENT_TEXT, rx=6))
        plan.shape(hname, x, y, w, h, kind="hub", color=HUB_COLOR[hname], fill=HUB_FILL[hname])

    title = "Latimer Core Data Package (collapsed) — table relationships"
    sub1 = ("25 tables, 97 one-to-many relations, no junction tables. A line is a foreign key held by the table at its "
            "crow's-foot end; the other end is the table it references (exactly one).")
    sub2 = ("Blue lines enter identifier, red lines enter reference, green lines enter measurement-or-fact; grey lines are the "
            "remaining relations. Loops are self references.")
    head = [f'<text x="{X0}" y="42" font-family="{FONT}" font-size="22" font-weight="bold" fill="#111">{title}</text>',
            f'<text x="{X0}" y="66" font-family="{FONT}" font-size="12.5" fill="#444">{sub1}</text>',
            f'<text x="{X0}" y="84" font-family="{FONT}" font-size="12.5" fill="#444">{sub2}</text>']
    plan.text(X0, 42, title, 22, True, "#111")
    plan.text(X0, 66, sub1, 12.5, False, "#444")
    plan.text(X0, 84, sub2, 12.5, False, "#444")
    lg = []
    legend(lg, X0 + 900, 100, 12, 1.0)
    plan.text(X0 + 900, 100, "LEGEND", 12)
    foot = [f'<text x="{X0}" y="{H-22}" font-family="{FONT}" font-size="11" fill="#666">'
            f'Source: {PKG}/table-schemas (foreign keys). Generated by src/build-erd-collapsed.py.</text>']
    plan.text(X0, H - 22, f"Source: {PKG}/table-schemas (foreign keys). Generated by src/build-erd-collapsed.py.", 11, color="#666")
    body = "\n".join(head + lg + lines + boxes + marks + foot)
    return svg_doc(int(W), int(H), body), int(W), int(H), plan


# ------------------------------------------------- shared 16:9 machinery: orthogonal routing
def orient(pos, a, b):
    """Facing sides for an orthogonal Z-route from table a to table b, plus the sort keys that keep
    the exits along one side from crossing each other."""
    ax, ay, aw, ah = pos[a]
    bx, by, bw, bh = pos[b]
    dx = (bx + bw / 2) - (ax + aw / 2)
    dy = (by + bh / 2) - (ay + ah / 2)
    if abs(dx) >= abs(dy):
        return (("right", "left") if dx > 0 else ("left", "right")) + (dy, -dy)
    return (("bottom", "top") if dy > 0 else ("top", "bottom")) + (dx, -dx)


def assign_ports(pos, pairs, selfs):
    """Spread the connector ends of each table along the side they leave from."""
    wants, sides = defaultdict(list), {}
    for i, (a, b) in enumerate(pairs):
        sa, sb, ka, kb = orient(pos, a, b)
        sides[i] = (sa, sb)
        wants[(a, sa)].append((ka, i, 0))
        wants[(b, sb)].append((kb, i, 1))
    port = {}
    for (name, side), lst in wants.items():
        lst.sort()
        x, y, w, h = pos[name]
        n = len(lst)
        if side in ("left", "right"):
            length, c0 = h, y + h / 2
        else:
            length = w - (52 if (name in selfs and side == "top") else 0)
            c0 = x + length / 2
        spacing = min(30, (length - 16) / max(n, 1))
        for k, (_, i, end) in enumerate(lst):
            off = (k - (n - 1) / 2) * spacing
            port[(i, end)] = {"left": (x, c0 + off), "right": (x + w, c0 + off),
                              "top": (c0 + off, y), "bottom": (c0 + off, y + h)}[side]
    return port, sides


def route(pa, sa, pb, sb):
    """Z-shaped orthogonal route between two facing ports, bending at the midpoint like a
    Lucidchart elbow connector. `bad` flags a route that would have to double back."""
    if sa in ("left", "right"):
        mx = (pa[0] + pb[0]) / 2
        pts = [pa, (mx, pa[1]), (mx, pb[1]), pb]
        bad = (pb[0] - pa[0]) * (1 if sa == "right" else -1) < 24
    else:
        my = (pa[1] + pb[1]) / 2
        pts = [pa, (pa[0], my), (pb[0], my), pb]
        bad = (pb[1] - pa[1]) * (1 if sa == "bottom" else -1) < 24
    return pts, bad


def routes(pos, pairs, selfs):
    port, sides = assign_ports(pos, pairs, selfs)
    out = []
    for i, (a, b) in enumerate(pairs):
        pts, bad = route(port[(i, 0)], sides[i][0], port[(i, 1)], sides[i][1])
        out.append((a, b, pts, bad))
    return out


def seg_hits_box(x1, y1, x2, y2, bx, margin=6):
    """Exact segment/rectangle intersection (Liang-Barsky clipping)."""
    x, y, w, h = bx
    xmin, ymin, xmax, ymax = x - margin, y - margin, x + w + margin, y + h + margin
    dx, dy = x2 - x1, y2 - y1
    t0, t1 = 0.0, 1.0
    for p, q in ((-dx, x1 - xmin), (dx, xmax - x1), (-dy, y1 - ymin), (dy, ymax - y1)):
        if p == 0:
            if q < 0:
                return False
            continue
        t = q / p
        if p < 0:
            if t > t1:
                return False
            t0 = max(t0, t)
        else:
            if t < t0:
                return False
            t1 = min(t1, t)
    return t0 <= t1


def seg_cross(a, b, c, d):
    """True when segments ab and cd properly cross."""
    def o(p, q, r):
        return (q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0])
    return (o(a, b, c) * o(a, b, d) < 0) and (o(c, d, a) * o(c, d, b) < 0)


def layout_cost(pos, pairs, selfs):
    rs = routes(pos, pairs, selfs)
    segs = [(p, q, a, b) for a, b, pts, _ in rs for p, q in zip(pts, pts[1:]) if p != q]
    box_hits = sum(1 for (p, q, a, b) in segs for other, bx in pos.items()
                   if other not in (a, b) and seg_hits_box(p[0], p[1], q[0], q[1], bx))
    box_hits += sum(1 for r in rs if r[3])
    crossings = sum(1 for i in range(len(segs)) for j in range(i + 1, len(segs))
                    if segs[i][2:] != segs[j][2:] and seg_cross(segs[i][0], segs[i][1], segs[j][0], segs[j][1]))
    length = sum(abs(p[0] - q[0]) + abs(p[1] - q[1]) for p, q, _, _ in segs)
    return 40 * box_hits + 2 * crossings + 0.004 * length, box_hits, crossings


def optimize(pos, pairs, selfs, bounds, iters=12000, seed=7, temp0=30.0, step=45):
    """Simulated annealing over table centres, each confined to its bounds rectangle.

    Minimises connector segments through tables and doubled-back routes (heavily), then line
    crossings, then total connector length. Deterministic for a given seed."""
    rnd = random.Random(seed)
    names = list(pos)

    def overlaps(n, x, y, w, h):
        for o, (ox, oy, ow, oh) in pos.items():
            if o != n and x < ox + ow + 14 and ox < x + w + 14 and y < oy + oh + 14 and oy < y + h + 14:
                return True
        return False

    cost, hits, cross = layout_cost(pos, pairs, selfs)
    best = (cost, dict(pos))
    for k in range(iters):
        temp = temp0 * (1 - k / iters) + 0.5
        n = rnd.choice(names)
        x, y, w, h = pos[n]
        gx, gy, gw, gh = bounds[n]
        if rnd.random() < 0.15:
            nx, ny = rnd.uniform(gx, gx + gw - w), rnd.uniform(gy, gy + gh - h)
        else:
            nx, ny = x + rnd.gauss(0, step), y + rnd.gauss(0, step)
        nx, ny = round(nx / 10) * 10, round(ny / 10) * 10
        if nx < gx or ny < gy or nx + w > gx + gw or ny + h > gy + gh or overlaps(n, nx, ny, w, h):
            continue
        pos[n] = (nx, ny, w, h)
        new_cost, new_hits, new_cross = layout_cost(pos, pairs, selfs)
        if new_cost <= cost or rnd.random() < math.exp((cost - new_cost) / temp):
            cost, hits, cross = new_cost, new_hits, new_cross
            if cost < best[0]:
                best = (cost, dict(pos))
        else:
            pos[n] = (x, y, w, h)
    pos.update(best[1])
    return layout_cost(pos, pairs, selfs)


def draw_relations(plan, pos, pairs, selfs, lines, marks, problems, scale=1.35, notation=True):
    """Orthogonal parent->child connectors with one/many marks flush against the tables, plus
    self-reference loops on the top edge. With notation=False the connectors carry no marks."""
    for a, b, pts, bad in routes(pos, pairs, selfs):
        lines.append(polyline(pts, GREY))
        if notation:
            ux, uy = (pts[1][0] - pts[0][0]), (pts[1][1] - pts[0][1])
            d = math.hypot(ux, uy) or 1
            marks.append(mark("one", pts[0][0], pts[0][1], ux / d, uy / d, GREY, scale=scale))
            vx, vy = (pts[-2][0] - pts[-1][0]), (pts[-2][1] - pts[-1][1])
            d = math.hypot(vx, vy) or 1
            marks.append(mark("many", pts[-1][0], pts[-1][1], vx / d, vy / d, GREY, scale=scale))
        kinds = ("one", "many") if notation else (None, None)
        plan.line(a, rel_pos(pos[a], *pts[0]), b, rel_pos(pos[b], *pts[-1]), kinds[0], kinds[1], shape="elbow")
        for other, bx in pos.items():
            if other not in (a, b) and any(seg_hits_box(p[0], p[1], q[0], q[1], bx) for p, q in zip(pts, pts[1:])):
                problems.append(f"{a} -> {b} crosses {other}")
        if bad:
            problems.append(f"{a} -> {b} doubles back")
    for s in sorted(selfs):
        x, y, w, h = pos[s]
        x1, x2, top = x + w - 44, x + w - 12, y - 30
        lines.append(polyline([(x1, y), (x1, top), (x2, top), (x2, y)], GREY))
        if notation:
            marks.append(mark("zero_one", x1, y, 0, -1, GREY, scale=1.2))
            marks.append(mark("many", x2, y, 0, -1, GREY, scale=1.2))
        kinds = ("zero_one", "many") if notation else (None, None)
        plan.line(s, rel_pos(pos[s], x1, y), s, rel_pos(pos[s], x2, y), kinds[0], kinds[1], shape="elbow")


def hub_strip(plan, rels, sy, W, lines, marks, boxes, texts, FS=17, PADX=26, BH=46, notation=True):
    counts = {h: sum(1 for p, c, _, s in rels if c == h and p not in HUBS) for h in HUBS}
    if notation:
        caption = ("Cross-cutting tables — each is the many side of a one-to-many relation from most of the tables "
                   "above (and from each other):")
    else:
        caption = "Cross-cutting tables — linked from most of the tables above (and from each other):"
    lines.append(f'<line x1="60" y1="{sy-28}" x2="{W-60}" y2="{sy-28}" stroke="#c8c8c8" stroke-width="1.5"/>')
    texts.append(f'<text x="60" y="{sy+14}" font-family="{FONT}" font-size="15" fill="#333">'
                 f'<tspan font-weight="bold">Cross-cutting tables</tspan>{caption[len("Cross-cutting tables"):]}</text>')
    plan.text(60, sy + 14, caption, 15)
    plan.lines.append(dict(a=None, a_xy=[60, sy - 28], b=None, b_xy=[W - 60, sy - 28], a_style="None", b_style="None",
                           color="#c8c8c8", shape="diagonal", width=1.5))
    sx, ry = 60, sy + 36
    for hname in HUBS:
        aw = text_width("any table above", FS - 2) + 22
        boxes.append(box(sx, ry, aw, 40, "any table above", "#ffffff", "#888", FS - 2, dashed=True, color="#444"))
        plan.shape("any-table-" + hname, sx, ry, aw, 40, kind="placeholder", text="any table above")
        lx1, lx2 = sx + aw, sx + aw + 90
        lines.append(f'<line x1="{lx1}" y1="{ry+20}" x2="{lx2}" y2="{ry+20}" stroke="{GREY}" stroke-width="1.8"/>')
        if notation:
            marks.append(mark("one", lx1, ry + 20, 1, 0, GREY, scale=1.35))
            marks.append(mark("many", lx2, ry + 20, -1, 0, GREY, scale=1.35))
        hw = text_width(hname, FS, True) + PADX
        boxes.append(box(lx2, ry - 3, hw, BH, hname, HUB_FILL[hname], HUB_COLOR[hname], FS, bold=True, sw=2, color=ENT_TEXT, rx=6))
        plan.shape(hname, lx2, ry - 3, hw, BH, kind="hub", color=HUB_COLOR[hname], fill=HUB_FILL[hname])
        kinds = ("one", "many") if notation else (None, None)
        plan.line("any-table-" + hname, (1, 0.5), hname, (0, (ry + 20 - (ry - 3)) / BH), kinds[0], kinds[1])
        label = f"{counts[hname]} tables"
        texts.append(f'<text x="{lx2 + hw + 12}" y="{ry+20}" dominant-baseline="central" font-family="{FONT}" '
                     f'font-size="14" fill="#555">{label}</text>')
        plan.text(lx2 + hw + 12, ry + 20, label, 14, color="#555")
        sx = lx2 + hw + 12 + text_width(label, 14) + 70


def head_16x9(plan, title, subtitle, lg, W, notation=True):
    head = [f'<text x="60" y="58" font-family="{FONT}" font-size="34" font-weight="bold" fill="#111">{title}</text>',
            f'<text x="60" y="86" font-family="{FONT}" font-size="17" fill="#555">{subtitle}</text>']
    plan.text(60, 58, title, 34, True, "#111")
    plan.text(60, 86, subtitle, 17, False, "#555")
    if notation:
        legend(lg, W - 60 - 420, 40, 14, 1.35)
        plan.text(W - 60 - 420, 40, "LEGEND", 14)
    return head


# ------------------------------------------------------------------ slide diagram
SLIDE_CENTRE = {
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
SLIDE_SIZE = {"object-group": (300, 84), "event": (170, 56), "person-role": (190, 56)}


def entity_boxes(plan, pos, FS, boxes):
    for n, (x, y, w, h) in pos.items():
        fill, stroke, fs = ENT_FILL, ENT_STROKE, FS
        if n == "object-group":
            fill, stroke, fs = "#c5d9ef", "#0b2540", 21
        boxes.append(box(x, y, w, h, n, fill, stroke, fs, bold=True, sw=2, color=ENT_TEXT, rx=6))
        plan.shape(n, x, y, w, h, kind="entity", fill=fill, stroke=stroke, big=(n == "object-group"))


def slide_positions(rels, FS=17, BH=46, PADX=26):
    """The hand layout, nudged by the annealer only as far as needed to keep the orthogonal
    connectors out of the tables. Shared by the slide and the plain diagram."""
    pos = {}
    for n, (cx, cy) in SLIDE_CENTRE.items():
        w, h = SLIDE_SIZE.get(n, (text_width(n, FS, True) + PADX, BH))
        pos[n] = (cx - w / 2, cy - h / 2, w, h)
    pairs = [(p, c) for p, c, _, s in rels if not s and p not in HUBS and c not in HUBS]
    selfs = {c for p, c, _, s in rels if s}
    bounds = {n: (10, 100, 1900, 810) for n in pos}
    cost, hits, cross = optimize(pos, pairs, selfs, bounds, iters=6000, seed=3, temp0=4.0, step=25)
    print("  slide layout: cost %.0f, %d connector segments through tables, %d crossings" % (cost, hits, cross))
    return pos, pairs, selfs


def build_slide(tables, rels, notation=True):
    W, H, FS = 1920, 1080, 17
    plan = Plan()
    pos, pairs, selfs = slide_positions(rels)
    lines, marks, boxes, texts, problems = [], [], [], [], []
    draw_relations(plan, pos, pairs, selfs, lines, marks, problems, notation=notation)
    entity_boxes(plan, pos, FS, boxes)
    hub_strip(plan, rels, 955, W, lines, marks, boxes, texts, notation=notation)
    lg = []
    if notation:
        head = head_16x9(plan, "Latimer Core Data Package (collapsed)",
                         "25 tables, one-to-many relations only (crow's-foot notation)", lg, W)
    else:
        head = head_16x9(plan, "Latimer Core Data Package (collapsed)",
                         "25 tables and how they relate — a line joins a table to the tables that refer to it",
                         lg, W, notation=False)
    body = "\n".join(head + lg + lines + boxes + marks + texts)
    return svg_doc(W, H, body), plan, problems


# ---------------------------------------------------------------- grouped diagram
GROUPS = [
    ("Collection", (60, 110, 640, 380), {
        "record-level": (380, 170), "resource-relationship": (200, 300), "object-group": (450, 300),
        "collection-status-history": (240, 420), "storage-location": (540, 420)}),
    ("Scope and context", (760, 110, 1100, 380), {
        "event": (920, 200), "temporal-coverage": (1190, 200), "geographic-context": (1450, 200),
        "ecological-context": (1710, 200), "geological-context": (920, 410), "chronometric-age": (1190, 410),
        "taxon": (1450, 410), "object-classification": (1710, 410)}),
    ("Scheme", (60, 540, 640, 330), {
        "latimer-core-scheme": (380, 620), "scheme-term": (200, 790), "scheme-measurement-or-fact": (470, 790)}),
    ("Agents", (960, 540, 900, 330), {
        "organisational-unit": (1120, 620), "person": (1500, 620), "role": (1760, 620),
        "person-role": (1450, 720), "address": (1200, 820), "contact-detail": (1620, 820)}),
]
GROUP_SIZE = {"object-group": (220, 64), "event": (150, 50), "person-role": (170, 50)}


def build_grouped(tables, rels):
    W, H, FS, BH, PADX = 1920, 1080, 16, 44, 24
    plan = Plan()
    pos = {}
    for gname, (gx, gy, gw, gh), members in GROUPS:
        for n, (cx, cy) in members.items():
            w, h = GROUP_SIZE.get(n, (text_width(n, FS, True) + PADX, BH))
            pos[n] = (cx - w / 2, cy - h / 2, w, h)
    assert sorted(list(pos) + HUBS) == tables, sorted(set(tables) - set(pos) - set(HUBS))
    pairs = [(p, c) for p, c, _, s in rels if not s and p not in HUBS and c not in HUBS]
    selfs = {c for p, c, _, s in rels if s}
    # keep every table inside its group box (below the group title, inside a margin) and let the
    # annealer find positions that keep connectors out of other tables
    bounds = {n: (gx + 16, gy + 40, gw - 32, gh - 56) for _, (gx, gy, gw, gh), members in GROUPS for n in members}
    cost, hits, cross = optimize(pos, pairs, selfs, bounds)
    print("  grouped layout: cost %.0f, %d connector segments through tables, %d crossings" % (cost, hits, cross))
    lines, marks, boxes, texts, problems = [], [], [], [], []
    groups = []
    for gname, (gx, gy, gw, gh), members in GROUPS:
        groups.append(f'<rect x="{gx}" y="{gy}" width="{gw}" height="{gh}" rx="10" fill="#f7f9fc" stroke="#9fb3c8" '
                      f'stroke-width="1.5" stroke-dasharray="7 5"/>')
        groups.append(f'<text x="{gx+14}" y="{gy+22}" font-family="{FONT}" font-size="15" font-weight="bold" '
                      f'fill="#4a6580">{gname}</text>')
        plan.shape("group:" + gname, gx, gy, gw, gh, kind="group", members=sorted(members))
    draw_relations(plan, pos, pairs, selfs, lines, marks, problems, scale=1.3)
    entity_boxes(plan, pos, FS, boxes)
    strip_y = 955
    groups.append(f'<rect x="60" y="{strip_y-40}" width="{W-120}" height="{H-strip_y+20}" rx="10" fill="#fffaf0" '
                  f'stroke="#c9a96e" stroke-width="1.5" stroke-dasharray="7 5"/>')
    plan.shape("group:Cross-cutting", 60, strip_y - 40, W - 120, H - strip_y + 20, kind="group", members=HUBS)
    hub_strip(plan, rels, strip_y, W, lines, marks, boxes, texts)
    lg = []
    head = head_16x9(plan, "Latimer Core Data Package (collapsed) — tables by theme",
                     "25 tables in five groups, one-to-many relations only (crow's-foot notation)", lg, W)
    body = "\n".join(head + lg + groups + lines + boxes + marks + texts)
    return svg_doc(W, H, body), plan, problems


# ---------------------------------------------------------------------------- main
def write(name, svg, w, h):
    p = os.path.join(OUT_DIR, name + ".svg")
    with open(p, "w", encoding="utf-8") as fh:
        fh.write(svg)
    svg_to_png(p, os.path.join(OUT_DIR, name + ".png"), w, h)
    print("%s.svg / .png  %dx%d" % (name, w, h))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--plan", help="write a JSON plan of shapes and connectors for all diagrams")
    args = ap.parse_args()
    os.makedirs(OUT_DIR, exist_ok=True)
    tables, rels = load_model()
    print("%d tables, %d relations (%d self)" % (len(tables), len(rels), sum(1 for r in rels if r[3])))

    svg, w, h, plan_full = build_full(tables, rels)
    write(PKG + "-erd", svg, w, h)
    svg, plan_slide, problems = build_slide(tables, rels)
    write(PKG + "-erd-slide", svg, 1920, 1080)
    for p in problems:
        print("  slide:", p)
    svg, plan_grouped, problems = build_grouped(tables, rels)
    write(PKG + "-erd-grouped", svg, 1920, 1080)
    for p in problems:
        print("  grouped:", p)
    svg, plan_plain, problems = build_slide(tables, rels, notation=False)
    write(PKG + "-erd-plain", svg, 1920, 1080)

    if args.plan:
        out = {k: dict(shapes=v.shapes, lines=v.lines, texts=v.texts)
               for k, v in (("full", plan_full), ("slide", plan_slide), ("grouped", plan_grouped), ("plain", plan_plain))}
        with open(args.plan, "w", encoding="utf-8") as fh:
            json.dump(out, fh, indent=1)
        print("plan ->", args.plan)


if __name__ == "__main__":
    main()
