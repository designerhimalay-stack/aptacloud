// Card grids on a 60-column track, so any count lays out cleanly: full rows
// take 60 / cols each, and a short last row shares the width evenly
// (10 in 4 columns → 4 + 4 + 2 wide). --span is desktop, --span-md tablet (2 cols).

const rowSpans = (n: number, cols: number) =>
  Array.from({ length: n }, (_, i) => {
    const last = n % cols;
    const inLast = last > 0 && i >= n - last;
    return 60 / (inLast ? last : cols);
  });

/** Default column count for a number of cards. */
export const autoCols = (n: number) => (n <= 3 ? n : n === 4 ? 4 : n === 5 ? 3 : n === 6 ? 3 : n <= 8 ? 4 : n === 9 ? 3 : 4);

export function spanStyles(n: number, cols = autoCols(n)): Record<string, number>[] {
  const d = rowSpans(n, cols);
  const m = rowSpans(n, Math.min(2, cols));
  return d.map((span, i) => ({ "--span": span, "--span-md": m[i] }));
}
