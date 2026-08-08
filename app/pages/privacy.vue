<template>
   <main class="legal">
      <NuxtLink class="legal__back" :to="localePath('/')">
         ← Back to home
      </NuxtLink>

      <article class="legal__card ornate-frame">
         <header class="legal__header">
            <span class="legal__crest" aria-hidden="true">🪷</span>
            <h1 class="legal__title">
               {{ t("privacy.heading") }}
            </h1>
            <p class="legal__updated">
               {{ t("privacy.updated", { date: LAST_UPDATED }) }}
            </p>
         </header>

         <div class="flourish" aria-hidden="true" />

         <section v-for="section in sections" :key="section.title" class="legal__section">
            <h2 class="banner">
               {{ section.title }}
            </h2>
            <div class="legal__body panel">
               <p v-for="(paragraph, index) in section.body" :key="index">
                  {{ paragraph }}
               </p>
            </div>
         </section>
      </article>
   </main>
</template>

<script lang="ts" setup>
// The route has to stay `/privacy`, so name the component explicitly rather
// than renaming the file (vue/multi-word-component-names).
defineOptions({ name: "PrivacyPolicy" })

const { t } = useI18n()
const localePath = useLocalePath()

/** Bump whenever the wording below changes materially. */
const LAST_UPDATED = "9 August 2026"

// Kept in English (like the biodata pages) so the legal wording stays exact;
// only the page chrome is translated.
const sections = [
   {
      title: "Information We Collect",
      body: [
         "We do not collect any information from visitors to this site. There are no accounts, no sign-up forms and nothing for you to submit.",
         `The biodata shown here are published only on request. Someone writes to us at ${SITE_EMAIL} with the details they want displayed, and we publish exactly those details — nothing more is gathered, and nothing is added without being asked for.`,
      ],
   },
   {
      title: "How We Use Your Information",
      body: [
         "We do not use the information for anything at all beyond displaying the biodata that was asked for. It is not sold, rented, shared for marketing, profiled or used for advertising.",
         `If you want a profile corrected, hidden or removed, write to ${SITE_EMAIL} and we will act on it.`,
      ],
   },
   {
      title: "Cookies and Local Storage",
      body: [
         "We use a single preference cookie, mp_locale, which remembers the language you selected so the site opens in that language on your next visit. It contains no personal information and no tracking identifier.",
         "You can clear or block this cookie in your browser at any time; the site will simply fall back to English.",
      ],
   },
   {
      title: "Analytics",
      body: [
         "We use Vercel Analytics and Vercel Speed Insights to measure page views and loading performance. These collect aggregated, anonymised usage data and do not use cookies to track you across other websites.",
      ],
   },
   {
      title: "Sharing and Disclosure",
      body: [
         "We do not share personal information with anyone, apart from the service providers who host and deliver this site, and then only to the extent needed to run it. We may also disclose information where we are required to do so by law.",
         "A published biodata page is, by design, visible to anyone who has the link.",
      ],
   },
   {
      title: "Data Retention",
      body: [
         `A biodata stays published until we are asked to take it down. Write to ${SITE_EMAIL} and we will remove the page and its photographs, apart from any copies retained in routine backups for a limited period.`,
      ],
   },
   {
      title: "Your Rights",
      body: [
         `You may ask us to access, correct or delete the details published about you. Write to ${SITE_EMAIL} and we will respond within a reasonable period.`,
      ],
   },
   {
      title: "Children",
      body: [
         "This site is not intended for children. We do not knowingly publish information about anyone under 18. If you believe a child's information has been sent to us, contact us and we will delete it.",
      ],
   },
   {
      title: "Changes to This Policy",
      body: [
         "We may update this policy as the site develops. The revision date at the top of this page always reflects the current version.",
      ],
   },
   {
      title: "Contact Us",
      body: [
         `Questions about this policy, or a request to publish, change or remove a biodata, can be sent to ${SITE_EMAIL}.`,
      ],
   },
]

useAppSeo({
   title: t("seo.privacy.title"),
   description: t("seo.privacy.description"),
})

useSchemaOrg([defineWebPage()])
</script>

<style scoped lang="scss">
.legal {
   padding: clamp(1.5rem, 5vw, 3rem) 1.25rem clamp(3rem, 8vw, 5rem);
   background: var(--page-glow), var(--cream);

   &__back {
      display: block;
      max-inline-size: 46rem;
      margin-inline: auto;
      margin-block-end: 1.25rem;
      color: var(--kumkum);
      font-family: var(--font-display);
      font-size: 0.82rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;

      &:hover {
         text-decoration: underline;
         text-underline-offset: 3px;
      }
   }

   &__card {
      max-inline-size: 46rem;
      margin-inline: auto;
      padding: clamp(1.5rem, 5vw, 2.5rem) clamp(1.25rem, 4vw, 2.25rem);
   }

   &__header {
      text-align: center;
   }

   &__crest {
      display: block;
      font-size: 1.75rem;
      line-height: 1;
   }

   &__title {
      margin-block-start: 0.6rem;
      color: var(--maroon);
      font-size: clamp(1.6rem, 4vw, 2.2rem);
      font-weight: 600;
      letter-spacing: 0.03em;
   }

   &__updated {
      margin-block-start: 0.5rem;
      color: var(--muted);
      font-size: 0.92rem;
      font-style: italic;
   }

   &__section + &__section {
      margin-block-start: 1.75rem;
   }

   &__body {
      margin-block-start: 1rem;
      color: var(--ink-soft);
      line-height: 1.7;

      p + p {
         margin-block-start: 0.75rem;
      }
   }
}
</style>
