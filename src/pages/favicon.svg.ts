import type { APIRoute } from "astro";
import { BRAND, markSvg } from "../brand/brand";

// Favicon generated from BRAND (mark + colours) at build time.
export const GET: APIRoute = () =>
  new Response(markSvg({ cell: "#ffffff", bg: BRAND.colors.dark }), {
    headers: { "Content-Type": "image/svg+xml" },
  });
