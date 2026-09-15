import { CircleShotLogo } from '@/components/ui/Logo';
import { contact, nav } from '@/lib/site';

export function Footer() {
  const columns = [
    {
      h: 'Explore',
      links: nav.map((n) => ({ label: n.label, href: n.href })),
    },
    {
      h: 'Contact',
      links: [
        { label: contact.email, href: `mailto:${contact.email}` },
        { label: contact.phoneDisplay, href: contact.phoneHref },
        { label: `${contact.city}, ${contact.region}`, href: '#book' },
      ],
    },
    {
      h: 'Follow',
      links: [
        { label: 'Instagram', href: contact.social.instagram },
        { label: 'TikTok', href: contact.social.tiktok },
        { label: 'YouTube', href: contact.social.youtube },
        { label: 'The Knot', href: contact.social.theKnot },
      ],
    },
  ];

  return (
    <footer className="border-t border-white/[0.08] bg-bg pb-8 pt-16">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
        <div className="mb-16 grid grid-cols-2 gap-10 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="col-span-2 lg:col-span-1">
            <CircleShotLogo size={48} />
            <p className="mt-5 max-w-[320px] font-sans text-sm leading-[1.6] text-ink-soft">
              360° photo booth rental across Southwest Florida. Weddings, events, brand activations.
              Owned &amp; operated by {contact.owner}.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.h}>
              <h2 className="mb-5 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-soft">
                {col.h}
              </h2>
              <ul className="m-0 flex list-none flex-col gap-3 p-0">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="font-sans text-sm text-ink no-underline transition-colors hover:text-cyan"
                      {...(l.href.startsWith('http')
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-white/[0.08] pt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {contact.legalName}</span>
          <span>Made in SWFL · Serving FL &amp; beyond</span>
        </div>
      </div>
    </footer>
  );
}
