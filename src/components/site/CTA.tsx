// Contact — Agentcraft's closing banner copy in a
// dark section, pill tag | heading whose words fill from grey to white as it
// scrolls through + muted lead; then the form card (fields below,
// full-width white submit pill) in the right two columns and the direct
// contacts + "Book AI workshop" in the first column. Fields: name, email address,
// company name, phone number and "How can we help you?" (company/phone optional).
//
// There is no backend: submitting validates the required fields and opens the
// visitor's mail app with a `mailto:` to BRAND.contact.email, the subject and
// body pre-filled from the form.

import { motion, useScroll, useTransform, type MotionValue } from "@/lib/motion";
import { useRef, useState, type FormEvent } from "react";
import { BRAND, PRIMARY_CTA } from "@/brand/brand";
import { NEXT_STEPS } from "@/data/services/shared";
import { Reveal } from "@/components/ui/Reveal";
import { RollingText } from "@/components/ui/RollingText";
import { cn } from "@/lib/utils";
import s from "./CTA.module.css";

// Home defaults; service pages pass their own heading, lead and submit label.
const HEADING = "Tell us what your team has started. We will help take it to production.";
const LEAD = "Share the workflow, system, or AI idea you are working on, and we will come back with a clear first step.";
const SUBMIT = PRIMARY_CTA.label;

type Field = "name" | "email" | "company" | "phone" | "message";
type Errors = Partial<Record<Field, string>>;

type FieldSpec = {
  id: Field;
  label: string;
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  inputMode?: "email" | "tel";
  required?: boolean;
  multiline?: boolean;
};

const FIELDS: FieldSpec[] = [
  { id: "name", label: "Name", autoComplete: "name", required: true },
  { id: "email", label: "Email address", type: "email", autoComplete: "email", inputMode: "email", required: true },
  { id: "company", label: "Company name", autoComplete: "organization" },
  { id: "phone", label: "Phone number", type: "tel", autoComplete: "tel", inputMode: "tel" },
  { id: "message", label: "Tell us what you are working on", required: true, multiline: true },
];

const EMPTY: Record<Field, string> = { name: "", email: "", company: "", phone: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[\d\s().-]{7,20}$/;

function validate(values: Record<Field, string>): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  if (values.phone.trim() && !PHONE_RE.test(values.phone.trim())) errors.phone = "Please enter a valid phone number.";
  if (!values.message.trim()) errors.message = "Please tell us how we can help.";
  return errors;
}

