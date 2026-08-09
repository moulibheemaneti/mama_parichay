/// --------------------------------------------------
/// utils/profiles.ts
/// --------------------------------------------------
/// Query layer over the records in `~/data/profiles`. That module stays
/// pure data; anything that *looks something up* lives here, so the
/// lookups keep working unchanged if the source ever moves behind an API.
///
/// Also home to `profileSeo`, which derives a profile's search metadata
/// from the record rather than authoring it per page. Every profile gets
/// the same treatment, and `test/unit/profiles.test.ts` asserts the
/// derivation holds for all of them — so a new profile cannot ship with
/// a missing or over-long title.
///
/// Auto-imported by Nuxt, so these are available in pages directly.
/// --------------------------------------------------

import type { Profile } from "~/types/profile"
import { profiles } from "~/data/profiles"
// Imported explicitly rather than relying on Nuxt's auto-import: this
// module is also loaded straight from the unit tests and the sitemap
// server route, neither of which runs the auto-import transform.
import { formatFaith } from "~/utils/format"

/** Look up a single profile by its slug. */
export function getProfileBySlug(slug: string): Profile | undefined {
   return profiles.find((profile) => profile.slug === slug)
}

/// --------------------------------------------------
/// Search metadata
/// --------------------------------------------------

/** Google truncates titles past roughly this width in the SERP. */
export const SEO_TITLE_MAX = 60

/** Meta descriptions are clipped past roughly this width. */
export const SEO_DESCRIPTION_MAX = 155

/**
 * Clip to `max` characters on a word boundary, with an ellipsis. Cutting
 * mid-word (the old `.slice(0, 155)`) reads as a broken string in the
 * SERP; cutting at a space reads as a sentence that ran long.
 */
export function truncate(text: string, max: number): string {
   if (text.length <= max)
      return text

   // Leave room for the ellipsis, then walk back to the last space.
   const clipped = text.slice(0, max - 1)
   const lastSpace = clipped.lastIndexOf(" ")

   return `${(lastSpace > 0 ? clipped.slice(0, lastSpace) : clipped).trimEnd()}…`
}

/**
 * The subset of vue-i18n's `t` that `profileSeo` needs. Narrowed to a
 * plain function so the derivation stays pure and testable — the unit
 * tests pass a `t` built from `i18n/locales/en.json`, which means the
 * real message templates are what gets asserted.
 */
export type SeoTranslate = (key: string, params: Record<string, string>) => string

export interface ProfileSeo {
   /** `<title>`, within `SEO_TITLE_MAX`. */
   title: string
   /** `<meta name="description">`, within `SEO_DESCRIPTION_MAX`. */
   description: string
   /** Props for the `OgImage/Profile.satori.vue` card. */
   ogImage: {
      name: string
      headline: string
      place: string
   }
}

/**
 * Derive a profile's search metadata from the record. The frame is
 * translated (so the six locale variants of a profile are not duplicate
 * content); the values inside it — names, roles, places — are the
 * authored records, and stay as written.
 *
 * The bare `occupation.title` is used rather than `formatOccupation`'s
 * full "role at employer, location" line: at ~90 characters that line
 * alone consumes most of the description, pushing the community and
 * "marriage biodata" keywords past the truncation point.
 */
export function profileSeo(profile: Profile, t: SeoTranslate): ProfileSeo {
   const name = profile.fullName
   const occupation = profile.occupation.title
   const { place } = profile.birth
   const faith = formatFaith(profile.faith)

   return {
      title: truncate(t("seo.profile.title", { name }), SEO_TITLE_MAX),
      description: truncate(
         t("seo.profile.description", { name, occupation, place, faith }),
         SEO_DESCRIPTION_MAX,
      ),
      ogImage: { name, headline: occupation, place },
   }
}
