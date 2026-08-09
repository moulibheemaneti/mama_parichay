import { describe, expect, it } from "vitest"
import en from "../../i18n/locales/en.json"
// Relative, not aliased: `~` is a Nuxt convenience that exists only inside
// the Nuxt/Vite environment, and these tests run in plain Node.
import { profiles } from "../../app/data/profiles"
import {
   getProfileBySlug,
   profileSeo,
   SEO_DESCRIPTION_MAX,
   SEO_TITLE_MAX,
   truncate,
} from "../../app/utils/profiles"

/// Slugs are stored on each profile rather than derived from the full
/// name, so these assert the properties a stored primary key must hold —
/// uniqueness and URL-safety — instead of re-deriving it from the name.

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

describe("profile slugs", () => {
   it("is URL-safe for every profile", () => {
      for (const profile of profiles) {
         expect(profile.slug).toMatch(SLUG_PATTERN)
      }
   })

   it("is unique across profiles", () => {
      const slugs = profiles.map((profile) => profile.slug)
      expect(new Set(slugs).size).toBe(slugs.length)
   })
})

describe("getProfileBySlug", () => {
   it("returns the matching profile for a known slug", () => {
      const profile = getProfileBySlug("mouli-bheemaneti")
      expect(profile?.fullName).toBe("Mouli Bheemaneti")
   })

   it("returns undefined for an unknown slug", () => {
      expect(getProfileBySlug("does-not-exist")).toBeUndefined()
   })

   it("resolves every seeded profile by its stored slug", () => {
      for (const profile of profiles) {
         expect(getProfileBySlug(profile.slug)).toBe(profile)
      }
   })
})

describe("profile galleries", () => {
   it("serves every image from the public gallery folder", () => {
      for (const profile of profiles) {
         for (const image of profile.gallery) {
            expect(image.src.startsWith("/gallery/")).toBe(true)
         }
      }
   })

   it("carries non-empty alt text on every image", () => {
      for (const profile of profiles) {
         for (const image of profile.gallery) {
            expect(image.alt.trim()).not.toBe("")
         }
      }
   })
})

describe("truncate", () => {
   it("leaves text within the limit untouched", () => {
      expect(truncate("Mouli Bheemaneti", 60)).toBe("Mouli Bheemaneti")
   })

   it("cuts on a word boundary rather than mid-word", () => {
      expect(truncate("Software Engineer at GTET", 20)).toBe("Software Engineer…")
   })

   it("never exceeds the limit", () => {
      expect(truncate("a".repeat(200), 40)).toHaveLength(40)
   })
})

/// The SEO metadata is derived, not authored per page, so these run the
/// real English message templates over every seeded profile: a new
/// record cannot ship with a missing, unrendered or over-long tag.

describe("profileSeo", () => {
   /** Minimal stand-in for vue-i18n's `t`: resolves a dot path, then `{x}`. */
   const t = (key: string, params: Record<string, string>): string => {
      const message = key.split(".").reduce<unknown>(
         (node, segment) => (node as Record<string, unknown>)?.[segment],
         en,
      )

      expect(typeof message, `missing message: ${key}`).toBe("string")

      return String(message).replace(/\{(\w+)\}/g, (_, name: string) => params[name] ?? `{${name}}`)
   }

   it("renders a title within the SERP limit for every profile", () => {
      for (const profile of profiles) {
         const { title } = profileSeo(profile, t)

         expect(title.trim()).not.toBe("")
         expect(title.length).toBeLessThanOrEqual(SEO_TITLE_MAX)
      }
   })

   it("renders a description within the SERP limit for every profile", () => {
      for (const profile of profiles) {
         const { description } = profileSeo(profile, t)

         expect(description.trim()).not.toBe("")
         expect(description.length).toBeLessThanOrEqual(SEO_DESCRIPTION_MAX)
      }
   })

   // Fitting is not the same as not overflowing: a description that has
   // to be clipped loses its tail, which is where the "marriage biodata"
   // keywords sit. If this trips, the record has an over-long field.
   it("fits the description without clipping for every profile", () => {
      for (const profile of profiles) {
         expect(profileSeo(profile, t).description).not.toContain("…")
      }
   })

   it("leaves no unrendered placeholders", () => {
      for (const profile of profiles) {
         const { title, description } = profileSeo(profile, t)

         expect(title).not.toMatch(/\{\w+\}/)
         expect(description).not.toMatch(/\{\w+\}/)
      }
   })

   it("names the profile in its title and description", () => {
      for (const profile of profiles) {
         const { title, description } = profileSeo(profile, t)

         expect(title).toContain(profile.fullName)
         expect(description).toContain(profile.fullName)
      }
   })

   it("fills every OG card field for every profile", () => {
      for (const profile of profiles) {
         const { ogImage } = profileSeo(profile, t)

         expect(ogImage.name).toBe(profile.fullName)
         expect(ogImage.headline.trim()).not.toBe("")
         expect(ogImage.place.trim()).not.toBe("")
      }
   })
})

/// Every locale has to carry the whole profile vocabulary: a missing key
/// falls back to raw English, which is exactly the duplicate-content
/// problem the translations exist to solve.

describe("locale coverage", () => {
   const LOCALES = ["en", "hi", "te", "ta", "mr", "kn"] as const

   /** Every leaf path in a message object, as dot notation. */
   const paths = (node: unknown, prefix = ""): string[] =>
      typeof node === "object" && node !== null
         ? Object.entries(node).flatMap(([key, value]) =>
            paths(value, prefix ? `${prefix}.${key}` : key),
         )
         : [prefix]

   const expected = paths(en)

   it.each(LOCALES)("%s translates every message", async(locale) => {
      const messages = (await import(`../../i18n/locales/${locale}.json`)).default

      expect(paths(messages).sort()).toEqual(expected.sort())
   })
})
