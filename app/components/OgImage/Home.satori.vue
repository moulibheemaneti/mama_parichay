<template>
   <div class="og">
      <div class="og__brand">
         Mama Parichay
      </div>
      <div class="og__title">
         {{ title }}
      </div>
      <div class="og__subtitle">
         {{ subtitle }}
      </div>
   </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
   title?: string
   subtitle?: string
}>(), {
   title: "Mama Parichay",
   subtitle: "A beautiful biodata maker for auspicious alliances",
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
   font-size: 34px;
   font-weight: 700;
   letter-spacing: 2px;
   text-transform: uppercase;
   opacity: 0.85;
   margin-bottom: 28px;
}

.og__title {
   font-size: 72px;
   font-weight: 800;
   line-height: 1.05;
}

.og__subtitle {
   font-size: 36px;
   font-weight: 400;
   margin-top: 24px;
   opacity: 0.9;
}
</style>
