import { scrollBehavior } from './motion.js';

/**
 * Back-to-top button: appears after 500px of scroll; its ring shows
 * page progress (stroke-dashoffset 144.5 → 0), as in the source HTML.
 * While hidden it is removed from the tab order and the a11y tree.
 */
const CIRC = 144.5;

export function initBackToTop() {
  const btn = document.querySelector('[data-top]');
  if (!btn) return;
  const ring = btn.querySelector('[data-top-ring]');
  const home = document.getElementById('home');
  let shown = null;
  let queued = false;

  const update = () => {
    queued = false;
    const se = document.scrollingElement || document.documentElement;
    const maxY = se.scrollHeight - window.innerHeight;
    const sy = window.scrollY || se.scrollTop || 0;
    const prog = maxY > 0 ? Math.min(1, sy / maxY) : 1;
    if (ring) ring.setAttribute('stroke-dashoffset', (CIRC * (1 - prog)).toFixed(1));
    const next = maxY <= 0 || sy > 500;
    if (next !== shown) {
      shown = next;
      btn.classList.toggle('is-hidden', !next);
      if (next) {
        btn.removeAttribute('tabindex');
        btn.removeAttribute('aria-hidden');
      } else {
        btn.setAttribute('tabindex', '-1');
        btn.setAttribute('aria-hidden', 'true');
      }
    }
  };
  const onScroll = () => {
    if (!queued) {
      queued = true;
      requestAnimationFrame(update);
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: scrollBehavior() });
    if (home) home.focus({ preventScroll: true });
  });
}
