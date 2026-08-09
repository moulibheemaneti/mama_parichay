/// --------------------------------------------------
/// server/api/__sitemap__/urls.ts
/// --------------------------------------------------
/// Sitemap source for the profile pages.
///
/// `/[slug]` is a dynamic SSR route, so @nuxtjs/sitemap cannot discover
/// it the way it discovers static routes — without this endpoint no
/// biodata appears in the sitemap at all. Registered via
/// `sitemap.sources` in `nuxt.config.ts`.
///
/// Derived from `~/data/profiles`, so adding a record is all it takes to
/// get a sitemap entry; there is no second list to keep in step.
/// --------------------------------------------------

import type { SitemapUrlInput } from "#sitemap/types"
import { profiles } from "~/data/profiles"

export default defineSitemapEventHandler((): SitemapUrlInput[] =>
   profiles.map((profile) => ({
      loc: `/${profile.slug}`,
      // Emit the URL once per locale, with hreflang alternates between
      // them — the profile pages are localized, so all six are indexable.
      _i18nTransform: true,
      changefreq: "monthly",
      priority: 0.8,
      // Surfaces the biodata photos in Google Images. The portrait is
      // usually also a gallery entry, so the two lists are merged by path
      // to keep each photo listed once, with its authored caption.
      images: [...new Map([
         { loc: profile.photo, caption: profile.fullName },
         ...profile.gallery.map((image) => ({ loc: image.src, caption: image.alt })),
      ].map((image) => [image.loc, image])).values()],
   })),
)
