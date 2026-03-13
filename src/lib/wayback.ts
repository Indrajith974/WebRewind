/**
 * Helper to generate Wayback Machine archive URLs.
 * Format: https://web.archive.org/web/{YYYY}0101000000/{url}
 */
export function getArchiveUrl(domain: string, year: number | string): string {
  // Pad with an approximate date (January 1st of that year)
  return `https://web.archive.org/web/${year}0101000000/http://${domain}`;
}
