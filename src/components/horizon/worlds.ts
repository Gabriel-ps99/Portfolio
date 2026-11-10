// The six shots between the opening planet and the resting planet, in order.
// Index + 1 is the `uWorld` value in the shader; `ms` is how long each stays.
//
// Overall brightness climbs up to the third shot and only falls after it, so
// the fast cuts never strobe. Keep that shape when reordering or recolouring.

export const WORLDS: { ms: number }[] = [
  { ms: 480 },
  { ms: 400 },
  { ms: 340 },
  { ms: 310 },
  { ms: 290 },
  { ms: 290 },
];
