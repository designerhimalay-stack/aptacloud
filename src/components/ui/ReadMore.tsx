// Card copy on phones: two lines, then "Read more" opens it in place. A hidden
// checkbox and its label do the toggle, so it works before (and without)
// hydration. Desktop shows the full text and hides the control. Inside a card
// that is itself a link, `link` shows the label only: the card opens the page.

import { useId } from "react";
import { cn } from "@/lib/utils";
import s from "./ReadMore.module.css";

export function ReadMore({
  children,
  className,
  link = false,
  min = 50,
}: {
  children: string;
  className?: string;
  link?: boolean;
  /** Shorter copy fits in about two lines, so it stays as plain text. */
  min?: number;
}) {
  const id = useId();
  if (children.length <= min) return <p className={className}>{children}</p>;
  if (link) {
    return (
      <>
        <p className={cn(className, s.clamp)}>{children}</p>
        <span className={s.more} aria-hidden="true">
          Read more
        </span>
      </>
    );
  }
  return (
    <>
      <input type="checkbox" id={id} className={s.toggle} aria-label="Show the full text" />
      <p className={cn(className, s.clamp)}>{children}</p>
      <label htmlFor={id} className={s.more} aria-hidden="true">
        <span className={s.open}>Read more</span>
        <span className={s.less}>Show less</span>
      </label>
    </>
  );
}
