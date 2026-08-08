<template>
   <main class="profile">
      <NuxtLink class="profile__back" to="/">
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
                  {{ profile.age }} yrs · {{ profile.height }} · {{ profile.location }}
               </p>
               <p class="profile__role">
                  {{ profile.profession }} at {{ profile.company }}
               </p>
            </div>
         </header>

         <section class="profile__section">
            <h2 class="profile__section-title">
               About
            </h2>
            <p class="profile__bio">
               {{ profile.bio }}
            </p>
         </section>

         <section class="profile__section">
            <h2 class="profile__section-title">
               Details
            </h2>
            <dl class="details">
               <div v-for="detail in details" :key="detail.label" class="details__row">
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
               Family
            </h2>
            <p class="profile__bio">
               {{ profile.family }}
            </p>
         </section>

         <section class="profile__section">
            <h2 class="profile__section-title">
               Interests
            </h2>
            <ul class="chips" role="list">
               <li v-for="interest in profile.interests" :key="interest" class="chips__item">
                  {{ interest }}
               </li>
            </ul>
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
const slug = computed(() => String(route.params.slug))

const profile = getProfileBySlug(slug.value)

if (!profile) {
   throw createError({
      statusCode: 404,
      statusMessage: "Profile not found",
      fatal: true,
   })
}

const details = computed(() => [
   { label: "Age", value: `${profile.age} years` },
   { label: "Height", value: profile.height },
   { label: "Location", value: profile.location },
   { label: "Profession", value: `${profile.profession}, ${profile.company}` },
   { label: "Education", value: profile.education },
   { label: "Religion", value: profile.religion },
   { label: "Community", value: profile.community },
   { label: "Mother tongue", value: profile.motherTongue },
   { label: "Diet", value: profile.diet },
   { label: "Marital status", value: profile.maritalStatus },
])

const description = [
   `${profile.fullName}, ${profile.age}`,
   profile.profession,
   profile.location,
].join(" · ")

useAppSeo({
   title: `${profile.fullName} — Mama Parichay`,
   description: description.slice(0, 155),
   ogType: "article",
})

// Absolute URLs for the gallery images so search engines can resolve them
// (schema.org requires fully-qualified contentUrl values).
const site = useSiteConfig()
const galleryUrls = computed(() =>
   profile.gallery.map((path) => `${site.url}${path}`),
)

// Structured data: model the biodata as a Person plus an ImageGallery so the
// public-folder photos are discoverable in image search.
useSchemaOrg([
   defineWebPage(),
   definePerson({
      name: profile.fullName,
      jobTitle: profile.profession,
      image: [profile.photo, ...galleryUrls.value],
   }),
   {
      "@type": "ImageGallery",
      "name": `${profile.fullName} — Photos`,
      "associatedMedia": galleryUrls.value.map((url, index) => ({
         "@type": "ImageObject",
         "contentUrl": url,
         "name": `${profile.fullName} — photo ${index + 1}`,
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
}

.details {
   display: grid;
   grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
   gap: 0.9rem 1.5rem;

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
   }
}

.chips {
   display: flex;
   flex-wrap: wrap;
   gap: 0.6rem;

   &__item {
      padding: 0.4rem 0.9rem;
      background: #fbeed7;
      border: 1px solid #f0d9ad;
      border-radius: 999px;
      color: #9a5a12;
      font-size: 0.875rem;
      font-weight: 500;
   }
}
</style>
