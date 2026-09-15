import type { ReactNode } from 'react';

export function Eyebrow({
  children,
  className = 'text-ink-soft',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.24em] ${className}`}
    >
      <span aria-hidden="true" className="h-px w-6 bg-current opacity-50" />
      {children}
    </div>
  );
}
