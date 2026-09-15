'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Arrow } from '@/components/ui/Arrow';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { usePrefersReducedMotion } from '@/hooks';
import { shots } from '@/lib/site';

type Shot = (typeof shots)[number];

export function Reel() {
  const reduced = usePrefersReducedMotion();
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  // Autoplay, unless reduced motion is on or the visitor has taken control.
  useEffect(() => {
    if (reduced || paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % shots.length), 4800);
    return () => clearInterval(t);
  }, [reduced, paused]);

  // Resume 12s after the last manual selection.
  useEffect(() => {
    if (!paused) return;
    const t = setTimeout(() => setPaused(false), 12000);
    return () => clearTimeout(t);
  }, [paused, idx]);

  const select = (i: number) => {
    setIdx(i);
    setPaused(true);
  };

  return (
    <section id="reel" className="relative overflow-hidden bg-bg py-24 md:py-32 lg:py-[140px]">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
        <div className="mb-14 grid grid-cols-1 items-end gap-10 lg:grid-cols-2">
          <div>
            <Reveal>
              <Eyebrow>▶ Live Reel · 2025–2026</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-5 font-display text-[clamp(38px,5.5vw,84px)] font-normal leading-[0.95] tracking-[-0.025em] text-ink">
                The footage <em className="font-light italic opacity-60">speaks</em>
                <br />
                for itself.
              </h2>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <div
              role="tablist"
              aria-label="Choose a shot"
              className="flex gap-2.5 lg:justify-self-end"
            >
              {shots.map((s, i) => (
                <button
                  key={s.ev}
                  type="button"
                  role="tab"
                  aria-selected={i === idx}
                  aria-label={s.ev}
                  onClick={() => select(i)}
                  className="h-1 rounded-sm border-none p-0 transition-all duration-400 ease-brand"
                  style={{
                    width: i === idx ? 32 : 10,
                    background: i === idx ? 'var(--color-cyan)' : 'rgba(255,255,255,0.2)',
                  }}
                />
              ))}
            </div>
          </Reveal>
        </div>

        {/* Desktop: prev / current / next. Mobile: current only. */}
        <div className="grid h-[420px] grid-cols-1 items-stretch gap-5 sm:h-[520px] lg:h-[620px] lg:grid-cols-[1fr_2fr_1fr]">
          <div className="hidden lg:block">
            <ShotCard shot={shots[(idx + shots.length - 1) % shots.length]} minor />
          </div>
          <ShotCard shot={shots[idx]} main />
          <div className="hidden lg:block">
            <ShotCard shot={shots[(idx + 1) % shots.length]} minor />
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
            REC · {String(idx + 1).padStart(2, '0')} / {String(shots.length).padStart(2, '0')} ·{' '}
            {shots[idx].ev}
          </p>
          <a
            href="#book"
            className="inline-flex items-center gap-2.5 font-display text-base italic text-ink no-underline"
          >
            Book your spin <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}

function ShotCard({ shot, main, minor }: { shot: Shot; main?: boolean; minor?: boolean }) {
  return (
    <div
      className="relative h-full self-center overflow-hidden rounded-md border border-white/10 bg-black transition-all duration-[800ms] ease-brand"
      style={{
        opacity: minor ? 0.5 : 1,
        transform: minor ? 'scale(0.94)' : 'scale(1)',
        height: minor ? '84%' : '100%',
      }}
    >
      {shot.type === 'video' ? (
        <video
          src={shot.src}
          poster="/assets/photo-1.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload={main ? 'metadata' : 'none'}
          aria-label={shot.ev}
          className="h-full w-full object-cover"
        />
      ) : (
        <Image
          src={shot.src}
          alt={shot.ev}
          fill
          sizes={main ? '(max-width: 1024px) 100vw, 640px' : '320px'}
          className="object-cover"
        />
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(10,20,41,0.4) 0%, transparent 30%, transparent 70%, rgba(10,20,41,0.8) 100%)',
        }}
      />

      {main && (
        <div
          className="absolute left-5 top-5 flex items-center gap-2 rounded border bg-black/55 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink backdrop-blur-[6px]"
          style={{ borderColor: `${shot.tone}55` }}
        >
          <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-[#FF4040] shadow-[0_0_8px_#FF4040]" />
          {shot.type === 'video' ? 'LIVE · ' : 'STILL · '}
          {shot.accent}
        </div>
      )}

      <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/85">{shot.ev}</p>
      </div>
    </div>
  );
}
