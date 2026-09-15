import { marqueeItems } from '@/lib/site';

export function Marquee() {
  // Tripled so the -33.333% keyframe loops seamlessly.
  const items = [...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y border-white/[0.08] bg-white/[0.015] py-5"
    >
      <div className="animate-marquee flex w-max gap-14 whitespace-nowrap">
        {items.map((it, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-6 font-display text-[22px] font-light italic tracking-[-0.01em] text-ink"
          >
            {it}
            <span className="translate-y-[-2px] text-[10px] text-magenta">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
