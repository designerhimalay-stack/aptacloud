// Logo wall (the live "Tech stack" / "Tools and models" rows): every tool the
// live page shows, as a tile with its real mark and name. Tiles pop in one
// after another and lift on hover. Optional groups underneath explain how the
// tools are used (model families, frameworks, platforms). The "board" layout
// groups the tools by role, with Microsoft as the featured card.

import { PillTag } from "@/components/ui/PillTag";
import { Reveal } from "@/components/ui/Reveal";
import { FillHeading } from "@/components/site/dynamics/FillHeading";
import type { Block } from "@/data/services/types";
import { TECH, type TechId } from "@/data/tech";
import { cn } from "@/lib/utils";
import { Icon } from "../Icon";
import { RailHint } from "../RailHint";
import { SectionHead } from "../SectionHead";
import { TechMark } from "../TechMark";
import { toneProps, type Tone } from "../tone";
import { spanStyles } from "./grid";
import sec from "../Section.module.css";
import b from "./Blocks.module.css";
import s from "./Logos.module.css";

type LogosBlock = Extract<Block, { kind: "logos" }>;

/** Tiles per row: one row up to six, otherwise two balanced rows (7 → 4 + 3, 9 → 5 + 4), never a lone tile. */
const perRow = (n: number) => (n <= 6 ? n : Math.ceil(n / 2));

const POINT_ICONS = ["layers", "target", "shield", "flow"] as const;

/** With body copy: head and the copy as icon points on the left, the logos as a grid on the right. */
function SplitWall({ block, tone }: { block: LogosBlock; tone: Tone }) {
  return (
    <section id={block.id ?? "tools"} {...toneProps(tone)}>
      <div className={cn(sec.container, s.split)}>
        <div className={s.side}>
          <Reveal y={30} duration={1}>
            <PillTag icon={<Icon id={block.icon ?? "layers"} />}>{block.tag}</PillTag>
          </Reveal>
          <FillHeading text={block.heading} className={sec.heading} wordClassName={sec.word} />
          {block.lead && (
            <Reveal y={24} duration={1} delay={0.05}>
              <p className={sec.lead}>{block.lead}</p>
            </Reveal>
          )}
          <div className={s.points}>
            {block.body!.map((p, i) => (
              <Reveal key={p} y={20} duration={0.9} delay={0.1 + i * 0.08} className={s.point}>
                <span className={s.pointIcon}>
                  <Icon id={POINT_ICONS[i % POINT_ICONS.length]} />
                </span>
                <p className={s.pointText}>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
        <div className={s.grid}>
          {block.ids.map((id, i) => (
            <Reveal key={id} y={16} duration={0.8} delay={i * 0.05} className={s.gridCell}>
              <div className={s.tile} title={TECH[id].name}>
                <span className={s.logo}>
                  <TechMark id={id} className={s.mark} />
                </span>
                <span className={s.name}>{TECH[id].name}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** One tool: its mark on a white plate (colours hold on any tone) and its full name. */
function Tool({ id, big }: { id: TechId; big?: boolean }) {
  return (
    <li className={cn(s.tool, big && s.toolBig)}>
      <span className={s.plate}>
        <TechMark id={id} className={s.plateMark} />
      </span>
      <span className={s.toolName}>{TECH[id].name}</span>
    </li>
  );
}

/** board: the live "Our tools" row, grouped by role. Microsoft leads as a full-width
 *  row (intro left, its tools right); the other groups sit beneath as equal cards:
 *  up to three in one row, four as a 2 × 2 with two-column lists, so every card in
 *  a row holds the same number of tool rows. Phones: the groups become a swipe rail. */
function Board({ block, tone }: { block: LogosBlock; tone: Tone }) {
  const [lead, ...rest] = block.categories ?? [{ label: "Tools", ids: block.ids }];
  const cols = rest.length <= 3 ? rest.length : 2;
  const spans = spanStyles(rest.length, cols);
  const railId = `${block.id ?? "tools"}-rail`;
  return (
    <section id={block.id ?? "tools"} {...toneProps(tone)}>
      <div className={sec.container}>
        <SectionHead variant={block.head ?? "split"} tag={block.tag} icon={<Icon id={block.icon ?? "layers"} />} heading={block.heading} lead={block.lead} />
        <div className={s.board}>
          <Reveal y={28} duration={1}>
            <article className={s.groupLead}>
              <div className={s.leadCopy}>
                <span className={s.firstPill}>Microsoft first</span>
                <h3 className={s.groupTitle}>{lead.label}</h3>
                {lead.text && <p className={s.groupText}>{lead.text}</p>}
              </div>
              <ul className={s.leadList} style={{ ["--n" as string]: lead.ids.length }}>
                {lead.ids.map((id) => (
                  <Tool key={id} id={id} big />
                ))}
              </ul>
            </article>
          </Reveal>
          <div id={railId} className={cn(b.grid, sec.rail)}>
            {rest.map((g, i) => (
              <Reveal key={g.label} y={24} duration={0.9} delay={0.08 + i * 0.07} style={spans[i]}>
                <article className={s.group}>
                  <h3 className={s.groupTitle}>{g.label}</h3>
                  {g.text && <p className={s.groupText}>{g.text}</p>}
                  <ul className={cn(s.list, cols === 2 && s.listTwo)}>
                    {g.ids.map((id) => (
                      <Tool key={id} id={id} />
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
          <RailHint forId={railId} count={rest.length} />
        </div>
      </div>
    </section>
  );
}

export function Logos({ block, tone }: { block: LogosBlock; tone: Tone }) {
  const groups = block.groups ?? [];
  const spans = spanStyles(groups.length, groups.length > 4 ? 3 : groups.length);
  if (block.body) return <SplitWall block={block} tone={tone} />;
  if (block.layout === "board") return <Board block={block} tone={tone} />;
  return (
    <section id={block.id ?? "tools"} {...toneProps(tone)}>
      <div className={sec.container}>
        <SectionHead variant={block.head ?? "center"} tag={block.tag} icon={<Icon id={block.icon ?? "layers"} />} heading={block.heading} lead={block.lead} />

        <div className={s.wall} style={{ ["--per" as string]: perRow(block.ids.length) }}>
          {block.ids.map((id, i) => (
            <Reveal key={id} y={16} duration={0.8} delay={i * 0.045} className={s.cell}>
              <div className={s.tile} title={TECH[id].name}>
                <span className={s.logo}>
                  <TechMark id={id} className={s.mark} />
                </span>
                <span className={s.name}>{TECH[id].name}</span>
              </div>
            </Reveal>
          ))}
        </div>

        {groups.length > 0 && (
          <div className={cn(b.grid, sec.rail)}>
            {groups.map((g, i) => (
              <Reveal key={g.title} y={24} duration={0.9} delay={(i % 3) * 0.06} style={spans[i]}>
                <article className={b.card}>
                  <span className={b.iconTile}>
                    <Icon id={g.icon ?? "layers"} />
                  </span>
                  <div className={b.body}>
                    <h3 className={b.title}>{g.title}</h3>
                    {g.text && <p className={b.text}>{g.text}</p>}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
