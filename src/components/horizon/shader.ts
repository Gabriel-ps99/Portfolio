// One arc, seven materials. The horizon is the edge of a huge circle whose apex
// stays put; `uWorld` only swaps what the sky and the ground are made of.
//
// Units: "screen units" = CSS px / uScale, origin at the apex, y pointing down.
//   d   signed distance to the horizon (+ sky, - ground)
//   s   arc length along the horizon (0 at the apex)
//   dep depth below the surface (-d)
// Ground textures are drawn in (s, dep) so they bend with the curve.

/** LCD pixel size in screen units. The SMS caption is set on this same grid. */
export const LCD_CELL = 0.021;

export const VERT = /* glsl */ `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

export const FRAG = /* glsl */ `
precision highp float;

uniform vec2 uRes;      // canvas size, device px
uniform float uDpr;
uniform float uScale;   // CSS px per screen unit
uniform float uApex;    // apex y from the top, CSS px
uniform float uRadius;  // CSS px
uniform float uWorld;   // 0 planet, 1 permits, 2 tax, 3 health, 4 wood, 5 burger, 6 sms
uniform float uShot;    // seconds since the last cut
uniform float uGlow;    // planet brightness: 0 to 1 fading in, above 1 for the flare

const float PI = 3.14159265;

float R;       // radius, screen units
float AA;      // one device pixel, screen units
vec2 TL;       // canvas top-left, screen units
float HALFW;   // half the canvas width, screen units
float BOTTOM;  // distance to the canvas bottom, screen units

// --- noise (sin-free hashes: same result across GPUs) ----------------------
float hash11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}
float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
vec2 hash22(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.xx + p3.yz) * p3.zy);
}
float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash12(i), hash12(i + vec2(1.0, 0.0)), f.x),
    mix(hash12(i + vec2(0.0, 1.0)), hash12(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}
float fbm(vec2 p) {
  float a = 0.5;
  float sum = 0.0;
  for (int i = 0; i < 4; i++) {
    sum += a * vnoise(p);
    p = p * 2.03 + 17.1;
    a *= 0.5;
  }
  return sum;
}

// --- drawing helpers -------------------------------------------------------
float line(float dist, float hw) {
  hw = max(hw, AA * 0.75);
  return 1.0 - smoothstep(hw - AA, hw + AA, abs(dist));
}
float grid(float x, float period, float hw) {
  return line(abs(fract(x / period + 0.5) - 0.5) * period, hw);
}
float fill(float sd) {
  return 1.0 - smoothstep(-AA, AA, sd);
}
float seg(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h);
}
vec2 rot(vec2 p, float a) {
  float c = cos(a);
  float s = sin(a);
  return vec2(c * p.x - s * p.y, s * p.x + c * p.y);
}

// --- 0 · planet: the resting state, matches the page background ------------
vec3 planet(vec2 p, float d, float s) {
  vec3 col = vec3(3.0 / 255.0);

  if (d > 0.0) {
    vec2 g = p / 0.045;
    vec2 id = floor(g);
    if (hash12(id + 7.0) > 0.88) {
      vec2 sp = 0.15 + 0.7 * hash22(id + 3.1);
      float r = length((fract(g) - sp) * 0.045);
      float size = mix(0.0009, 0.0021, hash12(id + 19.7));
      float star = (1.0 - smoothstep(size - AA, size + AA, r)) * mix(0.2, 0.85, hash12(id + 41.3));
      col += star * smoothstep(0.04, 0.34, d) * min(uGlow, 1.0) * vec3(0.85, 0.9, 1.0);
    }
  }

  float lat = exp(-pow(s / 0.58, 2.0));
  float up = max(d, 0.0);
  float dn = max(-d, 0.0);
  vec3 haze =
    vec3(0.10, 0.22, 0.60) * exp(-up / 0.20) * 0.16 +
    vec3(0.14, 0.36, 0.95) * exp(-up / 0.048) * 0.50 +
    vec3(0.42, 0.68, 1.00) * exp(-up / 0.013) * 0.55 +
    vec3(1.00, 0.95, 0.86) * exp(-up / 0.0032) * 0.95;
  vec3 rim =
    vec3(0.36, 0.60, 1.00) * exp(-dn / 0.005) * 0.60 +
    vec3(0.07, 0.16, 0.42) * exp(-dn / 0.045) * 0.22;
  vec3 glow = mix(rim, haze, smoothstep(-AA, AA, d)) * mix(0.14, 1.0, lat);

  // Light about to break over the edge.
  glow += vec3(0.30, 0.52, 1.0) * exp(-length(p * vec2(0.42, 1.0)) / 0.085) * 0.30;

  glow *= uGlow * smoothstep(0.0, 0.10, BOTTOM);
  col += glow;

  // Break up banding in the dark gradients without lifting the flat black.
  float amount = smoothstep(0.0, 0.02, glow.b);
  col += (hash12(gl_FragCoord.xy) - 0.5) * (1.6 / 255.0) * amount;
  return col;
}