function mailtoHref({ name, email, company, phone, message }: Record<Field, string>, topic: string) {
  const who = company.trim() ? `${name.trim()} (${company.trim()})` : name.trim();
  const subject = `${topic}: ${who}`;
  const signature = [name, company, email, phone].map((v) => v.trim()).filter(Boolean).join("\n");
  const body = `${message.trim()}\n\n${signature}`;
  return `mailto:${BRAND.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function Word({ word, i, n, progress }: { word: string; i: number; n: number; progress: MotionValue<number> }) {
  const color = useTransform(progress, [i / n, (i + 1) / n], ["var(--fill-from)", "var(--fill-to)"]);
  return (
    <motion.span className={s.word} style={{ color }}>
      {word}
    </motion.span>
  );
}

/** Words fill from grey to white as the heading scrolls through the viewport. */
function FillHeading({ text }: { text: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <h2 ref={ref} className={s.heading} aria-label={text}>
      {words.map((w, i) => (
        <Word key={i} word={w} i={i} n={words.length} progress={scrollYProgress} />
      ))}
    </h2>
  );
}

function PhoneIcon() {
  return (
    <svg className={s.tagIcon} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M6.6 3.25H4.75a1.5 1.5 0 0 0-1.5 1.6c.4 6.2 5.7 11.5 11.9 11.9a1.5 1.5 0 0 0 1.6-1.5V13.4a1 1 0 0 0-.75-.97l-2.7-.68a1 1 0 0 0-.98.28l-1.07 1.1a9.6 9.6 0 0 1-4.53-4.53l1.1-1.07a1 1 0 0 0 .28-.98l-.68-2.7a1 1 0 0 0-.97-.75Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="3" y="4.75" width="14" height="10.5" rx="2" stroke="currentColor" strokeWidth="1.25" />
      <path d="m3.75 6 6.25 4.75L16.25 6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 17.25s5.25-4.6 5.25-9a5.25 5.25 0 0 0-10.5 0c0 4.4 5.25 9 5.25 9Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
      <circle cx="10" cy="8.25" r="1.9" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

function RowArrow() {
  return (
    <svg className={s.rowArrow} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ContactForm({ submit, submitShort, topic }: { submit: string; submitShort?: string; topic: string }) {
  const [values, setValues] = useState<Record<Field, string>>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const refs = useRef<Partial<Record<Field, HTMLInputElement | HTMLTextAreaElement | null>>>({});

  const update = (field: Field) => (e: { target: { value: string } }) => {
    const next = { ...values, [field]: e.target.value };
    setValues(next);
    setSent(false);
    // Once a field has shown an error, re-check it as the visitor types.
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: validate(next)[field] }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const first = FIELDS.find((f) => found[f.id]);
    if (first) {
      setSent(false);
      refs.current[first.id]?.focus();
      return;
    }
    window.location.href = mailtoHref(values, topic);
    setSent(true);
  };

  return (
    <form className={s.form} onSubmit={onSubmit} noValidate aria-label={submit}>
      <div className={s.fields}>
        {FIELDS.map((f) => {
          const id = `contact-${f.id}`;
          const error = errors[f.id];
          const common = {
            id,
            name: f.id,
            placeholder: f.label,
            required: f.required,
            "aria-required": f.required ? true : undefined,
            "aria-invalid": error ? true : undefined,
            "aria-describedby": error ? `${id}-error` : undefined,
            value: values[f.id],
            onChange: update(f.id),
          } as const;
          return (
            <div key={f.id} className={cn(s.field, f.multiline && s.fieldWide)}>
              <label htmlFor={id} className={s.srOnly}>
                {f.label}
              </label>
              {f.multiline ? (
                <textarea
                  ref={(el) => {
                    refs.current[f.id] = el;
                  }}
                  {...common}
                  className={cn(s.input, s.textarea, error && s.invalid)}
                />
              ) : (
                <input
                  ref={(el) => {
                    refs.current[f.id] = el;
                  }}
                  {...common}
                  type={f.type ?? "text"}
                  autoComplete={f.autoComplete}
                  inputMode={f.inputMode}
                  className={cn(s.input, error && s.invalid)}
                />
              )}
              {error && (
                <p id={`${id}-error`} className={s.error}>
                  {error}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <button type="submit" className={cn("roll-host", s.submit)}>
        {submitShort ? (
          <>
            <RollingText text={submit} className="max-[519.98px]:!hidden" />
            <RollingText text={submitShort} className="min-[520px]:!hidden" />
          </>
        ) : (
          <RollingText text={submit} />
        )}
      </button>

      <p className={s.status} role="status" aria-live="polite">
        {sent && (
          <>
            Your email app should open with the message ready to send. If it doesn’t, write to us at{" "}
            <a href={`mailto:${BRAND.contact.email}`}>{BRAND.contact.email}</a>.
          </>
        )}
      </p>
    </form>
  );
}

export function CTA({
  heading = HEADING,
  lead = LEAD,
  submit = SUBMIT,
  submitShort,
  topic = "AI assessment request",
  steps = NEXT_STEPS,
}: {
  heading?: string;
  lead?: string;
  submit?: string;
  /** Shorter submit label for narrow phones. */
  submitShort?: string;
  /** Email subject prefix, e.g. the service name. */
  topic?: string;
  /** Optional "What happens next" list above the direct contacts (service pages). */
  steps?: { title: string; text: string }[];
}) {
  return (
    <section id="contact" className={s.section}>
      <div className={s.container}>
        <div className={s.content}>
          <Reveal y={30} duration={1} amount={0.3} className={s.tagCol}>
            <p className={s.tag}>
              <PhoneIcon />
              <span>Contact</span>
            </p>
          </Reveal>
          <div className={s.copy}>
            <FillHeading text={heading} />
            <Reveal y={30} duration={1} delay={0.1} amount={0.3}>
              <p className={s.lead}>{lead}</p>
            </Reveal>
          </div>
        </div>

        <Reveal y={30} duration={1} delay={0.1} amount={0.2} className={s.body}>
          <aside className={s.direct} aria-label="Contact details">
            <div className={s.infoCard}>
              <p className={s.infoTitle}>What happens next</p>
              <ol className={s.nextList}>
                {steps.map((st, i) => (
                  <li key={st.title} className={s.nextItem}>
                    <span className={s.nextNum}>{i + 1}</span>
                    <div>
                      <p className={s.nextTitle}>{st.title}</p>
                      <p className={s.nextText}>{st.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className={s.infoCard}>
              <p className={s.infoTitle}>Talk to us directly</p>
              <ul className={s.rows}>
                {BRAND.contact.phones.map((p) => (
                  <li key={p.number}>
                    <a href={`tel:${p.number.replace(/[^+\d]/g, "")}`} className={s.row}>
                      <span className={s.rowIcon}>
                        <PhoneIcon />
                      </span>
                      <span className={s.rowValue}>{p.number}</span>
                      <RowArrow />
                    </a>
                  </li>
                ))}
                <li>
                  <a href={`mailto:${BRAND.contact.email}`} className={s.row}>
                    <span className={s.rowIcon}>
                      <MailIcon />
                    </span>
                    <span className={cn(s.rowValue, s.email)}>{BRAND.contact.email}</span>
                    <RowArrow />
                  </a>
                </li>
                <li>
                  <span className={cn(s.row, s.rowStatic)}>
                    <span className={s.rowIcon}>
                      <PinIcon />
                    </span>
                    <span className={s.rowValue}>
                      {BRAND.contact.address.map((line) => (
                        <span key={line} className={s.addressLine}>
                          {line}
                        </span>
                      ))}
                    </span>
                  </span>
                </li>
              </ul>
            </div>
          </aside>

          <div className={s.card}>
            <ContactForm submit={submit} submitShort={submitShort} topic={topic} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default CTA;
