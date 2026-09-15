import Image from 'next/image';

export function CircleShotLogo({
  size = 56,
  wordmark = true,
  priority = false,
  /** Lets callers hide the wordmark at narrow widths without losing the mark. */
  wordmarkClassName = 'flex',
}: {
  size?: number;
  wordmark?: boolean;
  priority?: boolean;
  wordmarkClassName?: string;
}) {
  return (
    <span className="inline-flex shrink-0 items-center gap-3.5">
      <Image
        src="/assets/logo-v3.png"
        alt=""
        width={size}
        height={size}
        priority={priority}
        sizes={`${size}px`}
        className="block shrink-0 rounded-full object-cover drop-shadow-[0_0_12px_rgba(114,182,255,0.3)] transition-all duration-400 ease-brand"
        style={{ width: size, height: size }}
      />
      {wordmark && (
        <span className={`${wordmarkClassName} flex-col leading-none`}>
          <span className="font-display text-[20px] font-medium tracking-[-0.01em] text-ink">
            CircleShot
          </span>
          <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.22em] text-ink-soft">
            Creations · SWFL
          </span>
        </span>
      )}
    </span>
  );
}
