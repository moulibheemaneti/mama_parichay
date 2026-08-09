<template>
   <!-- Nuxt renders error.vue outside <NuxtLayout>, so the shell (topbar,
        language switcher, footer) has to be pulled in explicitly here. -->
   <NuxtLayout>
      <main class="error-page">
         <article class="error-page__card ornate-frame">
            <img src="/og-logo.png" alt="" class="error-page__crest" width="56" height="56" aria-hidden="true" />

            <p class="error-page__code">
               {{ statusCode }}
            </p>

            <h1 class="error-page__title">
               {{ t(`error.${variant}.heading`) }}
            </h1>

            <div class="flourish" aria-hidden="true" />

            <p class="error-page__body">
               {{ t(`error.${variant}.body`) }}
            </p>

            <button class="error-page__action" type="button" @click="goHome">
               {{ t("error.action") }}
            </button>
         </article>
      </main>
   </NuxtLayout>
</template>

<script lang="ts" setup>
import type { NuxtError } from "#app"

defineOptions({ name: "ErrorPage" })

const props = defineProps<{ error: NuxtError }>()

const { t } = useI18n()
const localePath = useLocalePath()

const statusCode = computed(() => props.error?.statusCode ?? 500)

// Two copy variants: a "this biodata link is dead" message for 404 (every
// 404 here is either a removed profile or a mistyped link), and a neutral
// message for everything else.
const variant = computed(() => (statusCode.value === 404 ? "notFound" : "generic"))

// `clearError` — not a <NuxtLink> — because navigating away from the error
// page without clearing the error state leaves the error page rendered.
function goHome() {
   return clearError({ redirect: localePath("/") })
}

useAppSeo({
   title: t(`seo.error.${variant.value}.title`),
   description: t(`seo.error.${variant.value}.description`),
})

// Error responses must never enter the index — a soft 404 ranking for a
// removed profile is worse than no result at all.
useSeoMeta({ robots: "noindex, nofollow" })
</script>

<style scoped lang="scss">
.error-page {
   display: flex;
   align-items: center;
   justify-content: center;
   padding: clamp(2rem, 6vw, 4rem) 1.25rem clamp(3rem, 8vw, 5rem);
   background: var(--page-glow), var(--cream);

   &__card {
      inline-size: 100%;
      max-inline-size: 34rem;
      padding: clamp(1.75rem, 5vw, 2.75rem) clamp(1.25rem, 4vw, 2.25rem);
      text-align: center;
   }

   &__crest {
      // Matches the topbar brand and the home hero; see `home__crest`.
      display: block;
      margin-inline: auto;
      margin-block: -0.85rem;
      inline-size: 3.75rem;
      block-size: 3.75rem;
      object-fit: contain;
   }

   &__code {
      margin-block-start: 0.6rem;
      color: var(--gold);
      font-family: var(--font-display);
      font-size: clamp(2.75rem, 9vw, 4rem);
      font-weight: var(--weight-heading);
      letter-spacing: 0.12em;
      line-height: 1;
   }

   &__title {
      margin-block-start: 0.75rem;
      color: var(--maroon);
      font-size: clamp(1.5rem, 4vw, 2rem);
      letter-spacing: 0.03em;
   }

   &__body {
      color: var(--ink-soft);
      line-height: 1.7;
   }

   &__action {
      margin-block-start: 1.75rem;
      padding: 0.65rem 1.75rem;
      background: var(--banner-gradient);
      border: 1px solid var(--line-gold);
      border-radius: 999px;
      box-shadow: 0 3px 12px rgb(92 15 27 / 22%);
      color: var(--gold-bright);
      font-family: var(--font-display);
      font-size: 0.86rem;
      font-weight: var(--weight-label);
      letter-spacing: 0.09em;
      text-transform: uppercase;
      cursor: pointer;
      transition: transform 0.18s ease, box-shadow 0.18s ease;

      &:hover {
         transform: translateY(-2px);
         box-shadow: 0 8px 20px rgb(92 15 27 / 28%);
      }

      &:focus-visible {
         outline: 2px solid var(--kumkum);
         outline-offset: 3px;
      }
   }
}
</style>
