export type EditorialSegment = { kind: 'plain' | 'serif'; text: string };

/**
 * Splits `*emphasized*` spans for Instrument Serif italic in headings.
 * Visible copy stays the same; asterisks are not rendered.
 */
export function parseEditorialHeading(text: string): EditorialSegment[] {
  const trimmed = text.trim();
  if (!trimmed.includes('*')) {
    return [{ kind: 'plain', text: trimmed }];
  }

  const segments: EditorialSegment[] = [];
  const re = /\*([^*]+)\*/g;
  let last = 0;
  let match: RegExpExecArray | null = re.exec(trimmed);

  while (match !== null) {
    if (match.index > last) {
      segments.push({ kind: 'plain', text: trimmed.slice(last, match.index) });
    }
    segments.push({ kind: 'serif', text: match[1].trim() });
    last = match.index + match[0].length;
    match = re.exec(trimmed);
  }

  if (last < trimmed.length) {
    segments.push({ kind: 'plain', text: trimmed.slice(last) });
  }

  return segments.length > 0 ? segments : [{ kind: 'plain', text: trimmed }];
}
