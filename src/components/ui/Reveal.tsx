'use client';

import { useRef, type CSSProperties, type ElementType, type ReactNode } from 'react';
import { useInView } from '@/hooks';

export function Reveal({
  children,
  delay = 0,
  y = 24,
  as: As = 'div',
  className,
  style,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);

  return (
    <As
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : `translateY(${y}px)`,
        transition: `opacity 900ms ${delay}ms var(--ease-brand), transform 900ms ${delay}ms var(--ease-brand)`,
        ...style,
      }}
    >
      {children}
    </As>
  );
}
