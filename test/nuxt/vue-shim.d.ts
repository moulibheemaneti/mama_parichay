/// Component tests import single-file components directly, which is the
/// only place in the project that does. `vue-tsc --build` resolves `.vue`
/// modules for files it compiles but not for these explicit imports, so
/// declare the module shape here rather than sprinkling ts-expect-error
/// over every test that mounts a component.

declare module "*.vue" {
   import type { DefineComponent } from "vue"

   const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>
   export default component
}
