// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://designerhimalay-stack.github.io",
  base: "/aptacloud",
  output: "static",
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
