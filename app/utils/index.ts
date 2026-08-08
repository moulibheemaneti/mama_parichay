/** Convert a full name into a URL-safe, hyphenated slug. */
export const toSlug = (fullName: string): string => fullName
   .trim()
   .toLowerCase()
   .replace(/[^a-z0-9]+/g, "-")
   .replace(/^-+|-+$/g, "")
