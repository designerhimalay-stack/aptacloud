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
import { BRAND } from "@/brand/brand";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { RollingText } from "@/components/ui/RollingText";
import { cn } from "@/lib/utils";
import s from "./CTA.module.css";

const HEADING = "Enterprise-grade solutions for connected, AI-driven growing businesses.";
const LEAD = "Book a free consultation today to talk about our services.";
const SUBMIT = "Book a free consultation";

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
  { id: "message", label: "How can we help you?", required: true, multiline: true },
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

function mailtoHref({ name, email, company, phone, message }: Record<Field, string>) {
  const who = company.trim() ? `${name.trim()} (${company.trim()})` : name.trim();
  const subject = `Free consultation request — ${who}`;
  const signature = [name, company, email, phone].map((v) => v.trim()).filter(Boolean).join("\n");
  const body = `${message.trim()}\n\n— ${signature}`;
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

function ContactForm() {
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
    window.location.href = mailtoHref(values);
    setSent(true);
  };

  return (
    <form className={s.form} onSubmit={onSubmit} noValidate aria-label="Book a free consultation">
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
        <RollingText text={SUBMIT} />
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

export function CTA() {
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
            <FillHeading text={HEADING} />
            <Reveal y={30} duration={1} delay={0.1} amount={0.3}>
              <p className={s.lead}>{LEAD}</p>
            </Reveal>
          </div>
        </div>

        <Reveal y={30} duration={1} delay={0.1} amount={0.2} className={s.body}>
          <aside className={s.direct} aria-label="Contact details">
            <p className={s.directTitle}>Contact us</p>
            <ul className={s.directList}>
              {BRAND.contact.phones.map((p) => (
                <li key={p.number}>
                  <a href={`tel:${p.number.replace(/[^+\d]/g, "")}`} className={s.directLink}>
                    {p.number}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${BRAND.contact.email}`} className={cn(s.directLink, s.email)}>
                  {BRAND.contact.email}
                </a>
              </li>
              {BRAND.contact.address.map((line) => (
                <li key={line} style={{ color: "var(--fg-muted)", fontSize: "14px", lineHeight: 1.4 }}>
                  {line}
                </li>
              ))}
            </ul>
            <Button label="Book AI workshop" href="#workshop" variant="outline" className={s.workshop} />
          </aside>

          <div className={s.card}>
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default CTA;
