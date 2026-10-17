// Tool Column — one column of the tools list: a 16px-radius head pill carrying the tool (official
// product logo + name), then a 24px-radius body card whose rows are the tool's three
// capabilities as 16px-radius pills (centred Inter 14.08 / 500). The body
// card closes with the tool's caption and one-line description, pushed to
// the bottom so the four columns line up. Rows lift one surface step on
// hover (0.4s ease-out).

import { asset } from "@/brand/brand";
import { cn } from "@/lib/utils";
import s from "./ToolColumn.module.css";

export type ToolIcon = "sharepoint" | "m365" | "copilot" | "power";

export interface ToolColumnProps {
  name: string;
  caption: string;
  body: string;
  tags: [string, string, string];
  icon: ToolIcon;
  className?: string;
}

// Official product logos (public/images/microsoft/, from Wikimedia Commons).
const LOGOS: Record<ToolIcon, string> = {
  sharepoint: "/images/microsoft/sharepoint.svg",
  m365: "/images/microsoft/microsoft-365.svg",
  copilot: "/images/microsoft/copilot.svg",
  power: "/images/microsoft/power-platform.svg",
};

export function ToolColumn({ name, caption, body, tags, icon, className }: ToolColumnProps) {
  return (
    <article className={cn(s.column, className)}>
      <header className={s.head}>
        <img className={s.logo} src={asset(LOGOS[icon])} alt="" width={28} height={28} loading="lazy" decoding="async" />
        <h3 className={s.name}>{name}</h3>
      </header>
      <div className={s.body}>
        <ul className={s.rows} aria-label={`${name} capabilities`}>
          {tags.map((tag) => (
            <li key={tag} className={s.row}>
              {tag}
            </li>
          ))}
        </ul>
        <div className={s.about}>
          <p className={s.caption}>{caption}</p>
          <p className={s.text}>{body}</p>
        </div>
      </div>
    </article>
  );
}
