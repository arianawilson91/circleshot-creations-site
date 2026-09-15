import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  eventType?: string;
  venue?: string;
  message?: string;
  company?: string; // honeypot
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Trim, cap length, and drop control characters before anything reaches an
 * email body — stops header-injection style tricks in the subject line.
 */
function clean(v: unknown, max = 2000): string {
  if (typeof v !== 'string') return '';
  let out = '';
  for (const ch of v) {
    const code = ch.codePointAt(0) ?? 0;
    out += code < 32 || code === 127 ? ' ' : ch;
  }
  return out.trim().slice(0, max);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: 'Malformed request.' }, { status: 400 });
  }

  // Honeypot: a filled "company" field means a bot. Return 200 so it doesn't retry.
  if (clean(body.company)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 40);
  const date = clean(body.date, 40);
  const eventType = clean(body.eventType, 60);
  const venue = clean(body.venue, 200);
  const message = clean(body.message, 4000);

  if (!name) {
    return NextResponse.json({ error: 'Please include your name.' }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Please include a valid email.' }, { status: 400 });
  }
  if (!date) {
    return NextResponse.json({ error: 'Please include an event date.' }, { status: 400 });
  }

  const rows: Array<[string, string]> = [
    ['Name', name],
    ['Email', email],
    ['Phone', phone || '—'],
    ['Event date', date],
    ['Event type', eventType || '—'],
    ['Venue / city', venue || '—'],
    ['Message', message || '—'],
  ];

  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n');
  const html = `
    <h2 style="font-family:Georgia,serif">New booking enquiry</h2>
    <table cellpadding="6" style="font-family:system-ui,sans-serif;font-size:14px;border-collapse:collapse">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="color:#667;white-space:nowrap"><strong>${escapeHtml(
              k,
            )}</strong></td><td>${escapeHtml(v).replace(/\n/g, '<br>')}</td></tr>`,
        )
        .join('')}
    </table>
  `;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_TO_EMAIL;
  const from = process.env.BOOKING_FROM_EMAIL;

  // No mail configured (local dev): log it and succeed, so the form stays testable.
  if (!apiKey || !to || !from) {
    console.info(
      '[book] RESEND_API_KEY / BOOKING_TO_EMAIL / BOOKING_FROM_EMAIL not set — enquiry not emailed:\n' +
        text,
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New booking — ${name} · ${date}${eventType ? ` · ${eventType}` : ''}`,
        text,
        html,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      console.error('[book] Resend rejected the send:', res.status, detail);
      return NextResponse.json({ error: 'We couldn’t send that just now.' }, { status: 502 });
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error('[book] Send failed:', err);
    return NextResponse.json({ error: 'We couldn’t send that just now.' }, { status: 502 });
  }
}
