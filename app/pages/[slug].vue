<template>
   <main class="profile">
      <NuxtLink class="profile__back" :to="localePath('/')">
         ← All profiles
      </NuxtLink>

      <article class="profile__card ornate-frame">
         <header class="profile__header">
            <span class="profile__crest" aria-hidden="true">🪷</span>
            <div class="profile__portrait">
               <ProfileAvatar :name="profile.fullName" :photo="profile.photo" size="lg" />
            </div>
            <div class="profile__intro">
               <h1 class="profile__name">
                  {{ profile.fullName }}
               </h1>
               <p class="profile__summary">
                  {{ formatFaith(profile.faith) }} · {{ profile.birth.place }}
               </p>
               <p class="profile__role">
                  {{ formatOccupation(profile.occupation) }}
               </p>
            </div>
         </header>

         <div class="flourish" aria-hidden="true" />

         <section class="profile__section">
            <h2 class="banner">
               Personal Information
            </h2>
            <dl class="details panel">
               <div v-for="detail in personalDetails" :key="detail.label" class="details__row">
                  <dt class="details__label">
                     {{ detail.label }}
                  </dt>
                  <dd class="details__value">
                     {{ detail.value }}
                  </dd>
               </div>
            </dl>
         </section>

         <div class="flourish" aria-hidden="true" />

         <section class="profile__section">
            <h2 class="banner">
               Education &amp; Career
            </h2>
            <dl class="details details--stacked panel">
               <div class="details__row">
                  <dt class="details__label">
                     Education Qualification
                  </dt>
                  <dd class="details__value">
                     {{ formatEducation(profile.education) }}
                  </dd>
               </div>
               <div class="details__row">
                  <dt class="details__label">
                     Career
                  </dt>
                  <dd class="details__value">
                     {{ formatOccupation(profile.occupation) }}
                  </dd>
               </div>
            </dl>
         </section>

         <div class="flourish" aria-hidden="true" />

         <section class="profile__section">
            <h2 class="banner">
               Family Background
            </h2>
            <dl class="details details--stacked panel">
               <div v-for="member in profile.family" :key="member.relation" class="details__row">
                  <dt class="details__label">
                     {{ member.relation }}
                  </dt>
                  <dd class="details__value">
                     {{ formatPerson(member.person) }}
                  </dd>
               </div>
               <div class="details__row">
                  <dt class="details__label">
                     Siblings
                  </dt>
                  <dd class="details__value">
                     {{ summariseSiblings(profile.family) }}
                  </dd>
               </div>
            </dl>
         </section>

         <div class="flourish" aria-hidden="true" />

         <section class="profile__section">
            <blockquote class="profile__seeking">
               <span class="profile__seeking-mark" aria-hidden="true">॥ ✦ ॥</span>
               {{ profile.seeking }}
            </blockquote>
         </section>

         <div class="flourish" aria-hidden="true" />

         <section class="profile__section">
            <h2 class="banner">
               Contact Information
            </h2>
            <dl class="details details--stacked panel">
               <div class="details__row">
                  <dt class="details__label">
                     Contact
                  </dt>
                  <dd class="details__value">
                     {{ formatContactName(profile.contact, profile.family) }} —
                     <a class="details__link" :href="`tel:${profile.contact.phone}`">{{ profile.contact.phone }}</a>
                  </dd>
               </div>
               <div class="details__row">
                  <dt class="details__label">
                     Address
                  </dt>
                  <dd class="details__value">
                     <ol class="addresses">
                        <li v-for="(address, index) in profile.contact.addresses" :key="index">
                           {{ address }}
                        </li>
                     </ol>
                  </dd>
               </div>
            </dl>
         </section>

         <div v-if="profile.gallery.length" class="flourish" aria-hidden="true" />

         <section v-if="profile.gallery.length" class="profile__section">
            <h2 class="banner">
               Photos
            </h2>
            <ProfileGallery :name="profile.fullName" :images="profile.gallery" />
         </section>
      </article>
   </main>
</template>

<script lang="ts" setup>
import { getProfileBySlug } from "~/data/profiles"

defineOptions({ name: "ProfileDetailPage" })

const route = useRoute()
const localePath = useLocalePath()
const slug = computed(() => String(route.params.slug))

const profile = getProfileBySlug(slug.value)

if (!profile) {
   throw createError({
      statusCode: 404,
      statusMessage: "Profile not found",
      fatal: true,
   })
}

const personalDetails = computed(() => [
   { label: "D.O.B.", value: formatBirth(profile.birth) },
   { label: "Place of Birth", value: profile.birth.place },
   { label: "Religion & Caste", value: formatFaith(profile.faith) },
   { label: "Star & Rasi", value: formatHoroscope(profile.horoscope) },
   { label: "Gotram", value: profile.horoscope.gotram },
   { label: "Height", value: formatHeight(profile.physical.heightCm) },
   { label: "Weight", value: formatWeight(profile.physical.weightKg) },
   { label: "Complexion", value: profile.physical.complexion },
   { label: "Blood Group", value: formatBloodGroup(profile.physical.bloodGroup) },
])

const description = [
   profile.fullName,
   formatFaith(profile.faith),
   formatOccupation(profile.occupation),
].join(" · ")

useAppSeo({
   title: `${profile.fullName} — Mama Parichay`,
   description: description.slice(0, 155),
   ogType: "article",
})

// Absolute URLs for the gallery images so search engines can resolve them
// (schema.org requires fully-qualified contentUrl values).
const site = useSiteConfig()
const galleryImages = computed(() =>
   profile.gallery.map((image) => ({
      url: `${site.url}${image.src}`,
      alt: image.alt,
   })),
)

