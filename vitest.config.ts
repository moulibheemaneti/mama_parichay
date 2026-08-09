import { fileURLToPath } from "node:url"
import { defineVitestProject } from "@nuxt/test-utils/config"
import { defineConfig } from "vitest/config"

export default defineConfig({
   test: {
      forceRerunTriggers: ["**/*.scss"],
      projects: [
         {
            test: {
               name: "scss",
               include: ["test/scss/*.{test,spec}.ts"],
            },
         },
         {
            // Plain Node — no Nuxt runtime, so `~` has to be aliased by hand
            // to the source dir (Nuxt 4's `srcDir` is `app/`) for the modules
            // under test to resolve their own imports.
            resolve: {
               alias: { "~": fileURLToPath(new URL("./app", import.meta.url)) },
            },
            test: {
               name: "unit",
               include: ["test/unit/*.{test,spec}.ts"],
               environment: "node",
            },
         },
         await defineVitestProject({
            test: {
               name: "nuxt",
               include: ["test/nuxt/*.{test,spec}.ts"],
               environment: "nuxt",
            },
         }),
      ],
   },
})
