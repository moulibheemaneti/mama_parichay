// @vitest-environment nuxt
import { mountSuspended } from "@nuxt/test-utils/runtime"
import { describe, expect, it } from "vitest"
// Aliased, unlike the plain-Node tests: this project runs in the Nuxt
// environment, where `~` resolves and a relative .vue import does not.
import ErrorPage from "~/error.vue"

/// The error page is the only surface a visitor with a dead biodata link
/// ever sees, so these assert the two copy variants stay wired to the
/// status code — not the styling.
///
/// The English copy is spelled out here rather than imported from
/// `i18n/locales/en.json`: inside the Nuxt environment the i18n Vite
/// plugin pre-compiles those JSON messages into vue-i18n AST objects, so
/// the import yields message nodes, not the strings on screen.

const EN = {
   notFound: "This page could not be found",
   generic: "Something went wrong",
   action: "Back to home",
}

function mountWithStatus(statusCode: number, statusMessage = ""): ReturnType<typeof mountSuspended> {
   // Built with `createError` rather than a bare object so the prop is a
   // real NuxtError, exactly as Nuxt hands it to the error page.
   return mountSuspended(ErrorPage, {
      props: { error: createError({ statusCode, statusMessage }) },
   })
}

describe("error page", () => {
   it("shows the not-found copy for a 404", async() => {
      const wrapper = await mountWithStatus(404, "Profile not found")

      expect(wrapper.text()).toContain("404")
      expect(wrapper.text()).toContain(EN.notFound)
      expect(wrapper.text()).not.toContain(EN.generic)
   })

   it("shows the generic copy for a 500", async() => {
      const wrapper = await mountWithStatus(500)

      expect(wrapper.text()).toContain("500")
      expect(wrapper.text()).toContain(EN.generic)
      expect(wrapper.text()).not.toContain(EN.notFound)
   })

   it("offers a way back home whatever the status", async() => {
      for (const status of [404, 500]) {
         const wrapper = await mountWithStatus(status)
         expect(wrapper.find("button").text()).toBe(EN.action)
      }
   })
})
