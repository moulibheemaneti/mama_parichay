<template>
   <div class="app-shell">
      <header class="app-shell__topbar">
         <SiteBrand />
         <LanguageSwitcher />
      </header>
      <slot />
   </div>
</template>

<script lang="ts" setup>
// Emit hreflang alternates + og:locale meta for the active locale into <head>
// on every page. Complements the hreflang already present in the sitemap.
const localeHead = useLocaleHead()
useHead(() => localeHead.value)
</script>

<style scoped lang="scss">
.app-shell {
   &__topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding: 1rem 1.25rem;
      // Sits above the page's full-bleed background without overlapping
      // centred page headings (previously fixed, which collided on mobile).
      background: #fdf6ec;
   }
}
</style>
