'use client';

import Image from 'next/image';
import { Arrow } from '@/components/ui/Arrow';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { events, eventsTotal } from '@/lib/site';

type Ev = (typeof events)[number];

export function Events() {
  return (
    <section id="events" className="relative bg-bg-alt py-24 md:py-32 lg:py-[140px]">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-10">
          <Reveal>
            <div>
              <Eyebrow>✦ Events · The room we read</Eyebrow>
              <h2 className="mt-5 font-display text-[clamp(38px,5.5vw,84px)] font-normal leading-[0.95] tracking-[-0.025em] text-ink">
                Same rig.
                <br />
                <em className="font-light italic">Very different</em> rooms.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="text-left sm:text-right">
              <span className="block font-display text-5xl font-normal leading-none tracking-[-0.025em] text-ink sm:text-[56px]">
                {eventsTotal.count}
              </span>
              <span className="mt-1.5 block font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
                {eventsTotal.label}
              </span>
            </p>
          </Reveal>
        </div>

        <ul className="grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((e, i) => (
            <Reveal as="li" key={e.name} delay={i * 60}>
              <EventCard e={e} priority={i < 3} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function EventCard({ e, priority }: { e: Ev; priority: boolean }) {
  return (
    <article className="group relative aspect-[4/5] overflow-hidden rounded-md border border-white/[0.08] bg-bg">
      <Image
        src={e.img}
        alt={`${e.name} — CircleShot 360° booth`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
        loading={priority ? undefined : 'lazy'}
        priority={priority}
        className="object-cover transition-transform duration-500 ease-brand group-hover:scale-[1.04]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 transition-all duration-400"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(10,20,41,0.4) 60%, rgba(10,20,41,0.7) 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(10,20,41,0.75) 60%, rgba(10,20,41,0.95) 100%)',
        }}
      />

      <div className="absolute inset-x-6 top-6 flex items-start justify-between">
        <span
          className="rounded-sm border bg-black/35 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em]"
          style={{ color: e.color, borderColor: `${e.color}44` }}
        >
          ● {e.count} booked
        </span>
        <span
          aria-hidden="true"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-ink transition-transform duration-400 group-hover:-rotate-45"
        >
          <Arrow />
        </span>
      </div>

      <div className="absolute inset-x-6 bottom-6">
        <h3 className="m-0 font-display text-[30px] font-normal tracking-[-0.02em] text-ink transition-transform duration-400 group-hover:-translate-y-2 sm:text-4xl">
          {e.name}
        </h3>
        <p className="mt-2.5 max-w-[320px] translate-y-2.5 font-sans text-sm leading-[1.5] text-ink-soft opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
          {e.copy}
        </p>
      </div>
    </article>
  );
}
