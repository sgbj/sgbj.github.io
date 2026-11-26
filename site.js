// Portfolio behaviour: the scene reacts to the page.
//   hovering projects makes the falls surge, your name flares the tower window,
//   links wake the staff crystal. The background itself stays fixed.
import { mountVigil } from './dist/vigil.min.js';

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const coarse = matchMedia('(pointer: coarse)').matches;

// keyboard scrolling (arrows, space, page down) goes to the framed screen
document.getElementById('screen').focus({ preventScroll: true });

// ── the scene ─────────────────────────────────────────────────────────────
let bg = null;
try {
  bg = await mountVigil(document.getElementById('vigil'), { fontUrl: null, fontFamily: 'JetBrains Mono', fontSize: 11, fps: coarse ? 24 : 30 });
} catch (e) {
  console.warn('vigil: falling back to plain black', e);
}

if (bg) {
  const U = bg.options.sceneUniforms;
  U.uFocus = [0.5, 0.545];                   // landscape framing (plate uv): keeps the fire in frame

  const target = { window: 0, crystal: 0, fire: 0, falls: 0 };
  const cur = { ...target };

  document.querySelectorAll('[data-flare]').forEach((el) => {
    const k = el.dataset.flare; if (!(k in target)) return;
    const on = () => (target[k] = 1), off = () => (target[k] = 0);
    el.addEventListener('pointerenter', on); el.addEventListener('pointerleave', off);
    el.addEventListener('focus', on); el.addEventListener('blur', off);
  });

  const apply = () => {
    U.uWindowBoost = cur.window;
    U.uCrystalBoost = cur.crystal;
    U.uFireBoost = cur.fire;
    U.uFallBoost = cur.falls;
  };

  if (reduce) {
    apply(); bg.render(0.2);                // one still frame, no motion
  } else {
    let last = performance.now();
    (function ease(now) {
      const dt = Math.min(0.1, (now - last) / 1000); last = now;
      for (const k in target) {
        const rate = target[k] > cur[k] ? 5 : 1.6;   // flare in quickly, fade out slowly
        cur[k] += (target[k] - cur[k]) * (1 - Math.exp(-rate * dt));
      }
      apply();
      requestAnimationFrame(ease);
    })(last);
  }
}
