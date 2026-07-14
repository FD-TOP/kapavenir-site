const MOBILE_QUERY = '(max-width: 768px)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export function isMobileViewport() {
  return window.matchMedia(MOBILE_QUERY).matches;
}

export function prefersReducedMotion() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

export function getScrollBehavior(preferred = 'smooth') {
  if (prefersReducedMotion() || isMobileViewport()) return 'auto';
  return preferred;
}

export function getNavOffset(extra = 12) {
  const header = document.querySelector('.nav-container');
  if (!header) return isMobileViewport() ? 88 : 100;
  return Math.ceil(header.getBoundingClientRect().bottom + extra);
}

function applyScrollTop(behavior) {
  window.scrollTo({ top: 0, left: 0, behavior });

  if (behavior === 'auto') {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }
}

export function scrollToPageTop(options = {}) {
  const { behavior = getScrollBehavior('smooth'), focusMain = true } = options;

  applyScrollTop(behavior);

  requestAnimationFrame(() => {
    applyScrollTop(behavior);
    requestAnimationFrame(() => applyScrollTop(behavior));
  });

  const retries = isMobileViewport() ? [60, 140, 280, 480] : [80, 200];
  const timers = retries.map((delay) => setTimeout(() => applyScrollTop('auto'), delay));

  if (focusMain) {
    requestAnimationFrame(() => {
      document.getElementById('main-content')?.focus({ preventScroll: true });
    });
  }

  return () => timers.forEach(clearTimeout);
}

export function scrollToElementById(id, options = {}) {
  const el = document.getElementById(id);
  if (!el) return false;

  const behavior = options.behavior ?? getScrollBehavior('smooth');
  const offset = options.offset ?? getNavOffset();

  if (behavior === 'auto') {
    const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset);
    window.scrollTo({ top, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = top;
    document.body.scrollTop = top;
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return true;
}

export function scrollToHash(hash, options = {}) {
  const id = hash.startsWith('#') ? hash.slice(1) : hash;
  if (!id) return () => {};

  const retries = isMobileViewport() ? [0, 80, 160, 300, 520, 800] : [0, 80, 160, 320];
  const timers = retries.map((delay) => setTimeout(() => scrollToElementById(id, options), delay));

  return () => timers.forEach(clearTimeout);
}
