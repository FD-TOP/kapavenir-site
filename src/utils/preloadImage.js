const preloaded = new Set();

export function preloadImage(src) {
  if (!src || preloaded.has(src)) return;
  preloaded.add(src);

  const img = new Image();
  img.decoding = 'async';
  img.src = src;
}
