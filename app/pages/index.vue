<template>
   <main class="home">
      <header class="home__header">
         <img src="/og-logo.png" alt="" class="home__crest" width="64" height="64" aria-hidden="true" />
         <h1 class="home__title">
            {{ t("home.heading") }}
         </h1>
         <p class="home__tagline">
            {{ t("home.tagline") }}
         </p>
         <div class="flourish" aria-hidden="true" />
      </header>

      <ul class="cards" role="list">
         <li v-for="profile in profiles" :key="profile.slug" class="cards__item">
            <NuxtLink class="card ornate-frame" :to="localePath(`/${profile.slug}`)"
               :aria-label="`View ${profile.fullName}'s full profile`">
               <div class="card__portrait">
                  <ProfileAvatar :name="profile.fullName" :photo="profile.photo" size="md" />
               </div>
               <div class="card__body">
                  <h2 class="card__name">
                     {{ profile.fullName }}
                  </h2>
                  <p class="card__meta">
                     {{ formatOccupation(profile.occupation) }}
                  </p>
                  <p class="card__location">
                     {{ formatFaith(profile.faith) }} · {{ profile.birth.place }}
                  </p>
               </div>
               <span class="card__cta" aria-hidden="true">View profile →</span>
            </NuxtLink>
         </li>
      </ul>
   </main>
</template>

<script lang="ts" setup>
import { profiles } from "~/data/profiles"

const { t } = useI18n()
const localePath = useLocalePath()

useAppSeo({
   title: t("seo.home.title"),
   description: t("seo.home.description"),
})

// The home title already leads with the brand, and nuxt-seo-utils appends
// the site name by default — which rendered "Mama Parichay — Biodata Maker
// for Alliances | Mama Parichay". Drop the suffix here only: leading with
// the brand is what we want the branded search result to show.
useHead({ titleTemplate: "%s" })

defineOgImage("Home", {
   title: t("home.heading"),
   subtitle: t("home.tagline"),
})

useSchemaOrg([
   defineWebSite({ name: "Mama Parichay" }),
   defineWebPage(),
   defineSoftwareApp({
      name: "Mama Parichay",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web",
   }),
])
</script>

<style scoped lang="scss">
.home {
   padding: clamp(2rem, 6vw, 4rem) 1.25rem clamp(3rem, 8vw, 5rem);
   background: var(--page-glow), var(--cream);

   &__header {
      max-inline-size: 60rem;
      margin-inline: auto;
      margin-block-end: 1rem;
      text-align: center;
   }

   &__crest {
      // Same mark as the topbar brand. The source PNG carries generous
      // transparent padding and a glow, so it is sized past the intended
      // optical height and the slack is pulled back in with a negative
      // block margin (see SiteBrand).
      display: block;
      margin-inline: auto;
      margin-block: -1rem;
      inline-size: 4.5rem;
      block-size: 4.5rem;
      object-fit: contain;
   }

   &__title {
      margin-block-start: 0.75rem;
      color: var(--maroon);
      font-size: clamp(2.1rem, 5vw, 3.1rem);
      font-weight: var(--weight-heading);
      letter-spacing: 0.03em;
   }

   &__tagline {
      margin-block-start: 0.85rem;
      color: var(--muted);
      font-size: 1.18rem;
      font-style: italic;
      font-weight: var(--weight-strong);
   }
}

.cards {
   display: grid;
   grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
   gap: 1.75rem;
   max-inline-size: 60rem;
   margin-inline: auto;
}

.card {
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: 0.9rem;
   block-size: 100%;
   padding: 2.25rem 1.5rem 1.75rem;
   text-align: center;
   transition: transform 0.18s ease, box-shadow 0.18s ease;

   &:hover,
   &:focus-visible {
      transform: translateY(-4px);
      box-shadow:
         inset 0 0 0 4px var(--cream-card),
         inset 0 0 0 5px rgb(185 138 62 / 55%),
         0 14px 30px rgb(92 15 27 / 15%);
   }

   &:focus-visible {
      outline: 2px solid var(--kumkum);
      outline-offset: 3px;
   }

   // Gold ring around the portrait, matching the profile page.
   &__portrait {
      padding: 4px;
      background: var(--gold-gradient);
      border-radius: 50%;

      :deep(.avatar) {
         border: 3px solid var(--cream-card);
      }
   }

   &__body {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
   }

   &__name {
      color: var(--maroon);
      font-size: 1.4rem;
      font-weight: var(--weight-heading);
      letter-spacing: 0.02em;
   }

   &__meta {
      color: var(--ink-soft);
      font-size: 1.08rem;
      font-weight: var(--weight-strong);
   }

   &__location {
      color: var(--muted);
      font-size: 1rem;
   }

   &__cta {
      margin-block-start: auto;
      padding-block-start: 0.9rem;
      color: var(--kumkum);
      font-family: var(--font-display);
      font-size: 0.86rem;
      font-weight: var(--weight-label);
      letter-spacing: 0.09em;
      text-transform: uppercase;
   }
}
</style>
