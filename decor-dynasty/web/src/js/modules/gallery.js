import { scrollBehavior } from './motion.js';

/**
 * Recent Projects carousel — same behaviour as the source HTML:
 *  - starts centred on the middle card
 *  - prev/next arrows scroll one card (disabled at the ends)
 *  - mobile / touch: neighbours shrink to 0.88 with a smoothstep curve
 *  - desktop with a mouse: a pill follows the cursor showing the card name
 */
const MOBILE_OR_TOUCH = '(max-width: 640px), (hover: none)';

export function initGallery() {
  const root = document.querySelector('[data-gallery]');
  if (!root) return;
  const box = root.querySelector('[data-gallery-box]');
  const el = root.querySelector('[data-gallery-scroller]');
  const prev = document.querySelector('[data-gallery-prev]');
  const next = document.querySelector('[data-gallery-next]');
  const pill = root.querySelector('[data-pill]');
  const pillLabel = pill && pill.querySelector('[data-pill-label]');
  const cards = Array.from(el.querySelectorAll('.dd-card'));
  const mq = window.matchMedia(MOBILE_OR_TOUCH);

  const step = () => {
    const c = cards[0];
    const gap = parseFloat(getComputedStyle(el).columnGap) || 16;
    return c ? c.offsetWidth + gap : 516;
  };

  const updateArrows = () => {
    const atStart = el.scrollLeft <= 4;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    if (prev) prev.disabled = atStart;
    if (next) next.disabled = atEnd;
  };

  const markCenter = () => {
    const mid = el.scrollLeft + el.clientWidth / 2;
    let bi = 0;
    let bestD = Infinity;
    cards.forEach((c, i) => {
      const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid);
      if (d < bestD) {
        bestD = d;
        bi = i;
      }
    });
    const stp = step();
    const isMobile = mq.matches;
    cards.forEach((c, i) => {
      c.classList.toggle('is-center', i === bi);
      c.classList.toggle('is-before', i < bi);
      c.classList.toggle('is-after', i > bi);
      if (isMobile) {
        const d = c.offsetLeft + c.offsetWidth / 2 - mid;
        const t = Math.min(1, Math.abs(d) / stp);
        const e = t * t * (3 - 2 * t);
        c.style.transform = `scale(${(1 - 0.12 * e).toFixed(4)})`;
        c.style.transformOrigin = d < -1 ? '100% 50%' : d > 1 ? '0% 50%' : '50% 50%';
        c.style.boxShadow = `0 16px 32px rgba(43,37,35,${(0.18 * (1 - e)).toFixed(3)})`;
        c.style.zIndex = t < 0.5 ? '1' : '0';
      } else if (c.style.transform) {
        c.style.transform = '';
        c.style.transformOrigin = '';
        c.style.boxShadow = '';
        c.style.zIndex = '';
      }
    });
  };

  // Centre on the middle card once layout (fonts, images) has settled.
  let tries = 0;
  const centre = () => {
    const mid = cards[Math.floor(cards.length / 2)];
    if (mid && el.scrollWidth > el.clientWidth) {
      el.scrollLeft = mid.offsetLeft + mid.offsetWidth / 2 - el.clientWidth / 2;
    }
    updateArrows();
    markCenter();
    if (++tries < 4) requestAnimationFrame(centre);
  };
  centre();
  window.addEventListener('load', () => {
    tries = 0;
    centre();
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(centre);

  let resizeTimer = 0;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      tries = 0;
      centre();
    }, 120);
  });

  let scrollQueued = false;
  el.addEventListener(
    'scroll',
    () => {
      if (scrollQueued) return;
      scrollQueued = true;
      requestAnimationFrame(() => {
        scrollQueued = false;
        updateArrows();
        markCenter();
      });
    },
    { passive: true },
  );

  if (prev) prev.addEventListener('click', () => el.scrollBy({ left: -step(), behavior: scrollBehavior() }));
  if (next) next.addEventListener('click', () => el.scrollBy({ left: step(), behavior: scrollBehavior() }));

  if (!pill || !box) return;

  // ---- cursor pill (mouse only; CSS hides it on touch / mobile) ----
  let boxW = 1440;
  let boxH = 560;
  let tx = 0;
  let ty = 0;
  let px = 0;
  let py = 0;
  let placed = false;
  let label = null;
  let raf = 0;
  let last = null;

  const clampX = (x) => {
    const est = 90 + (pillLabel.textContent || '').length * 14;
    const w = Math.max(est, (pill.firstElementChild && pill.firstElementChild.offsetWidth) || 0);
    const m = w / 2 + 16;
    if (boxW < 2 * m) return boxW / 2;
    return Math.max(m, Math.min(boxW - m, x));
  };
  const place = () => {
    pill.style.transform = `translate3d(${px - boxW / 2}px,${py - boxH / 2}px,0) translate(-50%,-50%)`;
  };
  const loop = (t) => {
    if (last != null && placed) {
      const dt = Math.min(t - last, 64) / 1000;
      const k = 1 - Math.exp(-dt * 9);
      px += (clampX(tx) - px) * k;
      py += (ty - py) * k;
      place();
    }
    last = t;
    raf = placed ? requestAnimationFrame(loop) : 0;
  };

  box.addEventListener('mousemove', (e) => {
    const r = box.getBoundingClientRect();
    boxW = box.offsetWidth || r.width;
    boxH = box.offsetHeight || r.height;
    const s = r.width / boxW || 1;
    tx = (e.clientX - r.left) / s;
    ty = (e.clientY - r.top) / s;
    const card = e.target.closest ? e.target.closest('[data-label]') : null;
    const nextLabel = card ? card.getAttribute('data-label') : null;
    if (nextLabel !== label) {
      label = nextLabel;
      if (label) pillLabel.textContent = label;
      pill.classList.toggle('is-visible', !!label);
    }
    if (!placed) {
      px = clampX(tx);
      py = ty;
      placed = true;
      place();
      last = null;
      if (!raf) raf = requestAnimationFrame(loop);
    }
  });

  box.addEventListener('mouseleave', () => {
    placed = false;
    label = null;
    pill.classList.remove('is-visible');
    setTimeout(() => {
      if (!placed) pill.style.transform = 'translate(-50%,-50%)';
    }, 420);
  });
}
