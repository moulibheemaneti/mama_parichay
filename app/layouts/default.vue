<template>
   <div class="app-shell">
      <slot />
   </div>
</template>

<script lang="ts" setup>
// Emit hreflang alternates + og:locale meta for the active locale into <head>
// on every page. Complements the hreflang already present in the sitemap.
const localeHead = useLocaleHead()
useHead(() => localeHead.value)
</script>
