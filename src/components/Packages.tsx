'use client';

import { useState } from 'react';
import { Arrow } from '@/components/ui/Arrow';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { Tag } from '@/components/ui/Tag';
import { packageNotes, packages } from '@/lib/site';

type Pkg = (typeof packages)[number];

export function Packages() {
  const [active, setActive] = useState(1);

  return (
    <section id="packages" className="relative bg-bg-alt py-24 md:py-32 lg:py-[140px]">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
        <div className="mb-16 grid grid-cols-1 items-end gap-10 lg:grid-cols-2">
          <Reveal>
            <div>
              <Eyebrow>◯ Packages · Transparent pricing</Eyebrow>
              <h2 className="mt-5 font-display text-[clamp(38px,5.5vw,84px)] font-normal leading-[0.95] tracking-[-0.025em] text-ink">
                Three ways
                <br />
                to <em className="font-light italic text-cyan">spin it</em>.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="max-w-[460px] font-sans text-base leading-[1.6] text-ink-soft lg:justify-self-end">
              Everything is custom-tuned on a call. Prices here are the starting line — we&apos;ll
              build the exact package around your venue, guest count, and vibe.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((p, i) => (
            <Reveal key={p.name} delay={i * 100} className="h-full">
              <PackageCard
                pkg={p}
                active={active === i}
                onActivate={() => setActive(i)}
              />
            </Reveal>
          ))}
        </div>

        <ul className="mt-8 flex list-none flex-wrap items-center justify-center gap-4 p-0">
          {packageNotes.map((n) => (
            <li key={n}>
              <Tag>{n}</Tag>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function PackageCard({
  pkg,
  active,
  onActivate,
}: {
  pkg: Pkg;
  active: boolean;
  onActivate: () => void;
}) {
  const popular = 'popular' in pkg && pkg.popular;
  const borderColor = active
    ? popular
      ? 'var(--color-magenta)'
      : 'rgba(255,255,255,0.22)'
    : 'rgba(255,255,255,0.08)';

  return (
    <div
      onMouseEnter={onActivate}
      onFocusCapture={onActivate}
      className="relative flex h-full min-h-[560px] flex-col rounded-md border p-8 transition-all duration-400 ease-brand"
      style={{
        background: active ? 'var(--color-bg)' : 'rgba(255,255,255,0.02)',
        borderColor,
        transform: active ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      {popular && (
        <span className="absolute -top-3 left-6 rounded bg-magenta px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white">
          Most booked
        </span>
      )}

      <div className="flex items-baseline justify-between gap-3">
        <h3 className="m-0 font-display text-[32px] font-normal tracking-[-0.02em] text-ink sm:text-4xl">
          {pkg.name}
        </h3>
        <span className="font-mono text-[11px] tracking-[0.12em] text-ink-soft">{pkg.tag}</span>
      </div>

      <p className="mt-5 flex items-baseline gap-1">
        <span className="font-mono text-sm text-ink-soft">from $</span>
        <span className="font-display text-[56px] font-normal leading-none tracking-[-0.03em] text-ink sm:text-[64px]">
          {pkg.price}
        </span>
      </p>

      <p className="mt-4 font-sans text-sm leading-[1.55] text-ink-soft">{pkg.desc}</p>

      <ul className="m-0 mt-6 flex list-none flex-col gap-2.5 border-t border-white/[0.08] p-0 pt-5">
        {pkg.feats.map((f) => (
          <li key={f} className="flex items-center gap-2.5 font-sans text-sm text-ink">
            <span
              aria-hidden="true"
              className="h-1 w-1 shrink-0 rounded-full"
              style={{ background: popular ? 'var(--color-magenta)' : 'var(--color-cyan)' }}
            />
            {f}
          </li>
        ))}
      </ul>

      <div className="flex-1" />

      <a
        href="#book"
        className="mt-7 inline-flex items-center justify-between rounded-full border px-5 py-3.5 font-display text-[15px] font-medium no-underline transition-colors duration-300"
        style={{
          background: popular ? 'var(--color-ink)' : 'transparent',
          color: popular ? 'var(--color-bg)' : 'var(--color-ink)',
          borderColor: popular ? 'var(--color-ink)' : 'rgba(255,255,255,0.2)',
        }}
      >
        Reserve {pkg.name} <Arrow />
      </a>
    </div>
  );
}
