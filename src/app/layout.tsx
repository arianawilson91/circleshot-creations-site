import type { Metadata, Viewport } from 'next';
import { Fraunces, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import { contact } from '@/lib/site';
import './globals.css';

// Loaded as a variable font so the `opsz` axis is available — the handoff calls
// for optical sizing on the large display headings. `axes` is only valid when the
// weight is variable, so weights are not enumerated here.
const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  variable: '--font-fraunces',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

// TODO: set NEXT_PUBLIC_SITE_URL in the host env once the domain is live.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://circleshotcreations.com';

const description =
  '360° photo booth rental across Southwest Florida — weddings, proms, quinces, and brand activations. Slow-motion clips delivered within 48 hours. Fort Myers, Naples, Cape Coral and beyond.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'CircleShot Creations — 360° Photo Booth · Southwest Florida',
    template: '%s · CircleShot Creations',
  },
  description,
  keywords: [
    '360 photo booth',
    'photo booth rental',
    'wedding photo booth',
    'Fort Myers photo booth',
    'Naples photo booth',
    'Southwest Florida events',
    'quinceañera photo booth',
    'prom photo booth',
  ],
  authors: [{ name: contact.owner }],
  creator: contact.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: contact.name,
    title: 'CircleShot Creations — 360° Photo Booth · Southwest Florida',
    description,
    locale: 'en_US',
    images: [
      {
        url: '/assets/photo-1.jpg',
        width: 1200,
        height: 630,
        alt: 'Guests in the CircleShot 360° photo booth',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CircleShot Creations — 360° Photo Booth · Southwest Florida',
    description,
    images: ['/assets/photo-1.jpg'],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0A1429',
  colorScheme: 'dark',
};

/** LocalBusiness schema — helps the "photo booth near me" searches actually find her. */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${siteUrl}/#business`,
  name: contact.name,
  legalName: contact.legalName,
  description,
  url: siteUrl,
  email: contact.email,
  telephone: contact.phone,
  image: `${siteUrl}/assets/logo-v3.png`,
  priceRange: '$$',
  founder: { '@type': 'Person', name: contact.owner },
  address: {
    '@type': 'PostalAddress',
    addressLocality: contact.city,
    addressRegion: contact.region,
    addressCountry: 'US',
  },
  areaServed: contact.serviceArea.map((city) => ({
    '@type': 'City',
    name: `${city}, ${contact.region}`,
  })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <a
          href="#rig"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:font-display focus:text-bg"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
