/**
 * Header: frosted "is-scrolled" state (desktop) + mobile menu.
 * Menu: aria-expanded, Esc closes, focus trapped inside button + nav while open,
 * closes on link click (same as the source HTML) and on outside click.
 */
const MOBILE = '(max-width: 640px)';

export function initHeader() {
  const header = document.querySelector('[data-header]');
  if (!header) return;

  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const toggle = header.querySelector('[data-menu-toggle]');
  const nav = header.querySelector('[data-menu]');
  if (!toggle || !nav) return;
  const iconOpen = toggle.querySelector('[data-icon-open]');
  const iconClose = toggle.querySelector('[data-icon-close]');
  const links = () => Array.from(nav.querySelectorAll('a'));

  const setOpen = (open, { focusToggle = false } = {}) => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    iconOpen.hidden = open;
    iconClose.hidden = !open;
    if (focusToggle) toggle.focus();
  };
  const isOpen = () => nav.classList.contains('is-open');

  toggle.addEventListener('click', () => setOpen(!isOpen()));
  nav.addEventListener('click', (e) => {
    if (e.target.closest('a') && isOpen()) setOpen(false);
  });

  document.addEventListener('keydown', (e) => {
    if (!isOpen()) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false, { focusToggle: true });
      return;
    }
    if (e.key === 'Tab') {
      const items = [toggle, ...links()];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (!items.includes(document.activeElement)) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  document.addEventListener('click', (e) => {
    if (isOpen() && !header.contains(e.target)) setOpen(false);
  });

  // Leaving the mobile layout always resets the menu.
  const mq = window.matchMedia(MOBILE);
  mq.addEventListener('change', () => {
    if (!mq.matches && isOpen()) setOpen(false);
  });
}
