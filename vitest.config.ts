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
