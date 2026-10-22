// AI models strip (inside the dark Services section on AI pages): the model
// families we build with — GPT, Claude, Gemini, Grok, Llama — as logo tiles
// beside a short "Microsoft-first, model-agnostic" statement. Tiles brighten
// and their mark lifts on hover; on phones they scroll sideways.

import { Reveal } from "@/components/ui/Reveal";
import { TECH, type TechId } from "@/data/tech";
import { cn } from "@/lib/utils";
import { TechMark } from "./TechMark";
import sec from "./Section.module.css";
import s from "./AiModels.module.css";

const MODELS: TechId[] = ["openai", "claude", "gemini", "grok", "llama"];

export function AiModels() {
  return (
    <Reveal y={30} duration={1} amount={0} className={s.strip}>
      <div className={s.copy}>
        <p className={s.eyebrow}>
          <span className={s.dot} aria-hidden="true" />
          Model-agnostic, Microsoft-first
        </p>
        <h3 className={s.title}>We build with the model that fits the task.</h3>
        <p className={s.text}>
          Azure OpenAI Service and Microsoft Copilot come first. Where Claude, Gemini, Grok, or Llama suits the
          task better, we use it within your security controls.
        </p>
      </div>
      <ul className={cn(s.tiles, sec.rail)} aria-label="AI models we build with">
        {MODELS.map((id) => (
          <li key={id} className={s.tile}>
            <span className={s.mark}>
              <TechMark id={id} className={s.logo} />
            </span>
            <span className={s.name}>{TECH[id].name}</span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
