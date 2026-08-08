/// --------------------------------------------------
/// data/profiles.ts
/// --------------------------------------------------
/// Single, hardcoded source of truth for the demo matrimonial
/// profiles. No backend/API — pages import from here directly.
///
/// Records only. The shapes they conform to live in `~/types/profile`,
/// and anything derivable from them (sibling counts, imperial height,
/// the contact's name) is computed at render time by `utils/format.ts`
/// rather than duplicated here.
/// --------------------------------------------------

import type { Profile } from "~/types/profile"

export const profiles: Profile[] = [
   // {
   //    slug: "yojana-bheemaneti",
   //    fullName: "Yojana Bheemaneti",
   //    gender: "Female",
   //    photo: "/gallery/yojana-bheemaneti/yojana-in-casual-wear.png",
   //    birth: {
   //       date: "2003-10-29",
   //       time: "15:55",
   //       place: "L B Nagar, Hyderabad",
   //    },
   //    faith: {
   //       religion: "Hindu",
   //       caste: "Kamma",
   //    },
   //    horoscope: {
   //       star: "Moola",
   //       rasi: "Dhanasu",
   //       gotram: "Lakkanti",
   //    },
   //    physical: {
   //       heightCm: 162,
   //       weightKg: 58,
   //       complexion: "Fair",
   //       bloodGroup: "B+",
   //    },
   //    education: {
   //       qualification: "BA, B.Ed",
   //       institution: "Osmania University, Hyderabad",
   //    },
   //    occupation: {
   //       title: "Software Engineer",
   //       employer: "GTET",
   //       location: "Hyderabad",
   //    },
   //    family: [
   //       {
   //          relation: "Father",
   //          person: {
   //             fullName: "B. Bhaskara Naidu",
   //             gender: "Male",
   //             occupation: {
   //                title: "Asst Engr",
   //                employer: "Ministry of Defence, DGQA",
   //             },
   //          },
   //       },
   //       {
   //          relation: "Mother",
   //          person: {
   //             fullName: "B. Bhuvaneswari",
   //             gender: "Female",
   //             occupation: { title: "Home maker" },
   //          },
   //       },
   //       {
   //          relation: "Elder Brother",
   //          person: {
   //             gender: "Male",
   //             education: { qualification: "B.Tech (CSE)" },
   //             occupation: {
   //                title: "Software Engineer",
   //                employer: "GTET",
   //                location: "Hyderabad",
   //             },
   //          },
   //       },
   //       {
   //          relation: "Younger Brother",
   //          person: {
   //             gender: "Male",
   //             education: { qualification: "Class XII" },
   //          },
   //       },
   //    ],
   //    seeking: "Seeking a life partner who values traditions, respects family and believes in growing together with love and trust.",
   //    contact: {
   //       relation: "Father",
   //       phone: "9491677472",
   //       addresses: [
   //          "Qtr No. 3829, QDF Estate, Yeddumailaram, Sangareddy (Dist) - 502205 (TG)",
   //          "Pavuluru Kandiga, SKR Puram (P O), Palasamudram (Mandal), Chittoor Dist (AP)",
   //       ],
   //    },
   //    gallery: [
   //       {
   //          src: "/gallery/yojana-bheemaneti/yojana-in-casual-wear.png",
   //          alt: "Yojana Bheemaneti in a pink floral kurta, leaning on a terrace railing with greenery behind",
   //       },
   //    ],
   // },
   {
      slug: "mouli-bheemaneti",
      fullName: "Mouli Bheemaneti",
      gender: "Male",
      photo: "/gallery/mouli-bheemaneti/mb-in-traditional-wear.png",
      birth: {
         date: "1996-06-12",
         time: "09:20",
         place: "Guntur, Andhra Pradesh",
      },
      faith: {
         religion: "Hindu",
         caste: "Kamma",
      },
      horoscope: {
         star: "Rohini",
         rasi: "Vrishabha",
         gotram: "Lakkanti",
      },
      physical: {
         heightCm: 180,
         weightKg: 72,
         complexion: "Fair",
         bloodGroup: "O+",
      },
      education: {
         qualification: "B.Tech, Computer Science",
         institution: "IIT Bombay",
      },
      occupation: {
         title: "Senior Software Engineer",
         employer: "Atlassian",
         location: "Bengaluru",
      },
      family: [
         {
            relation: "Father",
            person: {
               fullName: "B. Ramakrishna",
               gender: "Male",
               occupation: { title: "Retired Bank Manager" },
            },
         },
         {
            relation: "Mother",
            person: {
               fullName: "B. Saroja",
               gender: "Female",
               occupation: { title: "Home maker" },
            },
         },
         {
            relation: "Younger Sister",
            person: {
               gender: "Female",
               education: { qualification: "Pursuing M.Sc" },
               residence: "Hyderabad",
            },
         },
      ],
      seeking: "Seeking a kind, ambitious partner who values honesty, family and shared growth to build a warm home together.",
      contact: {
         relation: "Father",
         phone: "9876543210",
         addresses: [
            "Flat 402, Sai Residency, Kothapet, Guntur - 522001 (AP)",
         ],
      },
      gallery: [
         {
            src: "/gallery/mouli-bheemaneti/mb-in-traditional-wear.png",
            alt: "Mouli Bheemaneti in a cream kurta with a gold zari border, standing outdoors",
         },
      ],
   },
]

/** Look up a single profile by its slug. */
export function getProfileBySlug(slug: string): Profile | undefined {
   return profiles.find((profile) => profile.slug === slug)
}
