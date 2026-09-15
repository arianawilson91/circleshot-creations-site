import type { CSSProperties } from 'react';
import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { galleryTiles } from '@/lib/site';

export function Gallery() {
  return (
    <section className="relative overflow-hidden bg-bg py-24 md:py-32 lg:py-[140px]">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
        <Reveal>
          <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="m-0 font-display text-[clamp(30px,4vw,64px)] font-normal italic leading-[0.95] tracking-[-0.025em] text-ink">
              Stills from the spin.
            </h2>
            <a
              href="#book"
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft no-underline transition-colors hover:text-ink"
            >
              View full archive →
            </a>
          </div>
        </Reveal>

        {/*
          `.collage` (see globals.css) applies the --c / --r spans only at >=1024px.
          Below that the tiles fall back to a plain 2-up so nothing gets slivered.
          The spans have to sit on the Reveal wrapper itself — it's the grid child.
        */}
        <div className="collage grid grid-cols-2 gap-3 lg:auto-rows-[120px] lg:grid-cols-12">
          {galleryTiles.map((t, i) => (
            <Reveal
              key={`${t.label}-${i}`}
              delay={i * 40}
              style={{ '--c': t.c, '--r': t.r } as CSSProperties}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded border border-white/[0.08] bg-black lg:aspect-auto lg:h-full">
                {t.video ? (
                  <video
                    src={t.video}
                    poster="/assets/photo-2.jpg"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    aria-label={t.label}
                    className="h-full w-full object-cover"
                  />
                ) : t.img ? (
                  <Image
                    src={t.img}
                    alt={t.label}
                    fill
                    /* Widest tile is a 5/12 span of a ~1344px content box ≈ 560px. */
                    sizes="(max-width: 1024px) 50vw, 560px"
                    loading="lazy"
                    className="object-cover"
                  />
                ) : null}
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, transparent 60%, rgba(10,20,41,0.75) 100%)',
                  }}
                />
                <p className="absolute bottom-3 left-3.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/85">
                  {t.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
