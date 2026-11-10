import { useEffect, useRef } from "react";
import { FRAG, VERT } from "./shader";
import { WORLDS } from "./worlds";

// Opening sequence for the hero: a horizon that never moves while everything it
// is made of cuts between the kinds of work on this site, then settles into the
// dark planet the rest of the page sits on.
//
//   hold     planet, a beat before the cuts
//   montage  one hard cut per entry in WORLDS
//   settle   back to the planet; it sinks to the foot of the hero
//   rest     one static frame, no animation loop

const APEX_MONTAGE = 0.6; // apex height during the cuts, share of the viewport
const APEX_REST = 0.1; // resting apex, share of the viewport above the hero's bottom edge
const HOLD = 600;
const SETTLE = 1700;
const COMPILE_MAX = 2500; // longer than this to build the shader: skip the cuts
const SLOW_FRAME = 90; // three frames slower than this: skip the cuts
const MOVING_PIXELS = 3_000_000; // canvas size while animating; the still frame gets full density

type Phase = "hold" | "montage" | "settle" | "rest" | "frozen";

interface Props {
  /** Fires once, at the cut back to the planet (or at once when the sequence is skipped). */
  onDone: () => void;
}

// Shader setup is split in two so a slow driver compiles in the background
// instead of freezing the first paint: start it, then poll until it is linked.
function startProgram(gl: WebGLRenderingContext): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) return null;
  for (const [type, source] of [
    [gl.VERTEX_SHADER, VERT],
    [gl.FRAGMENT_SHADER, FRAG],
  ] as const) {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    gl.attachShader(program, shader);
    gl.deleteShader(shader); // freed with the program
  }
  gl.linkProgram(program);
  return program;
}

function programState(
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  parallel: KHR_parallel_shader_compile | null,
): "pending" | "ready" | "failed" {
  if (parallel && !gl.getProgramParameter(program, parallel.COMPLETION_STATUS_KHR)) return "pending";
  if (gl.getProgramParameter(program, gl.LINK_STATUS)) return "ready";
  if (import.meta.env.DEV) {
    console.error(gl.getProgramInfoLog(program));
    for (const shader of gl.getAttachedShaders(program) ?? []) console.error(gl.getShaderInfoLog(shader));
  }
  return "failed";
}

function bindProgram(gl: WebGLRenderingContext, program: WebGLProgram) {
  // One oversized triangle covers the viewport.
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(program, "aPos");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
  gl.useProgram(program);

  const uniform = (name: string) => gl.getUniformLocation(program, name);
  return {
    buffer,
    uRes: uniform("uRes"),
    uDpr: uniform("uDpr"),
    uScale: uniform("uScale"),
    uApex: uniform("uApex"),
    uRadius: uniform("uRadius"),
    uWorld: uniform("uWorld"),
    uShot: uniform("uShot"),
    uGlow: uniform("uGlow"),
  };
}

const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

