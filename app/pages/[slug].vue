<template>
   <main class="profile">
      <NuxtLink class="profile__back" :to="localePath('/')">
         ← All profiles
      </NuxtLink>

      <article class="profile__card">
         <header class="profile__header">
            <ProfileAvatar :name="profile.fullName" :photo="profile.photo" size="lg" />
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

         <section class="profile__section">
            <h2 class="profile__section-title">
               Personal Information
            </h2>
            <dl class="details">
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

         <section class="profile__section">
            <h2 class="profile__section-title">
               Education &amp; Career
            </h2>
            <dl class="details details--stacked">
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

         <section class="profile__section">
            <h2 class="profile__section-title">
               Family Background
            </h2>
            <dl class="details details--stacked">
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

         <section class="profile__section">
            <blockquote class="profile__seeking">
               {{ profile.seeking }}
            </blockquote>
         </section>

         <section class="profile__section">
            <h2 class="profile__section-title">
               Contact Information
            </h2>
            <dl class="details details--stacked">
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

         <section v-if="profile.gallery.length" class="profile__section">
            <h2 class="profile__section-title">
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
   min-block-size: 100dvh;
   padding: clamp(1.5rem, 5vw, 3rem) 1.25rem;
   background:
      radial-gradient(circle at top, #fff6e6, transparent 55%),
      #fdf6ec;

   &__back {
      display: inline-block;
      max-inline-size: 44rem;
      margin-inline: auto;
      margin-block-end: 1.5rem;
      color: #b0233a;
      font-size: 0.9rem;
      font-weight: 600;

      &:hover {
         text-decoration: underline;
      }

      &:focus-visible {
         outline: 2px solid #b0233a;
         outline-offset: 3px;
         border-radius: 0.25rem;
      }
   }

   &__card {
      max-inline-size: 44rem;
      margin-inline: auto;
      padding: clamp(1.5rem, 4vw, 2.5rem);
      background: #fffdf8;
      border: 1px solid #f0e0c6;
      border-radius: 1.5rem;
      box-shadow: 0 4px 20px rgb(122 18 32 / 7%);
   }

   &__header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 1.5rem;
      padding-block-end: 1.75rem;
      border-block-end: 1px solid #f2e4cd;
   }

   &__name {
      font-size: clamp(1.6rem, 4vw, 2.1rem);
      font-weight: 700;
      letter-spacing: -0.02em;
      color: #7a1220;
   }

   &__summary {
      margin-block-start: 0.35rem;
      color: #8a6d52;
   }

   &__role {
      margin-block-start: 0.15rem;
      color: #b0233a;
      font-weight: 600;
   }

   &__section {
      margin-block-start: 1.75rem;
   }

   &__section-title {
      margin-block-end: 0.75rem;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #b98a3e;
   }

   &__bio {
      color: #5c4436;
      line-height: 1.7;
   }

   &__seeking {
      margin: 0;
      padding: 1.25rem 1.5rem;
      background: #fbeed7;
      border: 1px solid #f0d9ad;
      border-radius: 1rem;
      color: #7a1220;
      font-style: italic;
      line-height: 1.7;
      text-align: center;
   }
}

.details {
   display: grid;
   grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
   gap: 0.9rem 1.5rem;

   &--stacked {
      display: flex;
      flex-direction: column;
      gap: 0.9rem;
   }

   &__row {
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
   }

   &__label {
      font-size: 0.78rem;
      font-weight: 600;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      color: #b98a3e;
   }

   &__value {
      color: #3d2418;
      font-weight: 500;
      line-height: 1.6;
   }

   &__link {
      color: #b0233a;
      font-weight: 600;

      &:hover {
         text-decoration: underline;
      }

      &:focus-visible {
         outline: 2px solid #b0233a;
         outline-offset: 2px;
         border-radius: 0.2rem;
      }
   }
}

.addresses {
   margin: 0;
   padding-inline-start: 1.2rem;
   display: flex;
   flex-direction: column;
   gap: 0.35rem;

   li {
      padding-inline-start: 0.25rem;
   }
}
</style>
