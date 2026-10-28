// Dynamics 365 — the five Dynamics 365 services:
// pill tag | heading whose words fill grey → ink as it scrolls through the
// viewport, muted lead and an ink pill button; then a label row and a
// framed board — a tall photo card beside a 2-column grid of step cards, each
// with 8px progress dots (card N lights dot N of five).
//
// The step cards have no hover of their own (the dots are static); the card
// grid uses the site's stack-to-spread <SpreadGrid> and the header fades up
// (y 30, 1s). The sixth grid slot carries the second photo so the board stays
// a clean 2 × 3.

import { BRAND, asset } from "@/brand/brand";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SpreadGrid } from "@/components/ui/SpreadGrid";
import s from "./Dynamics.module.css";
import { FillHeading } from "./dynamics/FillHeading";
import { StepCard } from "./dynamics/StepCard";

const HEADING = "Connect finance, operations, and field teams on Dynamics 365.";
const LEAD = `When HR, ERP, and CRM data sit in separate systems, every report is rebuilt by hand. ${BRAND.name}’s Dynamics 365 specialists configure, integrate, and migrate it around the way your business already works, in clear phases you can plan and budget for.`;
/** Official Microsoft Dynamics 365 lockup (PDF: on the photo badge and the first card). */
const D365_LOGO = { src: asset("/images/microsoft/dynamics-365.svg"), alt: "Microsoft Dynamics 365" };

const SUBHEADING = "Our comprehensive Microsoft Dynamics 365 consulting solutions";

const SERVICES = [
  {
    title: "Dynamics 365 consulting services",
    text: "We assess your business processes and recommend the right Dynamics 365 modules to connect sales, operations, HR, and finance.",
  },
  {
    title: "Dynamics 365 implementation services",
    text: "Configuration, deployment, and training in phases, so Dynamics 365 goes live without stopping the work it supports.",
  },
  {
    title: "Dynamics 365 integration services",
    text: "We integrate Power Platform, Azure, and third-party applications so every department works from the same data.",
  },
  {
    title: "Dynamics 365 migration services",
    text: "On-premises or a legacy ERP upgrade, moved with careful data preparation, cleaning, mapping, and validation.",
  },
  {
    title: "Dynamics 365 optimisation",
    text: "After go-live we tune performance, security, and licensing, so your Dynamics 365 investment keeps paying back.",
  },
] as const;

/** Pill-tag icon: four linked nodes (a consulting "network"), 1.25px line. */
function NetworkIcon() {
  return (
    <svg className={s.tagIcon} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="5" cy="5" r="2" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="15" cy="5" r="2" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="5" cy="15" r="2" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="15" cy="15" r="2" stroke="currentColor" strokeWidth="1.25" />
      <path d="M7 5h6M7 15h6M5 7v6M15 7v6" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

export function Dynamics() {
  const count = String(SERVICES.length).padStart(2, "0");
  return (
    <section id="dynamics" data-theme="light" className={s.section}>
      <div className={s.container}>
        <div className={s.content}>
          <Reveal y={30} duration={1} amount={0.3} className={s.tagCol}>
            <p className={s.tag}>
              <NetworkIcon />
              <span>Our specialised consulting</span>
            </p>
          </Reveal>
          <div className={s.copy}>
            <div className={s.text}>
              <FillHeading text={HEADING} className={s.heading} wordClassName={s.word} />
              <Reveal y={30} duration={1} delay={0.1} amount={0.3}>
                <p className={s.lead}>{LEAD}</p>
              </Reveal>
            </div>
            <Reveal y={30} duration={1} delay={0.15} amount={0.3}>
              <Button label="Explore Dynamics 365 services" href={asset("/services/microsoft/microsoft-dynamics-365/")} variant="outline" className={s.button} />
            </Reveal>
          </div>
        </div>

        <div className={s.board}>
          <Reveal y={30} duration={1} amount={0.3} className={s.boardHead}>
            <h3 className={s.subheading}>{SUBHEADING}</h3>
            <p className={s.counter}>( {count} services )</p>
          </Reveal>

          <div className={s.frame}>
            <Reveal y={30} duration={1} amount={0.1} className={s.feature}>
              <div className={s.photoCard}>
                <img
                  className={s.photo}
                  src={asset("/images/photos/d365-implementation.jpg")}
                  alt="A delivery team working together on laptops around a shared table"
                  loading="lazy"
                  decoding="async"
                />
                <span className={s.logoBadge}>
                  <img src={D365_LOGO.src} alt={D365_LOGO.alt} width={1017} height={355} />
                </span>
              </div>
            </Reveal>

            <SpreadGrid
              className={s.steps}
              itemClassName={s.cell}
              items={[
                ...SERVICES.map((svc, i) => (
                  <StepCard
                    key={svc.title}
                    index={i}
                    total={SERVICES.length}
                    title={svc.title}
                    text={svc.text}
                    logo={i === 0 ? D365_LOGO : undefined}
                  />
                )),
                <div key="photo" className={s.photoCard} aria-hidden="true">
                  <img
                    className={s.photo}
                    src={asset("/images/photos/d365-optimization.jpg")}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: "60% 72%" }}
                  />
                </div>,
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dynamics;
