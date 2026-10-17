// Process step card: white 16px-radius card, 24px padding, a row of
// 8px progress dots at the top (dot N lit in the accent for service N), title
// and muted text pinned to the bottom.

import s from "./StepCard.module.css";

export function StepCard({
  index,
  total,
  title,
  text,
  logo,
}: {
  index: number;
  total: number;
  title: string;
  text: string;
  logo?: { src: string; alt: string };
}) {
  return (
    <article className={s.card}>
      <div className={s.top}>
        <div className={s.dots} role="img" aria-label={`Service ${index + 1} of ${total}`}>
          {Array.from({ length: total }, (_, i) => (
            <span key={i} className={i === index ? s.dotOn : s.dot} />
          ))}
        </div>
        {logo && <img className={s.logo} src={logo.src} alt={logo.alt} width={1017} height={355} />}
      </div>
      <div className={s.body}>
        <h4 className={s.title}>{title}</h4>
        <p className={s.text}>{text}</p>
      </div>
    </article>
  );
}
