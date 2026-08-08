/// --------------------------------------------------
/// types/profile.ts
/// --------------------------------------------------
/// Every shape a matrimonial profile is built from, in one place.
///
/// Layered bottom-up: closed sets and scalar aliases, then the value
/// objects assembled from them, then the entities. `Person` is the base
/// entity — the profile subject and every family member is one — so a
/// human being is described in exactly one shape.
///
/// Type-only by design: nothing here emits runtime code, so these
/// imports are erased at compile time. Runtime constants belong beside
/// the code that uses them, not in this file.
/// --------------------------------------------------

/// --------------------------------------------------
/// Enumerations & scalar aliases
/// --------------------------------------------------

export type Gender = "Male" | "Female"

/** All family relations we recognise, defined up front. */
export type Relation
   = | "Father"
     | "Mother"
     | "Elder Brother"
     | "Younger Brother"
     | "Elder Sister"
     | "Younger Sister"

/** Canonical ABO/Rh value. Rendered as "B +ve" by `formatBloodGroup`. */
export type BloodGroup
   = | "A+" | "A-"
     | "B+" | "B-"
     | "AB+" | "AB-"
     | "O+" | "O-"

/** ISO 8601 calendar date, `YYYY-MM-DD`. Sortable and locale-agnostic. */
export type IsoDate = string

/**
 * 24-hour clock time, `HH:MM`. Kept separate from the date so a profile
 * can record a birth date without a known birth time.
 */
export type Time24 = string

/// --------------------------------------------------
/// Value objects — each field holds one atomic fact
/// --------------------------------------------------

/** When and where someone was born. */
export interface BirthDetails {
   date: IsoDate
   /** Birth time, when known — it matters for horoscope matching. */
   time?: Time24
   /** e.g. "L B Nagar, Hyderabad". */
   place: string
}

/** Religion and community, split so either can be filtered on. */
export interface Faith {
   /** e.g. "Hindu". */
   religion: string
   /** e.g. "Kamma". */
   caste: string
   subCaste?: string
}

/** Vedic astrology details used for matchmaking. */
export interface Horoscope {
   /** Nakshatra, e.g. "Moola". */
   star: string
   /** Moon sign, e.g. "Dhanasu". */
   rasi: string
   /** e.g. "Lakkanti". */
   gotram: string
}

/** Body measurements in canonical metric units — never display strings. */
export interface PhysicalAttributes {
   /** Centimetres. Feet/inches are derived by `formatHeight`. */
   heightCm: number
   /** Kilograms. */
   weightKg: number
   /** e.g. "Fair". */
   complexion: string
   bloodGroup: BloodGroup
}

/** Highest qualification and where it was earned. */
export interface Education {
   /** e.g. "B.Tech (CSE)" or "Class XII". */
   qualification: string
   /** e.g. "Osmania University, Hyderabad". */
   institution?: string
}

/** What someone does for a living, split into its parts. */
export interface Occupation {
   /** e.g. "Software Engineer". */
   title: string
   /** e.g. "GTET". */
   employer?: string
   /** e.g. "Hyderabad". */
   location?: string
}

/**
 * One gallery photo. `alt` is authored rather than inferred from the
 * filename: it is what screen readers announce and what image search
 * indexes, so it is content, not a derivation.
 */
export interface GalleryImage {
   /**
    * Public-folder path, e.g. "/gallery/<slug>/portrait.png". Relative to
    * `public/`, so it starts with "/gallery/...".
    */
   src: string
   /** Describes what is actually in the photo, e.g. "Yojana in a pink kurta". */
   alt: string
}

/// --------------------------------------------------
/// Entities
/// --------------------------------------------------

/**
 * The base entity: any individual on the page.
 *
 * Everything but `gender` is optional because family entries are often
 * partial — a sibling still in school has a qualification but no job,
 * and names are frequently withheld for privacy.
 */
export interface Person {
   /** Omitted where a family member's name is not published. */
   fullName?: string
   gender: Gender
   birth?: BirthDetails
   education?: Education
   occupation?: Occupation
   /** Current city of residence, when it differs from where they work. */
   residence?: string
}

/** One row in the "Family Background" section: a person plus their relation. */
export interface FamilyMember {
   relation: Relation
   /** The family member's own details, in the same shape as the subject's. */
   person: Person
}

/**
 * Who to contact about this profile. `relation` is a reference into
 * `Profile.family` rather than a repeated name, so the contact's name
 * is stored in exactly one place.
 */
export interface ContactPoint {
   relation: Relation
   phone: string
   addresses: string[]
}

/**
 * A matrimonial profile. Extends `Person`, because the subject *is* a
 * person — `fullName`, `birth`, `education` and `occupation` are
 * re-declared as required here since they are always published for the
 * subject even though they are optional for family members.
 */
export interface Profile extends Person {
   /**
    * Stable primary key and URL segment. Stored rather than derived
    * from `fullName` so that correcting a spelling cannot silently
    * change the profile's public URL.
    */
   slug: string

   fullName: string
   birth: BirthDetails
   education: Education
   occupation: Occupation

   faith: Faith
   horoscope: Horoscope
   physical: PhysicalAttributes

   /** Parents and siblings. The sibling summary line is derived from this. */
   family: FamilyMember[]

   contact: ContactPoint

   /** Portrait URL. Falls back to initials if it fails to load. */
   photo: string

   /** Free-text partner-preference note. */
   seeking: string

   /**
    * Profile gallery, served as-is from `public/` for image SEO. Drop
    * files into `public/gallery/<slug>/` and list them here with the alt
    * text that describes each one.
    */
   gallery: GalleryImage[]
}
