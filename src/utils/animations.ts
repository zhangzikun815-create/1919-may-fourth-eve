export const getHorizontalDistance = (scrollWidth: number, viewportWidth: number) =>
  Math.max(0, scrollWidth - viewportWidth);

export const shouldReduceMotion = (query: Pick<MediaQueryList, "matches">) => query.matches;

export const sourceLabel = (ids: string[]) => ids.map((id) => `[${id}]`).join(" ");
