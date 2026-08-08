import { describe, expect, it } from "vitest"
import { getProfileBySlug, profiles } from "../../app/data/profiles"

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
