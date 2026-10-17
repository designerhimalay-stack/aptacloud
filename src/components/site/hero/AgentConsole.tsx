// "Agent Console" — one glass HUD chip floating over the hero's full-bleed
// photo (card chrome: --bg-glass, 1px --line-strong border, 2px radius, mono
// labels): the Microsoft-centric stack named in the PDF.
// Chips drift a few pixels with the pointer (fine pointers only, off for
// reduced motion).

import { useEffect, useRef } from "react";
import { Pulse } from "@/components/ui/Pulse";
import { Reveal } from "@/components/ui/Reveal";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import s from "./AgentConsole.module.css";

const ACCENT = "var(--accent)";

const STACK = ["D365", "M365", "Azure", "Copilot"];

/** Writes --px / --py (−1…1, eased) on the root from the pointer position. */
function usePointerDrift() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !matchMedia("(pointer: fine)").matches) return;
    let raf = 0;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    const tick = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.setProperty("--px", x.toFixed(4));
      el.style.setProperty("--py", y.toFixed(4));
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.001 ? requestAnimationFrame(tick) : 0;
    };
    const move = (e: PointerEvent) => {
      tx = (e.clientX / innerWidth) * 2 - 1;
      ty = (e.clientY / innerHeight) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    addEventListener("pointermove", move, { passive: true });
    return () => {
      removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);
  return ref;
}

export function AgentConsole({ className }: { className?: string }) {
  const ref = usePointerDrift();

  return (
    <div ref={ref} className={cn(s.root, className)}>
      {/* (b) Microsoft-centric solutions */}
      <Reveal trigger="mount" delay={1.05} className={cn(s.slot, s.slotStack)}>
        <div className={cn(s.chip, s.chipStack)} style={{ ["--depth" as string]: "6px" }}>
          <div className={s.stackHead}>
            <Pulse size={6} color={ACCENT} />
            <p className={cn("t-micro", s.nowrap, s.chipTitle)}>Microsoft-centric solutions</p>
          </div>
          <div className={s.tags}>
            {STACK.map((t) => (
              <span key={t} className={cn("t-micro-xs", s.nowrap, s.tag)}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}

export default AgentConsole;
