<template>
   <div class="og">
      <div class="og__brand">
         Mama Parichay
      </div>
      <div class="og__name">
         {{ name }}
      </div>
      <div class="og__headline">
         {{ headline }}
      </div>
      <div class="og__place">
         {{ place }}
      </div>
   </div>
</template>

<script lang="ts" setup>
// One card per profile, so a shared link previews the person rather than
// the site. Props come from `profileSeo(profile).ogImage`.
withDefaults(defineProps<{
   name?: string
   headline?: string
   place?: string
}>(), {
   name: "Mama Parichay",
   headline: "",
   place: "",
})
</script>

<style scoped>
/* Inline, self-contained styles — Satori renders a subset of CSS (flexbox). */
.og {
   width: 100%;
   height: 100%;
   display: flex;
   flex-direction: column;
   justify-content: center;
   padding: 80px;
   background: linear-gradient(135deg, #7a1f2b 0%, #b23a48 100%);
   color: #fff5e6;
   font-family: sans-serif;
}

.og__brand {
   font-size: 30px;
   font-weight: 700;
   letter-spacing: 2px;
   text-transform: uppercase;
   opacity: 0.85;
   margin-bottom: 32px;
}

.og__name {
   font-size: 76px;
   font-weight: 800;
   line-height: 1.05;
}

.og__headline {
   font-size: 36px;
   font-weight: 400;
   margin-top: 24px;
   opacity: 0.92;
}

.og__place {
   font-size: 30px;
   font-weight: 400;
   margin-top: 12px;
   opacity: 0.75;
}
</style>
