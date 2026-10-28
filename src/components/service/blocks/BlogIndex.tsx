// Blog index: every post on the live blog. The newest post leads as a wide
// feature card; under it, topic filters and a title search narrow the grid of
// cards (the same cards as the industry pages' Articles row), nine at a time
// with "Show more". Each card opens the article on the live blog.
// Topics group the blog's own categories and titles: a post can sit in more
// than one (an oil and gas AI post is in both).

import { useMemo, useState } from "react";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { POSTS, postImage, postUrl, type Post } from "@/data/blog";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Icon } from "../Icon";
import { toneProps, type Tone } from "../tone";
import sec from "../Section.module.css";
import p from "./Posts.module.css";
import s from "./BlogIndex.module.css";

const TOPICS: { id: string; label: string; test: (x: Post) => boolean }[] = [
  { id: "insurance", label: "Insurance", test: (x) => /insurance/i.test(x.category) || /insurance/i.test(x.title) },
  { id: "oilgas", label: "Oil & Gas", test: (x) => /oil/i.test(x.title) },
  { id: "ai", label: "AI", test: (x) => /\bAI\b|artificial/i.test(x.category) },
  { id: "modernisation", label: "Modernisation", test: (x) => /moderni[sz]ation/i.test(x.category) && !/insurance/i.test(x.category) },
  { id: "microsoft", label: "Microsoft", test: (x) => /dynamics|sharepoint|microsoft 365/i.test(x.category) },
  { id: "azure", label: "Azure", test: (x) => /azure/i.test(x.category) },
];

const fmt = (iso: string) => new Date(`${iso}T00:00:00`).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });
const PAGE = 9;

function Card({ post, i }: { post: Post; i: number }) {
  return (
    <Reveal y={24} duration={0.8} delay={(i % 3) * 0.06} className={p.cell}>
      <a href={postUrl(post.slug)} className={cn(p.card, "photo-host")}>
        <div className={p.thumb}>
          <Photo src={postImage(post.slug)} alt="" tone="color" sizes="(min-width: 1200px) 380px, (min-width: 810px) 45vw, 92vw" className={p.photo} />
        </div>
        <div className={p.body}>
          <p className={p.meta}>
            <span className={p.cat}>{post.category}</span>
            <span>{fmt(post.date)}</span>
          </p>
          <h3 className={p.title}>{post.title}</h3>
          <span className={p.read}>
            Read the article
            <ArrowUpRight />
          </span>
        </div>
      </a>
    </Reveal>
  );
}

export function BlogIndex({ tone }: { tone: Tone }) {
  const [topic, setTopic] = useState("all");
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(PAGE);

  const [lead, ...rest] = POSTS;
  const filtering = topic !== "all" || query.trim() !== "";
  const list = useMemo(() => {
    const t = TOPICS.find((x) => x.id === topic);
    const q = query.trim().toLowerCase();
    return (filtering ? POSTS : rest).filter((x) => (!t || t.test(x)) && (!q || x.title.toLowerCase().includes(q) || x.category.toLowerCase().includes(q)));
  }, [topic, query, filtering, rest]);

  const pick = (id: string) => {
    setTopic(id);
    setShown(PAGE);
  };

  return (
    <section id="articles" {...toneProps(tone)}>
      <div className={sec.container}>
        {/* The newest post, in full width, while nothing is filtered. */}
        {!filtering && (
          <Reveal y={32} duration={1.1}>
            <a href={postUrl(lead.slug)} className={cn(s.lead, "photo-host")}>
              <div className={s.leadThumb}>
                <Photo src={postImage(lead.slug)} alt="" tone="color" sizes="(min-width: 1200px) 640px, 92vw" priority className={p.photo} />
              </div>
              <div className={s.leadBody}>
                <p className={s.leadKicker}>Latest article</p>
                <p className={p.meta}>
                  <span className={p.cat}>{lead.category}</span>
                  <span>{fmt(lead.date)}</span>
                </p>
                <h2 className={s.leadTitle}>{lead.title}</h2>
                <span className={cn(p.read, s.leadRead)}>
                  Read the article
                  <ArrowUpRight />
                </span>
              </div>
            </a>
          </Reveal>
        )}

        <div className={s.bar}>
          <div className={s.topics} role="group" aria-label="Filter by topic">
            {[{ id: "all", label: "All" }, ...TOPICS].map((t) => (
              <button key={t.id} type="button" aria-pressed={topic === t.id} className={cn(s.topic, topic === t.id && s.topicOn)} onClick={() => pick(t.id)}>
                {t.label}
              </button>
            ))}
          </div>
          <label className={s.search}>
            <Icon id="search" />
            <span className="sr-only">Search articles</span>
            <input
              type="search"
              value={query}
              placeholder="Search articles"
              onChange={(e) => {
                setQuery(e.target.value);
                setShown(PAGE);
              }}
            />
          </label>
        </div>

        <p className={s.count} aria-live="polite">
          {filtering ? `${list.length} ${list.length === 1 ? "article" : "articles"}` : `${POSTS.length} articles`}
        </p>

        {list.length > 0 ? (
          <div className={s.grid}>
            {list.slice(0, shown).map((post, i) => (
              <Card key={post.slug} post={post} i={i} />
            ))}
          </div>
        ) : (
          <div className={s.empty}>
            <p>No articles match that search.</p>
            <button
              type="button"
              className={s.more}
              onClick={() => {
                setQuery("");
                pick("all");
              }}
            >
              Show all articles
            </button>
          </div>
        )}

        {list.length > shown && (
          <button type="button" className={s.more} onClick={() => setShown((n) => n + PAGE)}>
            Show more articles
          </button>
        )}
      </div>
    </section>
  );
}
