'use client';

import { useEffect, useState } from 'react';
import { CircleShotLogo } from '@/components/ui/Logo';
import { Arrow } from '@/components/ui/Arrow';
import { useScrollY } from '@/hooks';
import { contact, nav } from '@/lib/site';

export function Nav() {
  const scrollY = useScrollY();
  const stuck = scrollY > 40;
  const [open, setOpen] = useState(false);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      className="fixed left-1/2 z-50 -translate-x-1/2 transition-all duration-400 ease-brand"
      style={{
        top: stuck ? 16 : 24,
        width: stuck ? 'min(1280px, calc(100% - 32px))' : 'min(1400px, calc(100% - 40px))',
      }}
    >
      <div
        className="flex items-center justify-between rounded-full border transition-all duration-400 ease-brand"
        style={{
          padding: stuck ? '12px 16px 12px 14px' : '16px 20px',
          background: stuck ? 'rgba(10, 20, 41, 0.72)' : 'transparent',
          backdropFilter: stuck ? 'blur(16px) saturate(140%)' : 'none',
          WebkitBackdropFilter: stuck ? 'blur(16px) saturate(140%)' : 'none',
          borderColor: stuck ? 'rgba(255,255,255,0.09)' : 'transparent',
        }}
      >
        <a
          href="#top"
          className="min-w-0 no-underline"
          aria-label={`${contact.name} — back to top`}
        >
          {/* Wordmark is hidden under 480px — mark, CTA and menu button won't fit. */}
          <CircleShotLogo
            size={stuck ? 36 : 44}
            priority
            wordmarkClassName="hidden min-[480px]:flex"
          />
        </a>

        {/* Desktop links */}
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {nav.map((it) => (
            <a
              key={it.href}
              href={it.href}
              className="rounded-full px-4 py-2.5 font-sans text-sm text-ink no-underline transition-colors duration-200 hover:bg-white/[0.07]"
            >
              {it.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={contact.phoneHref}
            className="hidden font-mono text-xs tracking-[0.06em] text-ink-soft no-underline transition-colors hover:text-ink sm:inline"
          >
            {contact.phoneDisplay}
          </a>
          <a
            href="#book"
            className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-ink px-3.5 py-2.5 font-display text-[13px] font-medium text-bg no-underline transition-transform duration-200 hover:-translate-y-px sm:px-4 sm:text-sm"
          >
            Book a date <Arrow />
          </a>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-ink lg:hidden"
          >
            <span aria-hidden="true" className="relative block h-3 w-4">
              <span
                className="absolute left-0 block h-px w-4 bg-current transition-transform duration-300"
                style={{ top: open ? 6 : 2, transform: open ? 'rotate(45deg)' : 'none' }}
              />
              <span
                className="absolute left-0 block h-px w-4 bg-current transition-opacity duration-200"
                style={{ top: 6, opacity: open ? 0 : 1 }}
              />
              <span
                className="absolute left-0 block h-px w-4 bg-current transition-transform duration-300"
                style={{ top: open ? 6 : 10, transform: open ? 'rotate(-45deg)' : 'none' }}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="mt-2 overflow-hidden rounded-3xl border border-white/10 bg-[rgba(10,20,41,0.94)] p-3 backdrop-blur-xl lg:hidden"
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {nav.map((it) => (
            <a
              key={it.href}
              href={it.href}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3.5 font-display text-lg text-ink no-underline transition-colors hover:bg-white/[0.07]"
            >
              {it.label}
            </a>
          ))}
          <a
            href={contact.phoneHref}
            className="rounded-2xl px-4 py-3.5 font-mono text-sm tracking-[0.06em] text-ink-soft no-underline"
          >
            {contact.phoneDisplay}
          </a>
        </nav>
      </div>
    </header>
  );
}
