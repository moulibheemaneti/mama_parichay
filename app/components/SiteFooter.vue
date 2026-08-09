<template>
   <footer class="site-footer">
      <div class="flourish" aria-hidden="true" />

      <nav class="site-footer__nav" :aria-label="t('footer.navLabel')">
         <NuxtLink class="site-footer__link" :to="localePath('/privacy')">
            {{ t("footer.privacy") }}
         </NuxtLink>
         <a class="site-footer__link site-footer__link--email" :href="`mailto:${SITE_EMAIL}`">
            {{ SITE_EMAIL }}
         </a>
      </nav>

      <p class="site-footer__legal">
         {{ t("footer.copyright", { year, brand }) }}
      </p>
   </footer>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const localePath = useLocalePath()

const brand = computed(() => t("home.heading"))
// Rendered on the server and re-evaluated on the client; both run in the same
// calendar year in every practical case, so no hydration mismatch.
const year = new Date().getFullYear()
</script>

<style scoped lang="scss">
.site-footer {
   padding: 0 1.25rem clamp(1.5rem, 4vw, 2.25rem);
   background: var(--cream);
   text-align: center;

   .flourish {
      margin-block: 0 1.25rem;
   }

   &__nav {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 0.4rem 1.25rem;
   }

   &__link {
      color: var(--kumkum);
      font-family: var(--font-display);
      font-size: 0.86rem;
      font-weight: var(--weight-label);
      letter-spacing: 0.09em;
      text-transform: uppercase;

      &:hover {
         text-decoration: underline;
         text-underline-offset: 3px;
      }

      // An address is read letter-by-letter, so drop the engraved small-caps
      // treatment the other links use.
      &--email {
         font-family: var(--font-body);
         letter-spacing: 0.02em;
         text-transform: none;
      }

      &:focus-visible {
         outline: 2px solid var(--kumkum);
         outline-offset: 3px;
         border-radius: 0.4rem;
      }
   }

   &__legal {
      margin-block-start: 0.85rem;
      color: var(--muted);
      font-size: 0.95rem;
   }
}
</style>
