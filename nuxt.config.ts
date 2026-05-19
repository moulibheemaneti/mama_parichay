// https://nuxt.com/docs/api/configuration/nuxt-config

const siteUrl = 'https://mamaparichay.com'
const siteName = 'Mama Parichay'
const siteTitle = `${siteName} – Wedding Biodata Maker`
const siteDescription =
  'Create beautiful South Indian wedding biodata PDFs in minutes. Pick from 6 traditional templates, add photo, star, rasi & family details, preview, and download — free online biodata maker.'
const siteKeywords = [
  'wedding biodata',
  'marriage biodata',
  'biodata maker',
  'biodata template',
  'south indian biodata',
  'telugu biodata',
  'hindu matrimony biodata',
  'biodata for marriage',
  'biodata PDF download',
  'free biodata maker',
  'mama parichay',
  'nakshatra biodata',
  'horoscope biodata',
  'pasupu kumkum biodata',
].join(', ')

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: siteName,
  description: siteDescription,
  url: siteUrl,
  applicationCategory: 'DesignApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
  },
  inLanguage: ['en', 'te'],
  audience: {
    '@type': 'Audience',
    audienceType: 'Families seeking marriage alliances in South India',
  },
}

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/scss/main.scss'],

  runtimeConfig: {
    public: {
      siteUrl,
      siteName,
    },
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en-IN',
      },
      title: siteTitle,
      charset: 'utf-8',
      meta: [
        { name: 'description', content: siteDescription },
        { name: 'keywords', content: siteKeywords },
        { name: 'author', content: siteName },
        { name: 'application-name', content: siteName },
        { name: 'generator', content: 'Nuxt' },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'googlebot', content: 'index, follow' },
        { name: 'theme-color', content: '#1a0a00' },
        { name: 'color-scheme', content: 'dark' },
        { name: 'format-detection', content: 'telephone=no' },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: siteName },
        { property: 'og:title', content: siteTitle },
        { property: 'og:description', content: siteDescription },
        { property: 'og:url', content: siteUrl },
        { property: 'og:locale', content: 'en_IN' },
        { property: 'og:image', content: `${siteUrl}/og-image.png` },
        { property: 'og:image:alt', content: `${siteName} – traditional South Indian wedding biodata templates` },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        // Twitter / X
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: siteTitle },
        { name: 'twitter:description', content: siteDescription },
        { name: 'twitter:image', content: `${siteUrl}/og-image.png` },
        { name: 'twitter:image:alt', content: `${siteName} – wedding biodata maker` },
      ],
      link: [
        { rel: 'canonical', href: siteUrl },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Tiro+Devanagari+Sanskrit&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap',
        },
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(jsonLd),
        },
      ],
    },
  },

  ssr: false,
  nitro: {
    preset: 'bun',
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/variables" as *;\n@use "~/assets/scss/mixins" as *;\n',
        },
      },
    },
    optimizeDeps: {
      include: ['html2pdf.js'],
    },
  },
})
