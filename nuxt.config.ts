// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

   modules: [
      "@nuxt/eslint",
      "@nuxt/fonts",
      "@nuxt/image",
      "@nuxtjs/seo",
      "@nuxtjs/i18n",
      // Vercel Analytics + Speed Insights load `/_vercel/*` scripts that only
      // exist on the Vercel platform. Running the production build locally
      // (e.g. `bun run .output/server/index.mjs`) makes them 404 and log
      // console errors, which lowers the local Lighthouse "Best Practices"
      // score. Harmless — they resolve correctly once deployed to Vercel.
      //
      // To silence them in local audits, gate on the `VERCEL` env var (set
      // automatically on Vercel) by replacing the two lines below with:
      //   ...(process.env.VERCEL ? ["@vercel/analytics", "@vercel/speed-insights"] : []),
      "@vercel/analytics",
      "@vercel/speed-insights",
      "@nuxt/test-utils/module",
   ],
   devtools: { enabled: true },

   app: {
      head: {
         // title, description and htmlAttrs.lang are managed by Nuxt SEO
         // (site config) and @nuxtjs/i18n. Keep only what they don't own.
         meta: [
            { name: "viewport", content: "width=device-width, initial-scale=1" },
         ],
      },
   },

   css: [
      "~/assets/scss/main.scss",
   ],

   // Site-wide identity — single source of truth for all Nuxt SEO modules
   // (sitemap, robots, og-image, schema.org, canonical URLs).
   site: {
      url: process.env.NUXT_SITE_URL || "https://www.mamaparichay.com",
      name: "Mama Parichay",
      description: "A beautiful biodata maker for auspicious alliances.",
      defaultLocale: "en",
   },

   // YYYY-MM-DD
   compatibilityDate: "2026-05-23",

   nitro: {
      // Force the Bun preset ONLY for local/self-hosted builds
      // (`bun run .output/server/index.mjs`). On Vercel we must NOT set a
      // preset: an explicit `preset` overrides Nitro's provider auto-detection
      // (`_name = kebabCase(name) || provider`), so hardcoding "bun" makes the
      // Vercel build emit a Bun server instead of `.vercel/output/`. Vercel
      // then can't run it and falls back to serving the static SPA shell — no
      // SSR and, critically, the `/_i18n/**` message routes 404 to the SPA
      // fallback, so @nuxtjs/i18n's lazy loader merges HTML into vue-i18n and
      // throws "Invalid value", leaving every locale untranslated.
      // Leaving preset unset on Vercel lets Nitro auto-detect the `vercel`
      // preset (via the VERCEL env var) and deploy real serverless functions.
      ...(process.env.VERCEL ? {} : { preset: "bun" }),
   },

   typescript: {
      // typeCheck: true,
      strict: true,
   },

   eslint: {
      config: {
         stylistic: true,
      },
   },

   // Self-hosted (no runtime Google requests) festive typography:
   // Cinzel for engraved, roman-capital display; EB Garamond for body copy.
   // Heavier weights are provisioned deliberately: the primary readers are
   // older family members, so body copy runs at 500-600 rather than 400.
   fonts: {
      families: [
         { name: "Cinzel", provider: "google", weights: [500, 600, 700, 800] },
         { name: "EB Garamond", provider: "google", weights: [500, 600, 700], styles: ["normal", "italic"] },
      ],
   },

   // Multilingual (India-first). English at "/", other languages prefixed.
   // `language` is a BCP-47 tag used for hreflang alternates in the sitemap.
   i18n: {
      strategy: "prefix_except_default",
      defaultLocale: "en",
      // Absolute base URL so in-head hreflang/canonical are fully-qualified
      // (Google requires absolute URLs for hreflang annotations).
      baseUrl: process.env.NUXT_SITE_URL || "https://www.mamaparichay.com",
      locales: [
         { code: "en", language: "en-IN", name: "English", file: "en.json" },
         { code: "hi", language: "hi-IN", name: "हिन्दी", file: "hi.json" },
         { code: "te", language: "te-IN", name: "తెలుగు", file: "te.json" },
         { code: "ta", language: "ta-IN", name: "தமிழ்", file: "ta.json" },
         { code: "mr", language: "mr-IN", name: "मराठी", file: "mr.json" },
         { code: "kn", language: "kn-IN", name: "ಕನ್ನಡ", file: "kn.json" },
      ],
      // locale files resolve from <rootDir>/i18n/locales/*.json (v10 default)

      // Treat the chosen language as a sticky preference stored in a cookie.
      // `alwaysRedirect` + `redirectOn: "all"` enforce that preference on every
      // navigation, so pressing Back to a URL carrying an older locale prefix
      // (e.g. `/hi`) redirects to the preferred locale (e.g. `/te`). The cookie
      // is updated by i18n whenever the locale is switched, so manual switches
      // don't fight the redirect. Trade-off: opening a shared localized link
      // (`/hi/...`) redirects to the viewer's saved language — sticky wins.
      detectBrowserLanguage: {
         useCookie: true,
         cookieKey: "mp_locale",
         alwaysRedirect: true,
         redirectOn: "all",
         // Don't infer from Accept-Language on the very first visit; honour the
         // URL the user actually landed on until they pick a language.
         fallbackLocale: "en",
      },
   },

   // Dynamic Open Graph images. We use the Satori renderer (via the installed
   // `satori` + `@resvg/resvg-js` deps and the `*.satori.vue` component suffix)
   // because it is edge/serverless-safe; the chromium renderer will not run on
   // the Bun/Nitro preset.
   ogImage: {
      defaults: {
         width: 1200,
         height: 630,
      },
   },

   // Schema.org identity used by useSchemaOrg() across pages.
   schemaOrg: {
      identity: {
         type: "Organization",
         name: "Mama Parichay",
         url: "https://www.mamaparichay.com",
         logo: "https://www.mamaparichay.com/og-logo.png",
      },
   },
})
