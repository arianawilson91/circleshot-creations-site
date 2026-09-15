import type { ComponentPropsWithoutRef, ReactNode } from 'react';

const base =
  'group inline-flex items-center justify-center gap-3 rounded-full border px-6 py-4 font-display text-base font-medium tracking-[0.01em] ' +
  'transition-[transform,background,color,border-color,box-shadow] duration-300 ease-brand ' +
  'hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60';

const primary =
  'border-transparent bg-[#F6F1E7] text-bg shadow-[0_12px_40px_-20px_rgba(0,0,0,0.6)] ' +
  'hover:bg-[linear-gradient(95deg,var(--color-cyan),var(--color-magenta))] ' +
  'hover:shadow-[0_20px_60px_-20px_var(--color-magenta)]';

const ghost = 'border-white/30 bg-transparent text-ink hover:border-white/60';

type Variant = { primary?: boolean };

export function Button({
  children,
  primary: isPrimary,
  className = '',
  ...rest
}: Variant & ComponentPropsWithoutRef<'button'>) {
  return (
    <button className={`${base} ${isPrimary ? primary : ghost} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  children,
  primary: isPrimary,
  className = '',
  ...rest
}: Variant & ComponentPropsWithoutRef<'a'> & { children: ReactNode }) {
  return (
    <a className={`${base} no-underline ${isPrimary ? primary : ghost} ${className}`} {...rest}>
      {children}
    </a>
  );
}
