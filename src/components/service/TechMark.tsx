// A technology mark: Microsoft products in full colour, every other mark as a
// currentColor silhouette (CSS mask over the Simple Icons SVG), and a monogram
// where no licensed mark exists. `Chip` adds the product name beside it.

import { asset } from "@/brand/brand";
import { TECH, type TechId } from "@/data/tech";
import { cn } from "@/lib/utils";
import s from "./TechMark.module.css";

function monogram(name: string) {
  return name
    .replace(/^Microsoft /, "")
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function TechMark({ id, className }: { id: TechId; className?: string }) {
  const t: { name: string; color?: string; mono?: string } = TECH[id];
  // The Dynamics 365 file is a wide lockup (symbol + wordmark): crop to the symbol.
  const lockup = t.color?.includes("dynamics-365");
  if (t.color)
    return (
      <img
        className={cn(s.mark, className)}
        src={asset(t.color)}
        alt=""
        width={20}
        height={20}
        loading="lazy"
        style={lockup ? { objectFit: "cover", objectPosition: "0% 50%" } : undefined}
      />
    );
  if (t.mono)
    return (
      <span
        className={cn(s.mark, s.mono, className)}
        style={{ maskImage: `url(${asset(t.mono)})`, WebkitMaskImage: `url(${asset(t.mono)})` }}
        aria-hidden="true"
      />
    );
  return (
    <span className={cn(s.mark, s.monogram, className)} aria-hidden="true">
      {monogram(t.name)}
    </span>
  );
}

export function TechChip({ id, className }: { id: TechId; className?: string }) {
  return (
    <span className={cn(s.chip, className)}>
      <TechMark id={id} />
      <span>{TECH[id].name}</span>
    </span>
  );
}