// Structured data: model the biodata as a Person plus an ImageGallery so the
// public-folder photos are discoverable in image search.
useSchemaOrg([
   defineWebPage(),
   definePerson({
      name: profile.fullName,
      // schema.org expects the bare role here, not a sentence.
      jobTitle: profile.occupation.title,
      ...(profile.occupation.employer && {
         worksFor: { "@type": "Organization", "name": profile.occupation.employer },
      }),
      image: [profile.photo, ...galleryImages.value.map((image) => image.url)],
   }),
   {
      "@type": "ImageGallery",
      "name": `${profile.fullName} — Photos`,
      // The authored alt text doubles as the caption search engines index.
      "associatedMedia": galleryImages.value.map((image) => ({
         "@type": "ImageObject",
         "contentUrl": image.url,
         "name": image.alt,
         "caption": image.alt,
      })),
   },
])
</script>

<style scoped lang="scss">
.profile {
   padding: clamp(1.5rem, 5vw, 3rem) 1.25rem clamp(3rem, 8vw, 5rem);
   background: var(--page-glow), var(--cream);

   &__back {
      display: block;
      max-inline-size: 46rem;
      margin-inline: auto;
      margin-block-end: 1.25rem;
      color: var(--kumkum);
      font-family: var(--font-display);
      font-size: 0.9rem;
      font-weight: var(--weight-label);
      letter-spacing: 0.08em;
      text-transform: uppercase;

      &:hover {
         text-decoration: underline;
         text-underline-offset: 4px;
      }

      &:focus-visible {
         outline: 2px solid var(--kumkum);
         outline-offset: 3px;
         border-radius: 0.25rem;
      }
   }

   &__card {
      max-inline-size: 46rem;
      margin-inline: auto;
      padding: clamp(1.75rem, 5vw, 3rem) clamp(1.25rem, 4vw, 2.75rem);
   }

   &__header {
      text-align: center;
   }

   // Lotus crest above the portrait, framed by a pair of gold rules.
   &__crest {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      margin-block-end: 1rem;
      font-size: 1.5rem;
      line-height: 1;

      &::before,
      &::after {
         content: "";
         inline-size: clamp(2rem, 12vw, 5rem);
         block-size: 1px;
         background: var(--gold-gradient);
      }
   }

   // Gold ring around the portrait, echoing the frame's double rule.
   &__portrait {
      display: inline-block;
      padding: 5px;
      background: var(--gold-gradient);
      border-radius: 50%;
      box-shadow: 0 6px 18px rgb(92 15 27 / 18%);

      :deep(.avatar) {
         border: 3px solid var(--cream-card);
      }
   }

   &__name {
      margin-block-start: 1rem;
      color: var(--maroon);
      font-size: clamp(1.8rem, 5vw, 2.5rem);
      font-weight: var(--weight-heading);
      letter-spacing: 0.02em;
   }

   &__summary {
      margin-block-start: 0.5rem;
      color: var(--muted);
      font-size: 1.1rem;
   }

   &__role {
      margin-block-start: 0.2rem;
      color: var(--kumkum);
      font-size: 1.1rem;
      font-weight: var(--weight-heading);
   }

   &__section {
      // The banner overlaps the panel below it, so the pill reads as a
      // label pinned to the section rather than a floating heading.
      display: flex;
      flex-direction: column;
      align-items: center;

      .banner {
         position: relative;
         z-index: 1;
         margin-block-end: -1rem;
      }

      > .panel,
      > :deep(.gallery) {
         inline-size: 100%;
      }

      > .panel {
         padding-block-start: 1.9rem;
      }
   }

   &__seeking {
      max-inline-size: 34rem;
      margin: 0 auto;
      padding: clamp(1.25rem, 4vw, 1.75rem);
      background: linear-gradient(180deg, rgb(251 238 215 / 80%), rgb(255 253 248 / 70%));
      border: 1px solid var(--line-gold);
      border-radius: 1rem;
      color: var(--maroon);
      font-size: 1.15rem;
      font-style: italic;
      font-weight: var(--weight-strong);
      line-height: 1.8;
      text-align: center;
   }

   &__seeking-mark {
      display: block;
      margin-block-end: 0.5rem;
      color: var(--gold);
      font-style: normal;
      letter-spacing: 0.3em;
   }
}

.details {
   display: grid;
   grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
   gap: 1rem 1.75rem;

   &--stacked {
      display: flex;
      flex-direction: column;
   }

   &__row {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
   }

   // A dotted leader under each row, the way a printed biodata rules its
   // lines. Omitted on the last row so the panel doesn't end on a rule.
   &--stacked &__row:not(:last-child) {
      padding-block-end: 0.85rem;
      border-block-end: 1px dotted rgb(185 138 62 / 45%);
      margin-block-end: 0.85rem;
   }

   &__label {
      color: var(--gold-deep);
      font-family: var(--font-display);
      font-size: 0.8rem;
      font-weight: var(--weight-label);
      letter-spacing: 0.09em;
      text-transform: uppercase;
   }

   &__value {
      color: var(--ink);
      font-size: 1.15rem;
      font-weight: var(--weight-strong);
      line-height: 1.6;
   }

   &__link {
      color: var(--kumkum);
      font-weight: var(--weight-label);

      &:hover {
         text-decoration: underline;
      }

      &:focus-visible {
         outline: 2px solid var(--kumkum);
         outline-offset: 2px;
         border-radius: 0.2rem;
      }
   }
}

.addresses {
   display: flex;
   flex-direction: column;
   gap: 0.4rem;
   margin: 0;
   padding-inline-start: 1.2rem;
   list-style: decimal;

   li {
      padding-inline-start: 0.25rem;

      &::marker {
         color: var(--gold);
      }
   }
}
</style>
