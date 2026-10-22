// Button — pill buttons (Inter 500, sentence case, fully rounded). On
// hover the label rolls up letter by letter into its hover colour, the
// fill swaps, and a 2px ring appears 3px outside the pill.
//  • primary: accent → inverted surface (ink pill on light, white on dark)
//  • outline: inverted surface → accent
//  • small:   compact primary for the nav

import { cn } from "@/lib/utils";
import { RollingText } from "./RollingText";

export type ButtonVariant = "primary" | "outline" | "small";

const base =
  "roll-host relative inline-flex w-max shrink-0 cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-full font-sans font-medium tracking-[-0.02em] " +
  "outline-2 outline-offset-[3px] outline-solid outline-transparent " +
  "transition-[background-color,outline-color,transform] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98] " +
  "focus-visible:outline-accent";

const variants: Record<ButtonVariant, string> = {
  primary:
    "h-[48px] px-[22px] text-[16px] bg-accent [--roll-from:var(--ink)] [--roll-to:var(--bg)] " +
    "hover:bg-fg hover:outline-fg",
  outline:
    "h-[48px] px-[22px] text-[16px] bg-fg [--roll-from:var(--bg)] [--roll-to:var(--ink)] " +
    "hover:bg-accent hover:outline-accent",
  small:
    "h-[40px] px-[18px] text-[15px] bg-accent [--roll-from:var(--ink)] [--roll-to:var(--bg)] " +
    "hover:bg-fg hover:outline-fg",
};

export function Button({
  label,
  shortLabel,
  href = "#",
  variant = "primary",
  className,
}: {
  label: string;
  /** Same action in fewer words, swapped in below 520px (the label is one line). */
  shortLabel?: string;
  href?: string;
  variant?: ButtonVariant;
  className?: string;
}) {
  return (
    <a href={href} className={cn(base, variants[variant], className)} aria-label={shortLabel ? label : undefined}>
      {shortLabel ? (
        <>
          <RollingText text={label} className="max-[519.98px]:!hidden" />
          <RollingText text={shortLabel} className="min-[520px]:!hidden" />
        </>
      ) : (
        <RollingText text={label} />
      )}
    </a>
  );
}
