/**
 * Single source of truth for site copy, pricing and contact details.
 *
 * ⚠️  CONFIRM-WITH-CLIENT markers below flag values carried over from the
 *     Claude Design prototype that were written to look plausible. Verify each
 *     one before launch — they are all real numbers a customer will hold you to.
 */

export const contact = {
  name: 'CircleShot Creations',
  legalName: 'CircleShot Creations LLC',
  owner: 'Ariana Wilson',
  email: 'ari@circleshotcreations.com',
  phone: '239-217-2737',
  phoneDisplay: '239·217·2737',
  phoneHref: 'tel:+12392172737',
  smsHref: 'sms:+12392172737',
  city: 'Fort Myers',
  region: 'FL',
  regionName: 'Florida',
  serviceArea: [
    'Fort Myers',
    'Naples',
    'Bonita Springs',
    'Cape Coral',
    'Estero',
    'Marco Island',
    'Sarasota',
    'Tampa',
  ],
  social: {
    instagram: 'https://instagram.com/',   // TODO: real handle
    tiktok: 'https://tiktok.com/',         // TODO: real handle
    youtube: 'https://youtube.com/',       // TODO: real handle
    theKnot: 'https://www.theknot.com/',   // TODO: real listing
  },
} as const;

export const nav = [
  { label: 'The Booth', href: '#rig' },
  { label: 'Packages', href: '#packages' },
  { label: 'Events', href: '#events' },
  { label: 'Reel', href: '#reel' },
  { label: 'FAQ', href: '#faq' },
] as const;

export const marqueeItems = [
  'Weddings',
  'Proms',
  'Brand launches',
  'Quinces',
  'Birthdays',
  'Galas',
  'Grads',
  'Pop-ups',
  'Retreats',
] as const;

/** CONFIRM WITH CLIENT — hero stat strip. */
export const heroStats = [
  { n: '200+', l: 'Events spun' },
  { n: '4K·120', l: 'Slo-mo capture' },
  { n: '< 48h', l: 'Edited delivery' },
] as const;

export const shots = [
  { type: 'video', src: '/assets/hero-reel.mp4', ev: 'PROM · 360° SPIN', tone: 'var(--color-cyan)', accent: 'Live capture' },
  { type: 'image', src: '/assets/photo-2.jpg', ev: 'INFINITY PLATFORM · ENTRY', tone: 'var(--color-magenta)', accent: 'LED floor' },
  { type: 'image', src: '/assets/photo-1.jpg', ev: 'RING LIGHT · CLOSE-UP', tone: 'var(--color-violet)', accent: 'Ring glow' },
  { type: 'image', src: '/assets/photo-3.jpg', ev: 'GROUP SHOT · 3-UP', tone: 'var(--color-cyan)', accent: 'Boas + LED' },
] as const;

/** CONFIRM WITH CLIENT — every price and inclusion below. */
export const packages = [
  {
    name: 'The Spark',
    tag: '2 hr',
    price: '599',
    desc: 'Small gatherings, intimate moments. Full rig with one operator, unlimited spins.',
    feats: ['2-hour booking', '1 operator', 'Unlimited spins', '20+ digital props', 'Same-day delivery', 'Custom overlay'],
  },
  {
    name: 'The Flash',
    tag: '4 hr',
    price: '999',
    popular: true,
    desc: 'The wedding & quince favorite. Extended run, premium backdrop, slow-mo + boomerang outputs.',
    feats: ['4-hour booking', '2 operators', 'Premium backdrops (6)', 'Slo-mo + boomerang', 'Live AirDrop station', 'Edited highlight reel', '< 48h delivery', 'Custom LED backdrop'],
  },
  {
    name: 'The Encore',
    tag: '8 hr',
    price: '1799',
    desc: 'Full-production days. Multiple activations, brand overlays, multi-cam, on-site photographer.',
    feats: ['8-hour booking', 'Full crew (3)', 'Multi-rig (360 + static)', 'On-site photographer', 'Branded loops for socials', 'Dedicated edit suite', 'Livestream option'],
  },
] as const;

/** CONFIRM WITH CLIENT — travel radius and discount are contractual promises. */
export const packageNotes = [
  '+ Travel included within 60mi of Fort Myers',
  '+ Weekday discount (−15%)',
  '+ À la carte add-ons available',
] as const;

export const processSteps = [
  { n: '01', label: 'Lock the date', body: 'Tell us the venue, time, guest count, and vibe. We hold your slot with a simple deposit. Calendar, contracts, everything — done in 20 minutes.' },
  { n: '02', label: 'Dial in the look', body: 'We collaborate on backdrops, overlays, prop palette, and any brand elements. You get a mood board the week of.' },
  { n: '03', label: 'Showtime', body: 'We arrive two hours early. Rig, lights, sound — all load-tested. Our showrunner runs the line so guests are laughing, not waiting.' },
  { n: '04', label: 'Same-night delivery', body: 'Guests AirDrop their clip on the spot. Within 48 hours you get the full library: raw, edited, vertical, horizontal.' },
] as const;

