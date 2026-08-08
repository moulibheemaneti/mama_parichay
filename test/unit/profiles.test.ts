import { describe, expect, it } from "vitest"
import { getProfileBySlug, profiles, toSlug } from "../../app/data/profiles"

describe("toSlug", () => {
   it("lowercases and hyphenates a full name", () => {
      expect(toSlug("Mouli Bheemaneti")).toBe("mouli-bheemaneti")
   })

   it("collapses whitespace and trims surrounding spaces", () => {
      expect(toSlug("  Yojana   Bheemaneti  ")).toBe("yojana-bheemaneti")
   })

   it("strips punctuation and other non-alphanumeric characters", () => {
      expect(toSlug("A. R. Rahman!")).toBe("a-r-rahman")
   })

   it("never leaves leading or trailing hyphens", () => {
      expect(toSlug("--Priya--")).toBe("priya")
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

   it("resolves every seeded profile by its derived slug", () => {
      for (const profile of profiles) {
         const found = getProfileBySlug(toSlug(profile.fullName))
         expect(found).toBe(profile)
      }
   })
})
