'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Arrow } from '@/components/ui/Arrow';
import { Button, ButtonLink } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { contact, eventTypes } from '@/lib/site';

type Status = 'idle' | 'submitting' | 'success' | 'error';
type Errors = Partial<Record<'name' | 'email' | 'date', string>>;

const inputClass =
  'h-11 w-full rounded border border-white/[0.12] bg-transparent px-3.5 font-sans text-sm text-ink ' +
  'transition-colors duration-200 placeholder:text-ink-soft/60 focus:border-cyan focus:outline-none ' +
  'aria-[invalid=true]:border-magenta';

const labelClass =
  'mb-2 block font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft';

export function Book() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  /**
   * Move focus to the first invalid field after a failed submit. This has to run
   * in an effect — `aria-invalid` isn't in the DOM until React has re-rendered,
   * so focusing inside the submit handler silently does nothing.
   */
  useEffect(() => {
    if (Object.keys(errors).length === 0) return;
    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [errors]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    // Client-side validation mirrors the server's — the server is the real gate.
    const next: Errors = {};
    if (!data.name?.trim()) next.name = 'Please tell us your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email ?? '')) next.email = 'That email doesn’t look right.';
    if (!data.date) next.date = 'Which date are you asking about?';

    setErrors(next);
    if (Object.keys(next).length > 0) return; // focus is handled by the effect above

    setStatus('submitting');
    setServerError(null);

    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? 'Something went wrong on our end.');
      }

      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setServerError(err instanceof Error ? err.message : 'Something went wrong on our end.');
    }
  }

  return (
    <section id="book" className="relative overflow-hidden bg-bg py-24 md:py-32 lg:py-[140px]">
      {/* Concentric background rings */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[-40%] h-[140vmin] w-[140vmin] -translate-x-1/2 rounded-full border border-white/[0.06]"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[-25%] h-[110vmin] w-[110vmin] -translate-x-1/2 rounded-full border border-white/[0.04]"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[-10%] h-[80vmin] w-[80vmin] -translate-x-1/2 rounded-full blur-[40px]"
        style={{
          background: 'radial-gradient(circle, rgba(255,107,170,0.13) 0%, transparent 60%)',
        }}
      />

      <div className="relative mx-auto max-w-[1100px] px-6 sm:px-8 lg:px-12">
        <div className="text-center">
          <Reveal>
            <Eyebrow className="text-cyan">◯ Ready to spin? · Reply within 4 hours</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-7 font-display text-[clamp(48px,9vw,160px)] font-normal leading-[0.9] tracking-[-0.035em] text-ink">
              Let&apos;s <em className="text-gradient-tri font-light italic">make it spin.</em>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mt-8 max-w-[540px] font-sans text-base leading-[1.55] text-ink-soft sm:text-[18px]">
              Tell us the date. We&apos;ll tell you whether we&apos;re free, what it&apos;ll cost,
              and exactly what you&apos;ll get — usually within four hours.
            </p>
          </Reveal>
        </div>

        <Reveal delay={300}>
          <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1fr] lg:gap-16">
            {/* Direct contact — some people will never fill in a form. */}
            <div>
              <h3 className="m-0 font-display text-[28px] font-normal tracking-[-0.02em] text-ink">
                Rather just talk?
              </h3>
              <p className="mt-4 font-sans text-[15px] leading-[1.6] text-ink-soft">
                Ari answers her own phone. Text is usually fastest — send the date and the venue and
                you&apos;ll get a straight answer.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href={contact.smsHref}>Text {contact.phoneDisplay}</ButtonLink>
              </div>
              <dl className="mt-10 space-y-4 border-t border-white/10 pt-7">
                <div>
                  <dt className={labelClass}>Email</dt>
                  <dd className="m-0">
                    <a
                      href={`mailto:${contact.email}`}
                      className="font-sans text-sm text-ink no-underline hover:text-cyan"
                    >
                      {contact.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className={labelClass}>Based in</dt>
                  <dd className="m-0 font-sans text-sm text-ink">
                    {contact.city}, {contact.region}
                  </dd>
                </div>
                <div>
                  <dt className={labelClass}>Serving</dt>
                  <dd className="m-0 font-sans text-sm text-ink-soft">
                    {contact.serviceArea.join(' · ')}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Form */}
            <div>
              {status === 'success' ? (
                <div
                  role="status"
                  className="rounded-md border border-cyan/40 bg-cyan/[0.06] p-8 text-center"
                >
                  <p className="font-display text-[28px] font-normal text-ink">
                    Got it — your date is with us.
                  </p>
                  <p className="mt-3 font-sans text-[15px] leading-[1.6] text-ink-soft">
                    Ari will come back to you within about four hours with availability and a
                    straight price. If it&apos;s urgent, text {contact.phoneDisplay}.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="mt-6 cursor-pointer border-none bg-transparent font-mono text-[11px] uppercase tracking-[0.16em] text-cyan underline"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form
                  ref={formRef}
                  onSubmit={onSubmit}
                  noValidate
                  className="grid grid-cols-1 gap-5 sm:grid-cols-2"
                >
                  {/* Honeypot — real people never fill this in. */}
                  <div aria-hidden="true" className="hidden">
                    <label htmlFor="company">Company</label>
                    <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
                  </div>

                  <Field
                    id="name"
                    label="Full name"
                    required
                    error={errors.name}
                    autoComplete="name"
                  />
                  <Field
                    id="email"
                    label="Email"
                    type="email"
                    required
                    error={errors.email}
                    autoComplete="email"
                  />
                  <Field id="phone" label="Phone" type="tel" autoComplete="tel" />
                  <Field id="date" label="Event date" type="date" required error={errors.date} />

                  <div>
                    <label htmlFor="eventType" className={labelClass}>
                      Event type
                    </label>
                    <select id="eventType" name="eventType" defaultValue="Wedding" className={inputClass}>
                      {eventTypes.map((t) => (
                        <option key={t} value={t} className="bg-bg text-ink">
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Field id="venue" label="Venue / city" autoComplete="address-level2" />

                  <div className="sm:col-span-2">
                    <label htmlFor="message" className={labelClass}>
                      Anything else?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className={`${inputClass} h-auto resize-y py-3 leading-[1.6]`}
                      placeholder="Guest count, timings, vibe, whether the venue has power nearby…"
                    />
                  </div>

                  {status === 'error' && (
                    <p
                      role="alert"
                      className="sm:col-span-2 rounded border border-magenta/50 bg-magenta/[0.08] px-4 py-3 font-sans text-sm text-ink"
                    >
                      {serverError} You can also text {contact.phoneDisplay}.
                    </p>
                  )}

                  <div className="sm:col-span-2">
                    <Button
                      primary
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full"
                    >
                      {status === 'submitting' ? 'Sending…' : 'Check my date'}
                      {status !== 'submitting' && <Arrow />}
                    </Button>
                    <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
                      No spam. No mailing list. Just an answer.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  type = 'text',
  required,
  error,
  autoComplete,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  error?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
        {required && <span className="ml-1 text-magenta">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputClass}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 font-sans text-xs text-magenta">
          {error}
        </p>
      )}
    </div>
  );
}
