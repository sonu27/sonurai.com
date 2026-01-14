export function colorsToDataURL(colors: string[]): `data:image/${string}` {
  const stops = colors
    .map((color, i) => {
      const offset = colors.length === 1 ? 0 : (i / (colors.length - 1)) * 100;
      return `%3Cstop offset='${offset}%25' stop-color='${encodeURIComponent(color)}'/%3E`;
    })
    .join("");

  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E${stops}%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23g)' width='10' height='10'/%3E%3C/svg%3E`;
}
