import { initHeader } from './modules/header.js';
import { initTicker } from './modules/ticker.js';
import { initGallery } from './modules/gallery.js';
import { initBackToTop } from './modules/back-to-top.js';

const start = () => {
  initHeader();
  initTicker();
  initGallery();
  initBackToTop();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start, { once: true });
} else {
  start();
}