// --- 1 · permits: site plan on blueprint paper ------------------------------
vec3 blueprint(vec2 p, float d, float s) {
  float n = fbm(p * 6.0);
  vec3 ink = vec3(0.90, 0.95, 1.0);
  vec3 col;

  if (d > 0.0) {
    col = vec3(0.075, 0.235, 0.60) * (0.92 + 0.16 * n);
    float minor = max(grid(p.x, 0.04, 0.0006), grid(p.y, 0.04, 0.0006));
    float major = max(grid(p.x, 0.20, 0.0010), grid(p.y, 0.20, 0.0010));
    col = mix(col, ink, minor * 0.10 + major * 0.22);

    // Setback lines: the same curve, offset.
    float dash = step(0.5, fract(s / 0.05));
    col = mix(col, ink, line(d - 0.075, 0.0009) * dash * 0.55 + line(d - 0.19, 0.0009) * 0.28);

    // Ruler ticks riding the arc.
    float big = grid(s, 0.20, 0.0012);
    float len = mix(0.013, 0.028, big);
    float tick = max(grid(s, 0.04, 0.0009), big) * (1.0 - smoothstep(len - AA, len + AA, d));
    col = mix(col, ink, tick * 0.85);
  } else {
    float dep = -d;
    col = vec3(0.045, 0.160, 0.46) * (0.92 + 0.16 * n);

    float y = dep - 0.034;
    if (y > 0.0) {
      float rowH = 0.085;
      float row = floor(y / rowH);
      float fy = fract(y / rowH) * rowH;
      float colW = mix(0.10, 0.18, hash11(row + 3.0));
      float xs = s + hash11(row * 7.0 + 1.0) * colW;
      float fx = fract(xs / colW) * colW;
      vec2 id = vec2(floor(xs / colW), row);

      // Blocks, with streets left between them.
      float inset = min(min(fx, colW - fx), min(fy, rowH - fy)) - 0.008;
      float inside = step(0.0, inset);
      float lots = line(inset, 0.0009) * 0.8;

      float h = hash12(id + 11.0);
      float split = 0.0;
      if (h > 0.35) split = line(fx - colW * mix(0.35, 0.65, hash12(id + 5.0)), 0.0007);
      if (h > 0.70) split = max(split, line(fy - rowH * 0.5, 0.0007));
      lots += split * inside * 0.5;

      if (hash12(id + 23.0) > 0.72) lots += grid(fx + fy, 0.012, 0.0006) * inside * 0.30;

      col = mix(col, ink, min(lots, 1.0) * mix(1.0, 0.30, smoothstep(0.22, 0.6, dep)));
    }
  }

  return mix(col, ink, line(d, 0.0014));
}

