/// --------------------------------------------------
/// utils/profiles.ts
/// --------------------------------------------------
/// Query layer over the records in `~/data/profiles`. That module stays
/// pure data; anything that *looks something up* lives here, so the
/// lookups keep working unchanged if the source ever moves behind an API.
///
/// Auto-imported by Nuxt, so these are available in pages directly.
/// --------------------------------------------------

import type { Profile } from "~/types/profile"
import { profiles } from "~/data/profiles"

/** Look up a single profile by its slug. */
export function getProfileBySlug(slug: string): Profile | undefined {
   return profiles.find((profile) => profile.slug === slug)
}
