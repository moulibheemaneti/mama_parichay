/// --------------------------------------------------
/// utils/format.ts
/// --------------------------------------------------
/// Presentation layer for the types in `~/types/profile`. Everything
/// the biodata *displays* but does not *store* — imperial height,
/// "02 brothers", "B +ve", the contact's name — is derived here, so the
/// records in `data/profiles.ts` stay atomic and cannot drift out of sync.
///
/// Auto-imported by Nuxt, so these are available in templates directly.
/// --------------------------------------------------

import type {
   BirthDetails,
   BloodGroup,
   ContactPoint,
   Education,
   FamilyMember,
   Faith,
   Horoscope,
   IsoDate,
   Occupation,
   Person,
   Relation,
   Time24,
} from "~/types/profile"

/** Zero-pad a count the way a printed biodata does: 1 → "01". */
export const padCount = (count: number): string => String(count).padStart(2, "0")

/** Join the parts that are present, dropping blanks. */
const join = (parts: (string | undefined)[], separator: string): string =>
   parts.filter(Boolean).join(separator)

/// --------------------------------------------------
/// Birth
/// --------------------------------------------------

/**
 * `2003-10-29` → `29.10.2003`. Split manually rather than via `Date`,
 * which would shift the day across timezones.
 */
export const formatBirthDate = (date: IsoDate): string => {
   const [year, month, day] = date.split("-")
   return `${day}.${month}.${year}`
}

/** `15:55` → `03.55 PM`. */
export const formatBirthTime = (time: Time24): string => {
   const [rawHour = "0", minute = "00"] = time.split(":")
   const hour = Number(rawHour)
   const meridiem = hour < 12 ? "AM" : "PM"

   return `${padCount(hour % 12 || 12)}.${minute} ${meridiem}`
}

/** `29.10.2003 @ 03.55 PM`, or just the date when no time is recorded. */
export const formatBirth = (birth: BirthDetails): string =>
   join([
      formatBirthDate(birth.date),
      birth.time && `@ ${formatBirthTime(birth.time)}`,
   ], " ")

/// --------------------------------------------------
/// Physical attributes
/// --------------------------------------------------

/** `162` → `162 CM (5ft 4in)`. Imperial is derived, never stored. */
export const formatHeight = (heightCm: number): string => {
   const totalInches = Math.round(heightCm / 2.54)
   const feet = Math.floor(totalInches / 12)
   const inches = totalInches % 12

   return `${heightCm} CM (${feet}ft ${inches}in)`
}

/** `58` → `58 kgs`. */
export const formatWeight = (weightKg: number): string => `${weightKg} kgs`

/** `B+` → `B +ve`. */
export const formatBloodGroup = (group: BloodGroup): string =>
   `${group.slice(0, -1)} ${group.endsWith("+") ? "+ve" : "-ve"}`

/// --------------------------------------------------
/// Faith & horoscope
/// --------------------------------------------------

/** `Hindu, Kamma`. */
export const formatFaith = (faith: Faith): string =>
   join([faith.religion, faith.caste, faith.subCaste], ", ")

/** `Moola, Dhanasu`. */
export const formatHoroscope = (horoscope: Horoscope): string =>
   join([horoscope.star, horoscope.rasi], ", ")

/// --------------------------------------------------
/// Education & occupation
/// --------------------------------------------------

/** `BA, B.Ed — Osmania University, Hyderabad`. */
export const formatEducation = (education: Education): string =>
   join([education.qualification, education.institution], " — ")

/** `Software Engineer at GTET, Hyderabad`. */
export const formatOccupation = (occupation: Occupation): string => {
   const where = join([occupation.employer, occupation.location], ", ")

   return join([occupation.title, where], " at ")
}

/// --------------------------------------------------
/// People
/// --------------------------------------------------

/**
 * A family member as one readable line, e.g.
 * `B. Bhaskara Naidu — Asst Engr at Ministry of Defence, DGQA`.
 * Only the fields actually recorded are included, so an unnamed
 * sibling renders as just `Class XII` with no dangling separator.
 */
export const formatPerson = (person: Person): string => {
   const details = join([
      person.education && formatEducation(person.education),
      person.occupation && formatOccupation(person.occupation),
      person.residence,
   ], ", ")

   return join([person.fullName, details], " — ")
}

/// --------------------------------------------------
/// Family
/// --------------------------------------------------

/**
 * Which relations count as a sibling. Lives here rather than in
 * `~/types/profile` because it is a runtime lookup, not a type — that
 * keeps the types file fully erasable at compile time.
 */
const SIBLING_RELATIONS = {
   "Elder Brother": "brother",
   "Younger Brother": "brother",
   "Elder Sister": "sister",
   "Younger Sister": "sister",
} as const satisfies Partial<Record<Relation, "brother" | "sister">>

/** Is this relation a sibling? Narrows to the keys of `SIBLING_RELATIONS`. */
const isSibling = (relation: Relation): relation is keyof typeof SIBLING_RELATIONS =>
   relation in SIBLING_RELATIONS

/**
 * Count the siblings in the family rows. Returns the counts rather than
 * a rendered line ("02 brothers") because that line is translated — the
 * page pluralises it through i18n. Counting rather than storing means
 * adding a sibling can never leave a stale total.
 */
export const countSiblings = (family: FamilyMember[]): { brothers: number, sisters: number } => {
   let brothers = 0
   let sisters = 0

   for (const member of family) {
      if (!isSibling(member.relation))
         continue

      if (SIBLING_RELATIONS[member.relation] === "brother")
         brothers += 1
      else
         sisters += 1
   }

   return { brothers, sisters }
}

/**
 * The i18n key segment for a relation: `Elder Brother` →
 * `elder-brother`. The `Relation` union is the source of truth, so a new
 * relation surfaces as a missing translation rather than raw English.
 */
export const relationKey = (relation: Relation): string =>
   relation.toLowerCase().replace(/ /g, "-")

/// --------------------------------------------------
/// Contact
/// --------------------------------------------------

/**
 * Resolve the contact's name by following `contact.relation` into the
 * family rows. Returns just the name — the relation that labels it is
 * translated, so the page joins the two.
 */
export const resolveContactName = (contact: ContactPoint, family: FamilyMember[]): string | undefined =>
   family.find((entry) => entry.relation === contact.relation)?.person.fullName