// --- 2 · taxation: ledger page over its cloth cover -------------------------
vec3 ledger(vec2 p, float d, float s) {
  vec3 col;

  if (d > 0.0) {
    float fibre = fbm(p * vec2(40.0, 9.0));
    float blot = fbm(p * 3.0 + 4.0);
    col = vec3(0.925, 0.885, 0.79) * (0.95 + 0.07 * fibre) * (0.96 + 0.08 * blot);

    float rowH = 0.042;
    col = mix(col, vec3(0.42, 0.58, 0.72), grid(p.y, rowH, 0.0006) * 0.45);

    float ax = abs(p.x);
    float dbl = max(line(ax - 0.300, 0.0007), line(ax - 0.308, 0.0007));
    float sgl = max(line(ax - 0.560, 0.0006), line(ax - 0.820, 0.0006));
    col = mix(col, vec3(0.78, 0.22, 0.20), dbl * 0.6 + sgl * 0.4);

    // Right-aligned figures in the money columns, greeked.
    float row = floor(p.y / rowH);
    float fy = fract(p.y / rowH);
    float side = sign(p.x);
    float marks = 0.0;
    for (int b = 0; b < 2; b++) {
      float fb = float(b);
      float right = mix(0.545, 0.805, fb);
      float chars = (right - ax) / 0.016;
      float k = floor(chars);
      float fx = fract(chars);
      vec2 rid = vec2(row, side * (fb + 1.0));
      float len = floor(mix(3.0, 11.0, hash12(rid + 2.0)));
      float present = step(0.0, k) * step(k, len - 0.5) * step(0.18, hash12(rid + 9.0));
      present *= step(mod(k, 4.0), 2.5); // thousands gap
      vec2 cid = vec2(k + side * 31.0 + fb * 57.0, row);
      float w = mix(0.50, 0.80, hash12(cid));
      float h = mix(0.46, 0.58, hash12(cid + 5.0));
      float bx = abs(fx - 0.5) - w * 0.5;
      float by = abs(fy - (0.84 - h * 0.5)) - h * 0.5;
      float m = (1.0 - smoothstep(-0.10, 0.10, bx)) * (1.0 - smoothstep(-0.10, 0.10, by));
      marks += m * present * mix(0.35, 0.70, hash12(cid + 8.0));
    }
    col = mix(col, vec3(0.10, 0.12, 0.30), marks * smoothstep(0.02, 0.05, d));
  } else {
    float dep = -d;
    float weave = sin(s * 900.0) * sin(dep * 900.0) * 0.5 + 0.5;
    float cloth = fbm(vec2(s, dep) * 7.0);
    col = vec3(0.07, 0.25, 0.19) * (0.80 + 0.25 * cloth + 0.10 * weave);

    vec3 gold = vec3(0.86, 0.68, 0.30) * (0.85 + 0.3 * vnoise(vec2(s * 60.0, 3.0)));
    col = mix(col, gold, max(line(dep - 0.050, 0.0030), line(dep - 0.062, 0.0009)) * 0.9);

    // The block of page edges between the sheet and the cover.
    float pages = 1.0 - smoothstep(0.014, 0.016, dep);
    vec3 edge = vec3(0.80, 0.76, 0.66) * (0.86 + 0.14 * sin(dep * 2600.0));
    col = mix(col, edge, pages);
    col *= mix(0.55, 1.0, smoothstep(0.016, 0.030, dep) + pages);
  }

  return col;
}

// --- 3 · healthcare: ECG paper, pharmacy crosses ----------------------------
float ecg(vec2 q) {
  // Two beats in view, one either side of the caption; closer in on narrow screens.
  float period = 2.0 * min(0.45, HALFW * 0.72);
  q.x = mod(q.x, period) + 0.45 - period * 0.5;
  float e = seg(q, vec2(-1.000, 0.000), vec2(0.345, 0.000));
  e = min(e, seg(q, vec2(0.345, 0.000), vec2(0.370, 0.013)));
  e = min(e, seg(q, vec2(0.370, 0.013), vec2(0.395, 0.000)));
  e = min(e, seg(q, vec2(0.395, 0.000), vec2(0.422, 0.000)));
  e = min(e, seg(q, vec2(0.422, 0.000), vec2(0.434, -0.016)));
  e = min(e, seg(q, vec2(0.434, -0.016), vec2(0.450, 0.110)));
  e = min(e, seg(q, vec2(0.450, 0.110), vec2(0.468, -0.034)));
  e = min(e, seg(q, vec2(0.468, -0.034), vec2(0.484, 0.000)));
  e = min(e, seg(q, vec2(0.484, 0.000), vec2(0.535, 0.000)));
  e = min(e, seg(q, vec2(0.535, 0.000), vec2(0.575, 0.024)));
  e = min(e, seg(q, vec2(0.575, 0.024), vec2(0.615, 0.000)));
  e = min(e, seg(q, vec2(0.615, 0.000), vec2(2.000, 0.000)));
  return e;
}
vec3 health(vec2 p, float d, float s) {
  vec3 teal = vec3(0.05, 0.47, 0.45);
  vec3 col;

  if (d > 0.0) {
    col = vec3(0.78, 0.93, 0.87) * (0.97 + 0.05 * fbm(p * 5.0));
    float minor = max(grid(p.x, 0.02, 0.0005), grid(p.y, 0.02, 0.0005));
    float major = max(grid(p.x, 0.10, 0.0008), grid(p.y, 0.10, 0.0008));
    col = mix(col, teal, minor * 0.10 + major * 0.20);
  } else {
    float dep = -d;
    col = vec3(0.975, 0.985, 0.975);
    float cell = 0.075;
    float row = floor(dep / cell);
    float xs = s + mod(row, 2.0) * cell * 0.5;
    vec2 a = abs(vec2(fract(xs / cell) - 0.5, fract(dep / cell) - 0.5)) * cell;
    float cross = min(max(a.x - 0.017, a.y - 0.0055), max(a.x - 0.0055, a.y - 0.017));
    col = mix(col, teal, fill(cross) * mix(0.9, 0.22, smoothstep(0.0, 0.5, dep)));
  }

  float trace = ecg(vec2(s, d));
  float hw = max(0.0028, AA * 1.5);
  return mix(col, vec3(0.93, 0.27, 0.25), 1.0 - smoothstep(hw - AA, hw + AA, trace));
}

