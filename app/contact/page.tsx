'use client';

import { useEffect, useRef, useState } from 'react';
import './contact.css';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mpwvjvvv';
const REQUEST_TIMEOUT_MS = 15000;
const emptyForm = { name: '', email: '', company: '', service: '', fix: '' };
const serviceChoices = [
  'Business IT & Support',
  'Modernization & Advisory',
  'Property & Owner Services',
  'Something else / Not sure',
];
type RequiredField = 'name' | 'email' | 'fix';
type Status = 'idle' | 'submitting' | 'success' | 'rejected' | 'unconfirmed';

export default function Contact() {
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<RequiredField, string>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [timedOut, setTimedOut] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const sendingRef = useRef(false);
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => () => {
    controllerRef.current?.abort();
    controllerRef.current = null;
  }, []);

  useEffect(() => {
    if (status === 'success' || status === 'rejected' || status === 'unconfirmed') {
      resultRef.current?.focus();
    }
  }, [status]);

  function changeField(field: keyof typeof emptyForm, value: string) {
    setFormData(current => ({ ...current, [field]: value }));
    setErrors(current => ({ ...current, [field]: undefined }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sendingRef.current) return;

    const nextErrors: Partial<Record<RequiredField, string>> = {};
    if (!formData.name.trim()) nextErrors.name = 'Enter your name.';
    const emailInput = formRef.current?.elements.namedItem('email') as HTMLInputElement;
    if (!formData.email.trim() || !emailInput.validity.valid) nextErrors.email = 'Enter a valid email address.';
    if (!formData.fix.trim()) nextErrors.fix = 'Add a short description of what you need.';
    setErrors(nextErrors);
    const firstInvalid = (['name', 'email', 'fix'] as const).find(field => nextErrors[field]);
    if (firstInvalid) {
      (formRef.current?.elements.namedItem(firstInvalid) as HTMLElement)?.focus();
      return;
    }

    sendingRef.current = true;
    setStatus('submitting');
    setTimedOut(false);
    const controller = new AbortController();
    controllerRef.current = controller;
    const timer = window.setTimeout(() => {
      setTimedOut(true);
      controller.abort();
    }, REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        // Keep the legacy message key and field shape for existing consumers.
        // Removed qualification answers stay blank, rather than inventing defaults.
        body: JSON.stringify({ ...formData, sector: '', tolerance: '' }),
        signal: controller.signal,
      });
      if (!response.ok) {
        setStatus('rejected');
      } else {
        const result = await response.json();
        if (controller.signal.aborted) {
          setStatus('unconfirmed');
          return;
        }
        // A positive provider acknowledgement is not proof of inbox delivery.
        setStatus(result.ok === true ? 'success' : 'unconfirmed');
        if (result.ok === true) setFormData(emptyForm);
      }
    } catch {
      if (controllerRef.current === controller) setStatus('unconfirmed');
    } finally {
      window.clearTimeout(timer);
      if (controllerRef.current === controller) {
        controllerRef.current = null;
        sendingRef.current = false;
      }
    }
  }

  return (
    <section className="site-shell contact-page" aria-labelledby="contact-title">
      <header className="contact-intro">
        <p className="eyebrow">Start a conversation</p>
        <h1 id="contact-title">Tell us what you need</h1>
        <p>Tell us what you want to fix, build, or improve.</p>
      </header>

      <div className="contact-panel">
        {status === 'success' ? (
          <div ref={resultRef} tabIndex={-1} className="contact-result contact-success" role="status">
            <p className="eyebrow">Inquiry submitted</p>
            <h2>Thank you for getting in touch.</h2>
            <p>Formspree has accepted your inquiry. This confirms submission, not delivery to our inbox.</p>
            <button type="button" className="button-text" onClick={() => {
              setStatus('idle');
              requestAnimationFrame(() => firstInputRef.current?.focus());
            }}>Send another inquiry <span aria-hidden="true">→</span></button>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} noValidate aria-label="Contact inquiry">
            <p className="contact-helper">We typically respond within one business day.</p>
            <p className="contact-required-note">Name, email, and a short description are required. Everything else is optional.</p>
            <fieldset disabled={status === 'submitting'}>
              <legend className="sr-only">Your inquiry</legend>
              <div className="contact-fields">
                <div className="contact-field">
                  <label htmlFor="contact-name">Name <span>(required)</span></label>
                  <input ref={firstInputRef} id="contact-name" name="name" autoComplete="name" required value={formData.name} onChange={e => changeField('name', e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'contact-name-error' : undefined} />
                  {errors.name && <p id="contact-name-error" className="contact-field-error">{errors.name}</p>}
                </div>
                <div className="contact-field">
                  <label htmlFor="contact-email">Email <span>(required)</span></label>
                  <input id="contact-email" name="email" type="email" autoComplete="email" required value={formData.email} onChange={e => changeField('email', e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'contact-email-error' : undefined} />
                  {errors.email && <p id="contact-email-error" className="contact-field-error">{errors.email}</p>}
                </div>
                <div className="contact-field contact-full-width">
                  <label htmlFor="contact-message">What can we help with? <span>(required)</span></label>
                  <p id="contact-message-help" className="contact-helper">A short description is enough. Include any timing or constraints that matter.</p>
                  <textarea id="contact-message" name="fix" rows={5} required value={formData.fix} onChange={e => changeField('fix', e.target.value)} aria-invalid={!!errors.fix} aria-describedby={`contact-message-help${errors.fix ? ' contact-message-error' : ''}`} />
                  {errors.fix && <p id="contact-message-error" className="contact-field-error">{errors.fix}</p>}
                </div>
                <div className="contact-field">
                  <label htmlFor="contact-company">Company or organization <span>(optional)</span></label>
                  <input id="contact-company" name="company" autoComplete="organization" value={formData.company} onChange={e => changeField('company', e.target.value)} />
                </div>
                <div className="contact-field">
                  <label htmlFor="contact-service">What is this about? <span>(optional)</span></label>
                  <select id="contact-service" name="service" value={formData.service} onChange={e => changeField('service', e.target.value)}>
                    <option value="">Select if helpful</option>
                    {serviceChoices.map(choice => <option key={choice} value={choice}>{choice}</option>)}
                  </select>
                </div>
              </div>
            </fieldset>

            <p className="contact-privacy">Your inquiry is sent to Formspree to handle this form. This form does not save a draft in your browser. <a href="/privacy">Privacy &amp; Site Preferences</a>.</p>
            <button type="submit" className="button-primary contact-submit" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Sending…' : 'Send inquiry'} <span aria-hidden="true">↗</span>
            </button>
            <p className="contact-send-status" role="status" aria-live="polite" aria-atomic="true">{status === 'submitting' ? 'Sending your inquiry. Please wait.' : ''}</p>

            {(status === 'rejected' || status === 'unconfirmed') && (
              <div ref={resultRef} tabIndex={-1} className="contact-result contact-error" role="alert">
                <h2>{status === 'rejected' ? 'Your inquiry was not accepted.' : 'Submission not confirmed.'}</h2>
                <p>{status === 'rejected'
                  ? 'Formspree could not accept this inquiry. Your text is still here. Please try sending again, or email us directly.'
                  : `${timedOut ? 'The request timed out.' : 'We could not confirm Formspree’s response.'} Your text is still here. Your inquiry may have been accepted; retrying could send a duplicate. You can try again or email us directly.`}</p>
              </div>
            )}
          </form>
        )}
      </div>

      <div className="contact-email-alternative">
        <h2>Prefer email?</h2>
        <a href="mailto:hello@b-tec.org">hello@b-tec.org <span aria-hidden="true">↗</span></a>
      </div>
      <p className="contact-coverage">Based in Bourbonnais, Illinois. On-site work across Chicagoland, with a focus on the south suburbs and Kankakee County as our preferred area. Remote support depends on the issue; work such as hardware installation is performed on-site.</p>
    </section>
  );
}
