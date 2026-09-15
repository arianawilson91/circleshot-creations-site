'use client';

import { useId, useState } from 'react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { faqs } from '@/lib/site';

export function Faq() {
  const [open, setOpen] = useState<number>(0);
  const baseId = useId();

  return (
    <section
      id="faq"
      className="border-t border-white/[0.06] bg-bg-alt py-24 md:py-32 lg:py-[140px]"
    >
      <div className="mx-auto max-w-[1100px] px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow>? Frequently asked</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="mt-5 font-display text-[clamp(30px,4vw,64px)] font-normal leading-[0.95] tracking-[-0.025em] text-ink">
                Ask the <em className="font-light italic">awkward</em> stuff.
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 font-sans text-[15px] leading-[1.6] text-ink-soft">
                Missing something?{' '}
                <a
                  href="#book"
                  className="border-b border-cyan text-cyan no-underline transition-opacity hover:opacity-80"
                >
                  Text us directly
                </a>{' '}
                — we reply fast.
              </p>
            </Reveal>
          </div>

          <div>
            {faqs.map((f, i) => {
              const isOpen = open === i;
              const panelId = `${baseId}-panel-${i}`;
              const btnId = `${baseId}-btn-${i}`;

              return (
                <Reveal key={f.q} delay={i * 50}>
                  <div className="border-b border-white/10 py-6">
                    <h3 className="m-0">
                      <button
                        type="button"
                        id={btnId}
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpen(isOpen ? -1 : i)}
                        className="flex w-full cursor-pointer items-center justify-between gap-6 border-none bg-transparent p-0 text-left"
                      >
                        <span className="font-display text-xl font-normal tracking-[-0.01em] text-ink sm:text-[22px]">
                          {f.q}
                        </span>
                        <span
                          aria-hidden="true"
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 text-ink transition-transform duration-300"
                          style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                        >
                          +
                        </span>
                      </button>
                    </h3>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      hidden={!isOpen}
                      className="overflow-hidden"
                    >
                      <p className="mt-3.5 max-w-[520px] font-sans text-[15px] leading-[1.65] text-ink-soft">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
