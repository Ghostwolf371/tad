/** Split a page title into two lines for PageHero reveal (gradient on second line). */
export function heroTitleLines(title: string): readonly string[] {
  const trimmed = title.trim();
  const words = trimmed.split(/\s+/);
  if (words.length <= 1) return [trimmed];
  const mid = Math.ceil(words.length / 2);
  const second = words.slice(mid).join(" ");
  return [words.slice(0, mid).join(" "), second.endsWith(".") ? second : `${second}.`];
}
