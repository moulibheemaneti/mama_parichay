/// --------------------------------------------------
/// data/profiles.ts
/// --------------------------------------------------
/// Single, hardcoded source of truth for the demo matrimonial
/// profiles. No backend/API — pages import from here directly.
/// The `slug` is derived from the full name (e.g. "Rahul Sharma"
/// → "rahul-sharma") and used for the dynamic `/[slug]` route.
/// --------------------------------------------------

export interface Profile {
   fullName: string
   gender: "Male" | "Female"
   age: number
   /** City, State */
   location: string
   profession: string
   company: string
   education: string
   religion: string
   community: string
   motherTongue: string
   height: string
   diet: "Vegetarian" | "Non-Vegetarian" | "Eggetarian" | "Vegan"
   maritalStatus: string
   /** Portrait URL. Falls back to initials if it fails to load. */
   photo: string
   bio: string
   family: string
   interests: string[]
   /**
    * Public-folder image paths for the profile gallery, served as-is for
    * image SEO. Drop files into `public/gallery/<slug>/` and list them here
    * (paths are relative to `public/`, so they start with `/gallery/...`).
    */
   gallery: string[]
}

export const profiles: Profile[] = [
   {
      fullName: "Mouli Bheemaneti",
      gender: "Male",
      age: 29,
      location: "Bengaluru, Karnataka",
      profession: "Senior Software Engineer",
      company: "Atlassian",
      education: "B.Tech, Computer Science — IIT Bombay",
      religion: "Hindu",
      community: "Kamma",
      motherTongue: "Telugu",
      height: "5'11\" (180 cm)",
      diet: "Vegetarian",
      maritalStatus: "Never Married",
      photo: "/gallery/mouli-bheemaneti/mb-in-traditional-wear.png",
      bio: "An easy-going engineer who loves solving hard problems by day and cooking elaborate meals by night. I value honesty, curiosity and a good sense of humour. Looking for a kind, ambitious partner to share everyday adventures and build a warm home together.",
      family: "Born into a close-knit family settled in Pune. Father is a retired bank manager, mother is a homemaker, and I have one younger sister who is pursuing her Master's.",
      interests: ["Cooking", "Trekking", "Chess", "Classical music", "Photography"],
      gallery: [
         "/gallery/mouli-bheemaneti/mb-in-traditional-wear.png",
      ],
   },
   {
      fullName: "Yojana Bheemaneti",
      gender: "Female",
      age: 27,
      location: "Hyderabad, Telangana",
      profession: "Product Designer",
      company: "Freshworks",
      education: "M.Des, Interaction Design — NID Ahmedabad",
      religion: "Hindu",
      community: "Kamma",
      motherTongue: "Telugu",
      height: "5'5\" (165 cm)",
      diet: "Vegetarian",
      maritalStatus: "Never Married",
      photo: "/gallery/yojana-bheemaneti/yojana-in-casual-wear.png",
      bio: "A designer at heart who finds joy in small details, long conversations and weekend getaways. Independent and family-oriented in equal measure. I'm looking for a thoughtful, grounded partner who values mutual respect and shared growth.",
      family: "From a supportive, forward-thinking family in Hyderabad. Father runs a small business, mother is a school teacher, and I have an elder brother who is married and settled in Chennai.",
      interests: ["Painting", "Yoga", "Travel", "Reading", "Baking"],
      gallery: [
         "/gallery/yojana-bheemaneti/yojana-in-casual-wear.png",
      ],
   },
]

/** Look up a single profile by its derived slug. */
export function getProfileBySlug(slug: string): Profile | undefined {
   return profiles.find((profile) => toSlug(profile.fullName) === slug)
}
