<template>
   <main>
      <h1>{{ t("home.heading") }}</h1>
      <h2>{{ t("home.tagline") }}</h2>
   </main>
</template>

<script lang="ts" setup>
const { t } = useI18n()

useAppSeo({
   title: t("seo.home.title"),
   description: t("seo.home.description"),
})

// Dynamic 1200x630 Open Graph image rendered from a Vue template.
defineOgImage("Home", {
   title: t("home.heading"),
   subtitle: t("home.tagline"),
})

// Structured data: a biodata tool is best modelled as a WebApplication,
// alongside the site-wide Organization identity from nuxt.config.
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