// --- 4 · woodworking: growth rings under a pegboard -------------------------
vec3 wood(vec2 p, float d, float s) {
  vec3 col;

  if (d > 0.0) {
    vec3 board = vec3(0.60, 0.68, 0.55) * (0.95 + 0.08 * fbm(p * 30.0));
    vec2 g = (fract(p / 0.055) - 0.5) * 0.055;
    float r = 0.0065;
    float lip = 1.0 - smoothstep(r - AA, r + AA, length(g - vec2(0.0014, 0.0020)));
    float hole = 1.0 - smoothstep(r - AA, r + AA, length(g));
    col = mix(board, board * 1.14, lip * 0.7);
    col = mix(col, vec3(0.12, 0.13, 0.10), hole);
  } else {
    float dep = -d;
    float warp = fbm(vec2(s * 1.6, dep * 4.0));
    float v = dep * 22.0 + dep * dep * 14.0 + warp * 1.5 + 0.16 * fbm(vec2(s * 9.0, dep * 30.0));
    float ring = fract(v);
    float late = smoothstep(0.50, 0.92, ring) * (1.0 - smoothstep(0.92, 1.0, ring));
    col = mix(vec3(0.82, 0.58, 0.32), vec3(0.47, 0.26, 0.11), late * 0.9);
    col *= mix(1.0, 0.78, smoothstep(0.10, 0.55, dep));
    col *= 0.92 + 0.14 * vnoise(vec2(s * 260.0, dep * 10.0));

    float thick = 0.013 + 0.012 * fbm(vec2(s * 14.0, 1.7));
    float bark = 1.0 - smoothstep(thick - 0.002, thick + 0.002, dep);
    vec3 barkCol = vec3(0.21, 0.13, 0.08) * (0.65 + 0.8 * fbm(vec2(s * 60.0, dep * 120.0)));
    col = mix(col, vec3(0.92, 0.76, 0.52), line(dep - thick - 0.003, 0.0016) * 0.7);
    col = mix(col, barkCol, bark);
  }

  return col;
}

// --- 5 · burgers: sesame bun on a gingham cloth -----------------------------
float seedShape(vec2 l) {
  l.y *= 1.0 + 0.45 * l.x / 0.017;
  return (length(l / vec2(0.017, 0.0082)) - 1.0) * 0.0082;
}
vec3 burger(vec2 p, float d, float s) {
  vec3 col;

  if (d > 0.0) {
    float sx = step(0.5, fract(p.x / 0.11));
    float sy = step(0.5, fract(p.y / 0.11));
    col = vec3(0.93, 0.72, 0.20) * (1.0 - 0.075 * (sx + sy));
    col *= 0.97 + 0.05 * fbm(p * 40.0);
  } else {
    float dep = -d;
    float mott = fbm(vec2(s, dep) * 9.0);
    col = mix(vec3(0.60, 0.31, 0.09), vec3(0.90, 0.60, 0.22), smoothstep(0.0, 0.42, dep) * 0.85 + 0.15 * mott);
    col *= 0.90 + 0.18 * mott;
    col += vec3(1.0, 0.85, 0.6) * 0.24 * exp(-pow((dep - 0.05) / 0.022, 2.0)) * exp(-pow((s + 0.22) / 0.26, 2.0));
    col *= mix(0.70, 1.0, smoothstep(0.0, 0.012, dep));

    vec2 cs = vec2(0.085, 0.070);
    vec2 q = vec2(s, dep - 0.02) / cs;
    vec2 id = floor(q);
    float keep =
      step(0.28, hash12(id + 2.0)) * step(0.02, dep) * (1.0 - smoothstep(0.30, 0.48, dep));
    vec2 l = (fract(q) - 0.5 - (hash22(id + 13.0) - 0.5) * 0.5) * cs;
    float ang = hash12(id + 31.0) * PI;
    float shadow = seedShape(rot(l - vec2(0.0024, 0.0030), ang));
    col = mix(col, col * 0.52, (1.0 - smoothstep(-0.001, 0.003, shadow)) * keep * 0.65);
    vec3 sesame = vec3(0.98, 0.92, 0.74) * (0.90 + 0.14 * hash12(id + 77.0));
    col = mix(col, sesame, fill(seedShape(rot(l, ang))) * keep);
  }

  return col;
}

