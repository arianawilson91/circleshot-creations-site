import type { ReactNode } from 'react';

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.18] bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink">
      {children}
    </span>
  );
}
