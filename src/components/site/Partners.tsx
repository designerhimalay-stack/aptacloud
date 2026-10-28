// Partners — a dark section with the pill tag | heading (scroll word fill)
// + lead header, a panel of link rows with round arrow buttons, and a row of dark logo cards — here the client's three
// partners (white), with the orange glow fading in on hover.

import { BRAND, asset } from "@/brand/brand";
import { LineReveal, Reveal } from "@/components/ui/Reveal";
import { PillTag } from "@/components/ui/PillTag";
import { cn } from "@/lib/utils";
import s from "./Partners.module.css";

// Client brief (Oct 2026): Microsoft, Anthropic, AWS. No NetSuite (not offered).
// Microsoft leads, AWS is supporting (Brand Guidelines v2.0, 1).
const PARTNERS = [
  {
    name: "Microsoft",
    node: <img className={cn(s.logo, s.microsoft)} src={asset("/images/partners/microsoft.svg")} alt="Microsoft" />,
  },
  {
    name: "Anthropic",
    // Text wordmark until the official Anthropic logo file is supplied.
    node: (
      <span className={s.anthropic} role="img" aria-label="Anthropic">
        Anthropic
      </span>
    ),
  },
  {
    name: "AWS",
    node: <img className={cn(s.logo, s.aws)} src={asset("/images/partners/aws.svg")} alt="AWS" />,
  },
];

// Where each partnership shows up in our services (the primary CTA lives in the hero and workshop).
const LINKS = [
  { label: "Dynamics 365 services", href: asset("/services/microsoft/microsoft-dynamics-365/") },
  { label: "Microsoft Azure services", href: asset("/azure-hosting/") },
  { label: "AI consulting services", href: asset("/ai-consulting/") },
  { label: "AWS cloud services", href: asset("/aws-compute/") },
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
              <span>Anthropic, and AWS.</span>
            </LineReveal>
            <Reveal y={30} duration={1} delay={0.1} amount={0.3}>
              <p className={s.lead}>
                Microsoft first: Azure, Dynamics 365, Power BI, and Microsoft Fabric are where {BRAND.name}’s senior
                specialists spend most of their time. We add Anthropic’s AI models and AWS where they fit the systems
                you already run.
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