/** CONFIRM WITH CLIENT — per-category booking counts and the 241 total. */
export const eventsTotal = { count: '241', label: 'Events · 2021 — Today' } as const;

export const events = [
  { name: 'Weddings', count: '82', copy: 'First dances, second lines, shoe-off dance floors. We time the spins to the drop.', color: 'var(--color-cyan)', img: '/assets/photo-2.jpg' },
  { name: 'Proms + Quinces', count: '47', copy: 'The rig becomes the event. We bring a host who keeps the line moving and the energy high.', color: 'var(--color-magenta)', img: '/assets/photo-3.jpg' },
  { name: 'Brand activations', count: '34', copy: 'Branded overlays, custom props, lead capture, QR delivery. Trade shows, launches, pop-ups.', color: 'var(--color-violet)', img: '/assets/photo-1.jpg' },
  { name: 'Birthdays', count: '38', copy: 'Sweet sixteens, fortieths, fiftieths. The most honest fun metric: how loud the laughs get.', color: 'var(--color-cyan)', img: '/assets/photo-3.jpg' },
  { name: 'Corporate', count: '21', copy: 'Holiday parties, retreats, galas. Tasteful, polished, and still the hit of the room.', color: 'var(--color-magenta)', img: '/assets/photo-1.jpg' },
  { name: 'Graduations', count: '19', copy: 'Caps off, tassels flying. We deliver a highlight reel by the time the caterers are packing up.', color: 'var(--color-violet)', img: '/assets/photo-2.jpg' },
] as const;

/**
 * Collage tiles. Each is either a still (`img`) or a looping clip (`video`) —
 * explicitly typed rather than `as const`, so a tile can carry one or the other
 * without the union hiding the property from every other member.
 */
export type GalleryTile = {
  /** CSS grid-column span, applied at >=1024px only. */
  c: string;
  /** CSS grid-row span, applied at >=1024px only. */
  r: string;
  label: string;
  img?: string;
  video?: string;
};

export const galleryTiles: GalleryTile[] = [
  { c: 'span 5', r: 'span 4', label: 'RING LIGHT · PROM', img: '/assets/photo-1.jpg' },
  { c: 'span 4', r: 'span 3', label: 'INFINITY PLATFORM', img: '/assets/photo-2.jpg' },
  { c: 'span 3', r: 'span 3', label: 'LIVE REEL · 360°', video: '/assets/hero-reel.mp4' },
  { c: 'span 3', r: 'span 3', label: 'GROUP · BOAS', img: '/assets/photo-3.jpg' },
  { c: 'span 4', r: 'span 4', label: 'LED FLOOR · ENTRY', img: '/assets/photo-2.jpg' },
  { c: 'span 5', r: 'span 3', label: 'CLOSE-UP · JOY', img: '/assets/photo-1.jpg' },
  { c: 'span 4', r: 'span 3', label: '3-UP · GLOW', img: '/assets/photo-3.jpg' },
  { c: 'span 4', r: 'span 3', label: 'SPIN · LOOP', video: '/assets/hero-reel.mp4' },
  { c: 'span 4', r: 'span 3', label: 'RING · PINK', img: '/assets/photo-1.jpg' },
];

/** CONFIRM WITH CLIENT — especially the $2M insurance figure and the deposit-rollover promise. */
export const faqs = [
  { q: 'What space do you need to set up?', a: 'A 10×10 ft clear area and one standard outlet. We bring everything else — lights, audio, backdrop, props.' },
  { q: 'How fast do guests get their clips?', a: 'Instantly. Guests AirDrop / QR their clip on the spot. You get the full edited library within 48 hours.' },
  { q: 'Do you travel?', a: 'Yes. Travel is included within 60 miles of Fort Myers. Beyond that, we add a flat per-mile rate — no surprises.' },
  { q: 'Can we brand the overlay?', a: "Absolutely. Send us your logo and a reference for the vibe; we'll design a loop-animated overlay that matches your event identity." },
  { q: 'Do you have insurance?', a: 'Fully insured up to $2M. We send certificates directly to your venue on request.' },
  { q: 'What happens if weather cancels?', a: 'For outdoor events we pre-plan a contingency. If we cancel, your deposit rolls to a new date within 12 months at no charge.' },
] as const;

export const eventTypes = [
  'Wedding',
  'Prom',
  'Quinceañera',
  'Birthday',
  'Corporate',
  'Brand activation',
  'Graduation',
  'Other',
] as const;