export function HorizonIntro({ onDone }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    // Set on unmount so late callbacks (fonts, observers) leave the context alone.
    let disposed = false;
    let finished = false;
    const done = () => {
      if (finished || disposed) return;
      finished = true;
      onDoneRef.current();
    };

    const gl = canvas.getContext("webgl", { alpha: false, antialias: false });
    if (!gl) {
      // No WebGL: the hero simply opens the way it always did.
      wrap.style.display = "none";
      done();
      return;
    }
    const parallel = gl.getExtension("KHR_parallel_shader_compile");
    let program = startProgram(gl);
    let uniforms: ReturnType<typeof bindProgram> | null = null;
    let phase: Phase = "hold";

    // Layout, in CSS px. Measured from the hero box rather than the window so a
    // mobile URL bar sliding away does not nudge the horizon.
    const view = { width: 1, height: 1, dpr: 1, scale: 1, radius: 1, apexMontage: 0, apexRest: 0 };
    const measure = () => {
      const { width, height } = wrap.getBoundingClientRect();
      const vh = Math.min(window.innerHeight, height);
      view.width = width;
      view.height = height;
      // Every pixel is shaded every frame, so a 4K hero is drawn softer while it
      // moves and at full density (up to 2x) once it stops.
      const still = phase === "rest" || phase === "frozen";
      const budget = still ? 2 : Math.max(0.75, Math.sqrt(MOVING_PIXELS / (width * height)));
      view.dpr = Math.min(window.devicePixelRatio || 1, 2, budget);
      view.scale = Math.min(width, vh);
      // Tighter curve on portrait screens, or the arc reads as a flat line.
      view.radius = width * (1.05 + 0.5 * smoothstep(0.6, 1.6, width / vh));
      view.apexMontage = Math.round(vh * APEX_MONTAGE);
      view.apexRest = Math.max(view.apexMontage, Math.round(height - vh * APEX_REST));
      // Assigning a canvas size clears it, so only touch it when it changed.
      const w = Math.round(width * view.dpr);
      const h = Math.round(height * view.dpr);
      if (canvas.width !== w) canvas.width = w;
      if (canvas.height !== h) canvas.height = h;
    };

    let last: [world: number, shot: number, settle: number, glow: number] | null = null;
    const draw = (world: number, shot: number, settle: number, glow = 1) => {
      if (disposed || !uniforms || gl.isContextLost()) return;
      last = [world, shot, settle, glow];
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uniforms.uRes, canvas.width, canvas.height);
      gl.uniform1f(uniforms.uDpr, view.dpr);
      gl.uniform1f(uniforms.uScale, view.scale);
      gl.uniform1f(uniforms.uRadius, view.radius);
      gl.uniform1f(uniforms.uApex, view.apexMontage + (view.apexRest - view.apexMontage) * settle);
      gl.uniform1f(uniforms.uWorld, world);
      gl.uniform1f(uniforms.uShot, shot);
      gl.uniform1f(uniforms.uGlow, glow);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    // Dev only: /?world=3 holds one shot on screen for tuning.
    const frozenParam = import.meta.env.DEV
      ? new URLSearchParams(window.location.search).get("world")
      : null;
    const frozenWorld = frozenParam === null ? NaN : Number(frozenParam);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const deepLinked = window.location.hash.length > 1 || window.scrollY > 4;

    let raf = 0;
    let start = performance.now();
    let cut = start;
    let index = 0;
    let previous = 0;
    let slow = 0;

    // The frames that never change: the resting planet, or a shot held for tuning.
    const paintStill = () => {
      if (phase === "rest") draw(0, 0, 1);
      else if (phase === "frozen") draw(frozenWorld, 0.15, 0);
    };

    const rest = () => {
      phase = "rest";
      measure();
      paintStill();
      done();
    };

    const frame = () => {
      // One clock for everything: skip() stamps cuts with performance.now() too.
      const now = performance.now();
      raf = 0;

      if (!uniforms) {
        const state = program ? programState(gl, program, parallel) : "failed";
        if (state === "failed") {
          wrap.style.display = "none";
          done();
          return;
        }
        if (state === "pending") {
          if (now - start > COMPILE_MAX && phase !== "frozen") rest();
          raf = requestAnimationFrame(frame);
          return;
        }
        uniforms = bindProgram(gl, program!);
        start = now;
        if (phase === "rest" || phase === "frozen") {
          paintStill();
          return;
        }
      }

      // Software rendering or a struggling GPU would show two or three random
      // shots instead of a sequence. Go straight to the planet in that case.
      if (phase === "hold" || phase === "montage") {
        if (previous && now - previous > SLOW_FRAME) slow += 1;
        previous = now;
        if (slow >= 3) {
          rest();
          return;
        }
      }

      if (phase === "hold") {
        const waited = now - start;
        if (waited >= HOLD) {
          phase = "montage";
          index = 0;
          cut = now;
        } else {
          // The limb comes up out of the black instead of popping on.
          draw(0, waited / 1000, 0, Math.min(1, waited / 400));
        }
      }

      if (phase === "montage") {
        while (index < WORLDS.length && now - cut >= WORLDS[index].ms) {
          cut += WORLDS[index].ms;
          index += 1;
        }
        if (index < WORLDS.length) {
          draw(index + 1, (now - cut) / 1000, 0);
        } else {
          phase = "settle";
          cut = now;
          done();
        }
      }

      if (phase === "settle") {
        const t = Math.min(1, Math.max(0, (now - cut) / SETTLE));
        // The limb flares on the cut and calms as the planet sinks.
        draw(0, 0, 1 - Math.pow(1 - t, 4), 1 + 0.7 * Math.pow(1 - t, 3));
        if (t >= 1) rest();
      }

      if (phase !== "rest" && phase !== "frozen") raf = requestAnimationFrame(frame);
    };

    const relayout = () => {
      if (disposed) return;
      measure();
      if (last) draw(...last);
    };

    // Any sign the visitor wants to get on with it ends the cuts; the planet
    // still settles, so the hero never jumps.
    const skip = () => {
      if (phase !== "hold" && phase !== "montage") return;
      phase = "settle";
      cut = performance.now();
      done();
    };

    if (!Number.isNaN(frozenWorld)) phase = "frozen";
    else if (reduced || deepLinked) phase = "rest";
    measure();

    if (phase === "rest") done();
    raf = requestAnimationFrame(frame);

    const observer = new ResizeObserver(relayout);
    observer.observe(wrap);

    // "scroll" also covers the browser restoring a scroll position on reload.
    const skipEvents = ["wheel", "touchstart", "pointerdown", "keydown", "scroll"] as const;
    for (const type of skipEvents) window.addEventListener(type, skip, { passive: true });

    const onLost = (event: Event) => {
      event.preventDefault();
      cancelAnimationFrame(raf);
      raf = 0;
      uniforms = null;
      program = null;
      done();
    };
    const onRestored = () => {
      program = startProgram(gl);
      phase = "rest";
      measure();
      start = performance.now();
      if (!raf) raf = requestAnimationFrame(frame);
    };
    canvas.addEventListener("webglcontextlost", onLost);
    canvas.addEventListener("webglcontextrestored", onRestored);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      observer.disconnect();
      for (const type of skipEvents) window.removeEventListener(type, skip);
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
      if (uniforms) gl.deleteBuffer(uniforms.buffer);
      if (program) gl.deleteProgram(program);
    };
  }, []);

  return (
    <div ref={wrapRef} aria-hidden="true" className="absolute inset-0 pointer-events-none select-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
