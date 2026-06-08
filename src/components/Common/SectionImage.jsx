import React, { useEffect, useRef, useState } from 'react';

/**
 * Image de section : précharge quand la zone approche du viewport,
 * puis affichage lazy pour limiter le coût initial.
 */
export default function SectionImage({
  src,
  alt,
  className = '',
  priority = false,
  rootMargin = '420px 0px',
  ...rest
}) {
  const ref = useRef(null);
  const [ready, setReady] = useState(priority);

  useEffect(() => {
    if (priority || ready) return undefined;

    const node = ref.current;
    if (!node) return undefined;

    const preload = () => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
      setTimeout(() => link.remove(), 8000);

      const img = new Image();
      img.decoding = 'async';
      img.src = src;
      img.onload = () => setReady(true);
      img.onerror = () => setReady(true);
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            preload();
            observer.disconnect();
          }
        },
        { rootMargin, threshold: 0.01 }
      );
      observer.observe(node);
      return () => observer.disconnect();
    }

    preload();
    return undefined;
  }, [priority, ready, rootMargin, src]);

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      {...rest}
    />
  );
}
