<template>
   <main class="home">
      <header class="home__header">
         <h1 class="home__title">
            {{ t("home.heading") }}
         </h1>
         <p class="home__tagline">
            {{ t("home.tagline") }}
         </p>
      </header>

      <ul class="cards" role="list">
         <li v-for="profile in profiles" :key="profile.fullName" class="cards__item">
            <NuxtLink class="card" :to="`/${toSlug(profile.fullName)}`"
               :aria-label="`View ${profile.fullName}'s full profile`">
               <ProfileAvatar :name="profile.fullName" :photo="profile.photo" size="md" />
               <div class="card__body">
                  <h2 class="card__name">
                     {{ profile.fullName }}
                  </h2>
                  <p class="card__meta">
                     {{ profile.age }} · {{ profile.profession }}
                  </p>
                  <p class="card__location">
                     {{ profile.location }}
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

useAppSeo({
   title: t("seo.home.title"),
   description: t("seo.home.description"),
})

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
   min-block-size: 100dvh;
   padding: clamp(2rem, 6vw, 4rem) 1.25rem;
   background:
      radial-gradient(circle at top, #fff6e6, transparent 60%),
      #fdf6ec;

   &__header {
      max-inline-size: 60rem;
      margin-inline: auto;
      margin-block-end: 2.5rem;
      text-align: center;
   }

   &__title {
      font-size: clamp(2rem, 5vw, 2.75rem);
      font-weight: 700;
      letter-spacing: -0.02em;
      color: #7a1220;

      &::after {
         content: "";
         display: block;
         inline-size: 3.5rem;
         block-size: 3px;
         margin: 0.75rem auto 0;
         background: linear-gradient(90deg, #e8a13a, #b0233a);
         border-radius: 3px;
      }
   }

   &__tagline {
      margin-block-start: 0.75rem;
      color: #8a6d52;
      font-size: 1.05rem;
   }
}

.cards {
   display: grid;
   grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
   gap: 1.5rem;
   max-inline-size: 60rem;
   margin-inline: auto;
}

.card {
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: 1rem;
   block-size: 100%;
   padding: 2rem 1.5rem;
   text-align: center;
   background: #fffdf8;
   border: 1px solid #f0e0c6;
   border-radius: 1.25rem;
   box-shadow: 0 1px 2px rgb(122 18 32 / 5%);
   transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;

   &:hover,
   &:focus-visible {
      transform: translateY(-4px);
      border-color: #e0b45f;
      box-shadow: 0 12px 28px rgb(122 18 32 / 12%);
   }

   &:focus-visible {
      outline: 2px solid #b0233a;
      outline-offset: 3px;
   }

   &__body {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
   }

   &__name {
      font-size: 1.35rem;
      font-weight: 600;
      color: #3d1e17;
   }

   &__meta {
      color: #6b4f3d;
      font-size: 0.95rem;
   }

   &__location {
      color: #9a8067;
      font-size: 0.875rem;
   }

   &__cta {
      margin-block-start: auto;
      color: #b0233a;
      font-size: 0.9rem;
      font-weight: 600;
   }
}
</style>
