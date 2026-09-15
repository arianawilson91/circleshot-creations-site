'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { Arrow } from '@/components/ui/Arrow';
import { ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { useMouse, usePrefersReducedMotion } from '@/hooks';
import { heroStats } from '@/lib/site';

export function Hero() {
  const mouse = useMouse();

  return (
    <section
      id="rig"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-bg pb-20 pt-32 md:pt-36"
    >
      {/* Ambient gradient blobs — follow the cursor on fine-pointer devices only. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-[900px] w-[900px] rounded-full opacity-[0.22] blur-[40px] transition-[top,left] duration-700 ease-out"
        style={{
          top: `${-200 + mouse.y * 80}px`,
          left: `${-200 + mouse.x * 120}px`,
          background: 'radial-gradient(circle, var(--color-cyan) 0%, transparent 60%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-[700px] w-[700px] rounded-full opacity-[0.18] blur-[40px] transition-[bottom,right] duration-700 ease-out"
        style={{
          bottom: `${-200 - mouse.y * 80}px`,
          right: `${-200 - mouse.x * 100}px`,
          background: 'radial-gradient(circle, var(--color-magenta) 0%, transparent 60%)',
        }}
      />
      <div aria-hidden="true" className="hero-grid absolute inset-0" />

      <div className="relative mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-10 px-6 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:px-12">
        {/* Copy */}
        <div className="relative z-[2]">
          <Reveal>
            <Eyebrow className="text-cyan">
              <span aria-hidden="true">◯</span> 360° Photo Booth · Southwest Florida
            </Eyebrow>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mt-7 font-display text-[clamp(44px,9vw,112px)] font-normal leading-[0.92] tracking-[-0.025em] text-ink">
              Capture{' '}
              <em className="text-gradient font-light italic">every laugh.</em>
              <br />
              Spin{' '}
              <span className="relative">
                every
                <svg
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-2 h-3.5 w-full"
                  viewBox="0 0 200 14"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 10 Q 50 2 100 8 T 198 6"
                    stroke="var(--color-magenta)"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{' '}
              moment.
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-8 max-w-[520px] font-sans text-base leading-[1.55] text-ink-soft sm:text-[18px]">
              A 360° booth isn&apos;t a gimmick — it&apos;s a memory machine. We bring the rig, the
              lights, the props, and a host who knows how to make your guests{' '}
              <em className="italic text-ink">actually</em> have fun. Weddings, proms, quinces,
              brand launches. Naples to Tampa.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-10 flex flex-wrap items-center gap-3.5">
              <ButtonLink href="#book" primary>
                Check your date <Arrow />
              </ButtonLink>
              <ButtonLink href="#reel">Watch the reel</ButtonLink>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft sm:ml-2">
                Booking · Summer + Fall 2026
              </p>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <dl className="mt-14 grid max-w-[560px] grid-cols-3 gap-6 border-t border-white/10 pt-7">
              {heroStats.map((s) => (
                <div key={s.l}>
                  <dt className="sr-only">{s.l}</dt>
                  <dd className="m-0">
                    <span className="block font-display text-[28px] font-normal tracking-[-0.02em] text-ink sm:text-4xl">
                      {s.n}
                    </span>
                    <span className="mt-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                      {s.l}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Rig */}
        <div className="relative flex items-center justify-center py-16 lg:h-[700px] lg:py-0">
          <HeroRig mouse={mouse} />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-soft md:flex"
      >
        <span>Scroll · see the spin</span>
        <span className="h-10 w-px bg-[linear-gradient(var(--color-ink-soft),transparent)]" />
      </div>
    </section>
  );
}

function HeroRig({ mouse }: { mouse: { x: number; y: number } }) {
  const reduced = usePrefersReducedMotion();
  const rotRef = useRef<HTMLSpanElement>(null);
  const tilt = mouse.x * 2 - 1;

  /**
   * The live rotation readout in the CAMERA chip. Written straight to the DOM
   * rather than through state — the prototype re-rendered the entire hero at
   * 60fps to animate this one number.
   */
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const deg = Math.round((((t - start) / 1000) * 18) % 360);
      if (rotRef.current) rotRef.current.textContent = `ROT ${deg}°`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return (
    <div className="relative aspect-square w-full max-w-[640px] scale-[0.72] sm:scale-90 lg:scale-100">
      {/* Rings */}
      <div className="rig-ring-outer absolute inset-0 rounded-full border border-dashed border-white/[0.22]" />
      <div className="rig-ring-middle absolute inset-10 rounded-full border border-white/[0.08]" />
      <div className="absolute inset-20 rounded-full border border-white/[0.05]" />

      {/* Orbiting dots — outer wrapper spins, inner counter-spins to keep the dot upright. */}
      <div className="rig-orbit-cyan absolute left-1/2 top-1/2 h-0 w-0">
        <span className="absolute block h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_20px_var(--color-cyan),0_0_40px_var(--color-cyan)] [transform:translateX(320px)]" />
      </div>
      <div className="rig-orbit-magenta absolute left-1/2 top-1/2 h-0 w-0">
        <span className="absolute block h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-magenta shadow-[0_0_14px_var(--color-magenta),0_0_32px_var(--color-magenta)] [transform:translateX(280px)]" />
      </div>

      {/* Centre logo */}
      <div
        className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full transition-transform duration-700 ease-out"
        style={{
          boxShadow:
            '0 0 80px rgba(114,182,255,0.35), 0 0 160px rgba(255,107,170,0.2), 0 30px 80px -20px rgba(0,0,0,0.7)',
          transform: `translate(-50%, -50%) perspective(1000px) rotateY(${tilt * 3}deg)`,
        }}
      >
        <Image
          src="/assets/logo-v3.png"
          alt="CircleShot Creations logo"
          width={380}
          height={380}
          priority
          sizes="380px"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Floating video card */}
      <div
        className="absolute -right-10 -top-5 h-[260px] w-[180px] overflow-hidden rounded-lg border border-white/20 bg-black transition-transform duration-500 ease-out"
        style={{
          boxShadow: '0 24px 60px -16px rgba(0,0,0,0.8), 0 0 30px rgba(114,182,255,0.25)',
          transform: `rotate(6deg) translateY(${mouse.y * -10}px)`,
        }}
      >
        <video
          src="/assets/hero-reel.mp4"
          poster="/assets/photo-1.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="360° booth reel"
          className="h-full w-full object-cover"
        />
        <span className="absolute left-2 top-2 flex items-center gap-1.5 rounded bg-black/60 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-white">
          <span className="animate-pulse-dot h-[5px] w-[5px] rounded-full bg-[#FF4040] shadow-[0_0_6px_#FF4040]" />
          Live reel
        </span>
      </div>

      {/* Floating photo card */}
      <div
        className="absolute -bottom-5 -left-8 h-[230px] w-[170px] overflow-hidden rounded-lg border border-white/20 transition-transform duration-500 ease-out"
        style={{
          boxShadow: '0 24px 60px -16px rgba(0,0,0,0.8), 0 0 30px rgba(255,107,170,0.25)',
          transform: `rotate(-8deg) translateY(${mouse.y * 10}px)`,
        }}
      >
        <Image
          src="/assets/photo-3.jpg"
          alt="Guests in the CircleShot booth"
          width={170}
          height={230}
          sizes="170px"
          className="h-full w-full object-cover"
        />
      </div>

      <SpecChip top="12%" left="-8%" label="Camera" accent="var(--color-cyan)">
        <span ref={rotRef}>ROT 0°</span>
      </SpecChip>
      <SpecChip top="68%" left="78%" label="FPS" accent="var(--color-magenta)">
        120
      </SpecChip>
      <SpecChip top="88%" left="44%" label="Rig" accent="var(--color-violet)">
        CSC // v4
      </SpecChip>
    </div>
  );
}

function SpecChip({
  top,
  left,
  label,
  accent,
  children,
}: {
  top: string;
  left: string;
  label: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div
      aria-hidden="true"
      className="absolute flex items-center gap-2.5 rounded-md border bg-[rgba(10,20,41,0.7)] px-3.5 py-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink backdrop-blur-[10px]"
      style={{ top, left, borderColor: `${accent}55`, boxShadow: `0 8px 24px -8px ${accent}44` }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
      />
      <span className="opacity-60">{label}</span>
      <span style={{ color: accent }}>{children}</span>
    </div>
  );
}
