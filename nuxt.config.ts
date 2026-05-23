// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

   modules: [
      "@nuxt/eslint",
   ],
   devtools: { enabled: true },

   app: {
      head: {
         title: "Mama Parichay",
         htmlAttrs: {
            lang: "en",
         },
         meta: [
            { "http-equiv": "content-language", "content": "en" },
            { name: "description", content: "Mama Parichay - A beautiful biodata maker for auspicious alliances" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
         ],
      },
   },

   css: [
      "~/assets/scss/main.scss",
   ],

   // YYYY-MM-DD
   compatibilityDate: "2026-05-23",

   eslint: {
      config: {
         stylistic: true,
      },
   },
})
