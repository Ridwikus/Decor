/** True when the user asked the OS for reduced motion. */
export const prefersReducedMotion = () =>
  !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const scrollBehavior = () => (prefersReducedMotion() ? 'auto' : 'smooth');
