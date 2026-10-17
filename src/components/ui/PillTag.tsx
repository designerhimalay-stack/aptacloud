// Pill tag (section eyebrow): white pill on light sections, dark pill on
// dark ones; optional 20px line icon.

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import s from "./PillTag.module.css";

export function PillTag({ children, icon, className }: { children: ReactNode; icon?: ReactNode; className?: string }) {
  return (
    <p className={cn(s.tag, className)}>
      {icon && <span className={s.icon}>{icon}</span>}
      <span>{children}</span>
    </p>
  );
}
