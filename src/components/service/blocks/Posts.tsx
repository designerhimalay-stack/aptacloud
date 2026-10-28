// Articles (the live industry pages' "Blogs" row): three posts from the live
// blog chosen for this page, each a photo card with its category and date, the
// title, a one-line summary written for this page, and a link to the article.
// "All articles" goes to the blog. Phones: a swipe rail.

import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { asset } from "@/brand/brand";
import { getPost, postImage, postUrl } from "@/data/blog";
import type { Block } from "@/data/services/types";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Icon } from "../Icon";
import { RailHint } from "../RailHint";
import { SectionHead } from "../SectionHead";
import { toneProps, type Tone } from "../tone";
import sec from "../Section.module.css";
import s from "./Posts.module.css";

type PostsBlock = Extract<Block, { kind: "posts" }>;

const fmt = (iso: string) => new Date(`${iso}T00:00:00`).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });

export function Posts({ block, tone }: { block: PostsBlock; tone: Tone }) {
  const id = block.id ?? "articles";
  return (
    <section id={id} {...toneProps(tone)}>
      <div className={sec.container}>
        <SectionHead variant={block.head ?? "split"} tag={block.tag} icon={<Icon id={block.icon ?? "doc"} />} heading={block.heading} lead={block.lead} />
        <div id={`${id}-rail`} className={cn(s.grid, sec.rail)}>
          {block.items.map((it, i) => {
            const p = getPost(it.slug);
            return (
              <Reveal key={it.slug} y={28} duration={0.9} delay={i * 0.07} className={s.cell}>
                <a href={postUrl(it.slug)} className={cn(s.card, "photo-host")}>
                  <div className={s.thumb}>
                    <Photo src={postImage(it.slug)} alt="" tone="color" sizes="(min-width: 1200px) 380px, 84vw" className={s.photo} />
                  </div>
                  <div className={s.body}>
                    <p className={s.meta}>
                      <span className={s.cat}>{p.category}</span>
                      <span>{fmt(p.date)}</span>
                    </p>
                    <h3 className={s.title}>{p.title}</h3>
                    <p className={s.summary}>{it.summary}</p>
                    <span className={s.read}>
                      Read the article
                      <ArrowUpRight />
                    </span>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
        <RailHint forId={`${id}-rail`} count={block.items.length} />
        <a href={asset("/blog/")} className={s.all}>
          All articles
          <ArrowUpRight />
        </a>
      </div>
    </section>
  );
}