// --- 6 · sms: the same arc on a phone LCD -----------------------------------
float bayer2(vec2 a) {
  a = floor(a);
  return fract(a.x / 2.0 + a.y * a.y * 0.75);
}
float bayer4(vec2 a) {
  return bayer2(0.5 * a) * 0.25 + bayer2(a);
}
vec3 lcd(vec2 p) {
  float cell = ${LCD_CELL};
  vec2 q = floor(p / cell);
  vec2 f = fract(p / cell);
  vec2 c = (q + 0.5) * cell;
  float dq = length(c - vec2(0.0, R)) - R;

  float on = 0.0;
  if (dq < 0.0) {
    float dep = -dq;
    float density = mix(1.0, 0.16, smoothstep(cell * 2.0, 0.44, dep));
    on = step(bayer4(q), density);
    if (dep < cell * 2.0) on = 1.0;
  }

  // Status bar: signal on the left, battery on the right.
  vec2 tl = floor(TL / cell);
  vec2 tr = vec2(-tl.x - 1.0, tl.y);
  vec2 a = q - tl - vec2(4.0, 4.0);
  if (a.x >= 0.0 && a.x < 12.0 && a.y >= 0.0 && a.y < 8.0) {
    float bar = floor(a.x / 3.0);
    if (mod(a.x, 3.0) < 2.0 && a.y >= 6.0 - bar * 2.0) on = 1.0;
  }
  vec2 b = vec2(tr.x - q.x, q.y - tr.y) - vec2(4.0, 4.0);
  if (b.x >= 1.0 && b.x < 14.0 && b.y >= 1.0 && b.y < 8.0) {
    bool shell = b.x < 2.0 || b.x >= 13.0 || b.y < 2.0 || b.y >= 7.0;
    bool charge = b.x >= 3.0 && b.x < 12.0 && b.y >= 3.0 && b.y < 6.0 && mod(b.x, 3.0) > 0.5;
    if (shell || charge) on = 1.0;
  }
  if (b.x >= 0.0 && b.x < 1.0 && b.y >= 3.0 && b.y < 6.0) on = 1.0;

  float gap = 0.07;
  float soft = AA / cell;
  float px =
    smoothstep(gap - soft, gap + soft, f.x) * smoothstep(gap - soft, gap + soft, 1.0 - f.x) *
    smoothstep(gap - soft, gap + soft, f.y) * smoothstep(gap - soft, gap + soft, 1.0 - f.y);

  vec3 back = vec3(0.60, 0.70, 0.47) * (1.0 - 0.10 * smoothstep(0.10, 0.0, p.y - TL.y));
  return mix(back, mix(back * 0.955, vec3(0.10, 0.15, 0.09), on), px);
}

void main() {
  vec2 size = uRes / uDpr;
  vec2 css = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y) / uDpr;
  vec2 p = (css - vec2(size.x * 0.5, uApex)) / uScale;

  AA = 1.0 / (uScale * uDpr);
  R = uRadius / uScale;
  TL = vec2(-size.x * 0.5, -uApex) / uScale;
  HALFW = size.x * 0.5 / uScale;
  BOTTOM = (size.y - css.y) / uScale;

  // Slow push-in on every shot; the LCD stays still, its pixels do not swim.
  if (uWorld < 5.5) {
    float zoom = 1.0 + 0.05 * uShot;
    p /= zoom;
    AA /= zoom;
  }

  vec2 toCentre = p - vec2(0.0, R);
  float d = length(toCentre) - R;
  float s = atan(p.x, R - p.y) * R;

  vec3 col;
  if (uWorld < 0.5) {
    col = planet(p, d, s);
  } else {
    if (uWorld < 1.5) col = blueprint(p, d, s);
    else if (uWorld < 2.5) col = ledger(p, d, s);
    else if (uWorld < 3.5) col = health(p, d, s);
    else if (uWorld < 4.5) col = wood(p, d, s);
    else if (uWorld < 5.5) col = burger(p, d, s);
    else col = lcd(p);

    // Print grain and a soft falloff toward the corners.
    col *= 1.0 - 0.16 * smoothstep(0.55, 1.35, length(p * vec2(0.75, 1.0)));
    col += (hash12(gl_FragCoord.xy + uWorld * 17.0) - 0.5) * 0.045;
  }

  gl_FragColor = vec4(col, 1.0);
}
`;
