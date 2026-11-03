// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// Touch screens keep :hover after a tap, so every hover rule only applies on
// devices that can really hover.
/** @type {import("postcss").Plugin} */
const hoverOnly = {
  postcssPlugin: "hover-only",
  OnceExit(root, { AtRule }) {
    root.walkRules(/:hover/, (rule) => {
      if (rule.parent?.type === "atrule" && /hover:\s*hover/.test(/** @type {import("postcss").AtRule} */ (rule.parent).params)) return;
      const hover = rule.selectors.filter((s) => s.includes(":hover"));
      const rest = rule.selectors.filter((s) => !s.includes(":hover"));
      const guarded = new AtRule({ name: "media", params: "(hover: hover)" });
      guarded.append(rule.clone({ selectors: hover }));
      rule.after(guarded);
      if (rest.length) rule.selectors = rest;
      else rule.remove();
    });
  },
};

export default defineConfig({
  site: "https://designerhimalay-stack.github.io",
  base: "/aptacloud",
  output: "static",
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    css: { postcss: { plugins: [hoverOnly] } },
  },
});
