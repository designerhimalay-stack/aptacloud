// Partners — a dark section with the pill tag | heading (scroll word fill)
// + lead header, a panel of link rows with round arrow buttons, and a row of dark logo cards — here the client's three official
// partner logos (white), with the orange glow fading in on hover.

import { BRAND } from "@/brand/brand";
import { LineReveal, Reveal } from "@/components/ui/Reveal";
import { PillTag } from "@/components/ui/PillTag";
import { cn } from "@/lib/utils";
import s from "./Partners.module.css";

// The PDF's "Our Partners": Microsoft, Oracle NetSuite, AWS — nothing else.
const PARTNERS = [
  {
    name: "Microsoft",
    node: <img className={cn(s.logo, s.microsoft)} src="/images/partners/microsoft.svg" alt="Microsoft" />,
  },
  {
    name: "Oracle NetSuite",
    node: (
      <span className={s.oracleNetsuite} role="img" aria-label="Oracle NetSuite">
        <img className={cn(s.logo, s.oracle)} src="/images/partners/oracle.svg" alt="" />
        <span className={s.netsuiteCrop}>
          <img className={cn(s.logo, s.netsuite)} src="/images/partners/netsuite.png" alt="" />
        </span>
      </span>
    ),
  },
  {
    name: "AWS",
    node: <img className={cn(s.logo, s.aws)} src="/images/partners/aws.svg" alt="AWS" />,
  },
];

const LINKS = [
  { label: "Book a free consultation", href: "#contact" },
  { label: "Explore our services", href: "#dynamics" },
  { label: `Learn more about ${BRAND.name}`, href: "#about" },
];

function PartnersIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="7.5" cy="10" r="4.25" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="12.5" cy="10" r="4.25" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Partners() {
  return (
    <section id="partners" className={s.section}>
      <div className={s.container}>
        <div className={s.content}>
          <Reveal y={30} duration={1} amount={0.3} className={s.tagCol}>
            <PillTag icon={<PartnersIcon />}>Our Partners</PillTag>
          </Reveal>
          <div className={s.copy}>
            <LineReveal as="h2" className={s.heading}>
              <span>We partner with Microsoft,</span>
              <span>Oracle NetSuite and AWS.</span>
            </LineReveal>
            <Reveal y={30} duration={1} delay={0.1} amount={0.3}>
              <p className={s.lead}>
                As a certified Microsoft Dynamics 365 consulting partner, {BRAND.name} brings Microsoft-centric
                solutions and enterprise cloud services to your business — tailored Cloud, Data, IT and AI offerings.
              </p>
            </Reveal>
          </div>
        </div>

        <div className={s.body}>
          <Reveal y={30} duration={1} amount={0.2} className={s.panel}>
            <ul className={s.rows}>
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={s.row}>
                    <span>{l.label}</span>
                    <span className={s.arrow}>
                      <Arrow />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal y={30} duration={1} delay={0.1} amount={0.2} className={s.logosWrap}>
            <ul className={s.logos}>
              {PARTNERS.map((p) => (
                <li key={p.name} className={s.card} title={p.name}>
                  <span className={s.glow} aria-hidden="true" />
                  <span className={s.mark}>{p.node}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
