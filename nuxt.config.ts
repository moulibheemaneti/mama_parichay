// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

   modules: [
      "@nuxt/eslint",
   ],
   devtools: { enabled: true },

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
