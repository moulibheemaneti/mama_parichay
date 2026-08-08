<template>
   <NuxtLink
      class="brand"
      :to="localePath('/')"
      :aria-label="`${brand} — home`"
   >
      <img
         src="/og-logo.png"
         alt=""
         class="brand__mark"
         width="40"
         height="40"
         aria-hidden="true"
      />
      <span class="brand__name">{{ brand }}</span>
   </NuxtLink>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const localePath = useLocalePath()

const brand = computed(() => t("home.heading"))
</script>

<style scoped lang="scss">
.brand {
   display: inline-flex;
   align-items: center;
   gap: 0.5rem;
   color: #7a1220;
   font-size: 1.15rem;
   font-weight: 700;
   letter-spacing: -0.01em;

   &__mark {
      // The source PNG has generous transparent padding + glow around the
      // lotus, so render it a little larger than the cap height and pull the
      // surrounding whitespace in with a negative margin.
      inline-size: 2.4rem;
      block-size: 2.4rem;
      margin: -0.5rem;
      object-fit: contain;
   }

   &:hover &__name {
      text-decoration: underline;
      text-underline-offset: 3px;
   }

   &:focus-visible {
      outline: 2px solid #b0233a;
      outline-offset: 3px;
      border-radius: 0.4rem;
   }
}
</style>
