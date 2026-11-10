import { prefersReducedMotion } from './motion.js';

/**
 * Marquee: moves left at 60px/s and wraps at half the track width
 * (the track holds two groups), exactly like the source HTML.
 * Added for WCAG 2.2.2: a pause/play button, and it starts paused
 * when the user prefers reduced motion.
 */
const SPEED = 60; // px per second

export function initTicker() {
  const root = document.querySelector('[data-ticker]');
  const track = root && root.querySelector('[data-ticker-track]');
  if (!track) return;
  const btn = root.querySelector('[data-ticker-toggle]');

  let x = 0;
  let last = null;
  let raf = 0;
  let paused = prefersReducedMotion();

  const tick = (t) => {
    if (last != null) {
      const dt = Math.min(t - last, 64) / 1000;
      const half = track.scrollWidth / 2;
      x -= SPEED * dt;
      if (half > 0 && -x >= half) x += half;
      track.style.transform = `translate3d(${x}px,0,0)`;
    }
    last = t;
    raf = requestAnimationFrame(tick);
  };

  const play = () => {
    if (raf) return;
    last = null;
    raf = requestAnimationFrame(tick);
  };
  const stop = () => {
    cancelAnimationFrame(raf);
    raf = 0;
  };

  const render = () => {
    if (!btn) return;
    btn.setAttribute('aria-pressed', String(paused));
    btn.setAttribute('aria-label', paused ? 'Play scrolling text' : 'Pause scrolling text');
    btn.querySelector('[data-icon-pause]').hidden = paused;
    btn.querySelector('[data-icon-play]').hidden = !paused;
  };

  if (btn) {
    btn.addEventListener('click', () => {
      paused = !paused;
      if (paused) stop();
      else play();
      render();
    });
  }

  // Don't burn frames while the tab is hidden.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else if (!paused) play();
  });

  render();
  if (!paused) play();
}
