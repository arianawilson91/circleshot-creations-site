import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { processSteps } from '@/lib/site';

export function Process() {
  return (
    <section className="relative bg-bg py-24 md:py-32 lg:py-[140px]">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
        <div className="mb-16 max-w-[760px]">
          <Reveal>
            <Eyebrow>◈ The process · four moves</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-5 font-display text-[clamp(38px,5.5vw,84px)] font-normal leading-[0.95] tracking-[-0.025em] text-ink">
              Nothing to <em className="font-light italic">figure out</em>.
              <br />
              We <span className="text-gradient-violet">run the show.</span>
            </h2>
          </Reveal>
        </div>

        <ol className="grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 80}>
              <div className="border-t border-white/15 pt-7">
                <p className="mb-5 font-mono text-[11px] tracking-[0.22em] text-cyan">STEP {s.n}</p>
                <h3 className="m-0 font-display text-[26px] font-normal tracking-[-0.02em] text-ink">
                  {s.label}
                </h3>
                <p className="mt-3.5 font-sans text-sm leading-[1.6] text-ink-soft">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
