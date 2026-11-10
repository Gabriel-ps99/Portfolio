// The six shots between the opening planet and the resting planet, in order.
// Index + 1 is the `uWorld` value in the shader; the caption text for each one
// lives in i18n/content.ts under hero.worlds, in the same order.
//
// Overall brightness climbs up to the healthcare shot and only falls after it,
// so the fast cuts never strobe. Keep that shape when reordering or recolouring.

export interface World {
  /** Google Fonts family used for this shot's caption. */
  font: string;
  weight: number;
  italic?: boolean;
  color: string;
  shadow?: string;
  /** Evens out families that draw small or large at the same font-size. */
  size?: number;
  tracking?: string;
  uppercase?: boolean;
  /** Set on the LCD's own pixel grid instead of the fluid caption size. */
  lcd?: boolean;
  /** How long the shot stays on screen. Kept above 250ms on purpose. */
  ms: number;
}

export const WORLDS: World[] = [
  // Permits: drafting lettering on a blueprint.
  { font: "Space Mono", weight: 700, color: "#eef4ff", size: 0.78, tracking: "0.04em", uppercase: true, ms: 480 },
  // Taxation: ink on a ledger page.
  { font: "Playfair Display", weight: 800, italic: true, color: "#1b1c3a", ms: 400 },
  // Healthcare: a doctor's hand on ECG paper.
  { font: "Kalam", weight: 700, color: "#0a4a46", size: 0.95, ms: 340 },
  // Woodworking: wood type.
  { font: "Alfa Slab One", weight: 400, color: "#2a190d", size: 0.9, ms: 310 },
  // Burgers: diner sign.
  { font: "Bagel Fat One", weight: 400, color: "#fff6dc", shadow: "0.045em 0.06em 0 #b3261a", ms: 290 },
  // SMS: phone LCD.
  { font: "Press Start 2P", weight: 400, color: "#1a2617", lcd: true, ms: 290 },
];

/** Stylesheet URL carrying only the glyphs the captions actually use. */
export function captionFontsUrl(captions: readonly string[]): string {
  // Both cases, because some shots set their caption in capitals.
  const text = captions.join("");
  const glyphs = [...new Set((text + text.toUpperCase()).replace(/\s/g, ""))].sort().join("");
  const families = WORLDS.map((w) => {
    const name = w.font.replace(/ /g, "+");
    if (w.italic) return `family=${name}:ital,wght@1,${w.weight}`;
    return w.weight === 400 ? `family=${name}` : `family=${name}:wght@${w.weight}`;
  });
  return `https://fonts.googleapis.com/css2?${families.join("&")}&text=${encodeURIComponent(glyphs)}&display=block`;
}
