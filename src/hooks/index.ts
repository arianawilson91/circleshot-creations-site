'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';

/** True once the user has set prefers-reduced-motion. Updates live. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return reduced;
}

/** rAF-throttled window.scrollY. */
export function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setY(window.scrollY);
        raf = 0;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return y;
}

/**
 * Fires once when the element scrolls into view.
 * Returns true immediately under reduced motion so nothing stays invisible.
 */
export function useInView(ref: RefObject<HTMLElement | null>, threshold = 0.15) {
  const reduced = usePrefersReducedMotion();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (reduced) {
      setInView(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    // Anything already above the fold on load should not wait for a scroll event.
    if (el.getBoundingClientRect().top < window.innerHeight) {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold, reduced]);

  return inView;
}

/**
 * Normalised cursor position (0..1). Returns dead-centre on touch devices and
 * under reduced motion so parallax never fires where it isn't wanted.
 */
export function useMouse() {
  const reduced = usePrefersReducedMotion();
  const [m, setM] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let raf = 0;
    let next = { x: 0.5, y: 0.5 };
    const onMove = (e: MouseEvent) => {
      next = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight };
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setM(next);
        raf = 0;
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return m;
}

/** Pauses a callback interval while the tab is hidden or the user has interacted. */
export function useInterval(callback: () => void, delay: number | null) {
  const saved = useRef(callback);
  useEffect(() => {
    saved.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => saved.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}
