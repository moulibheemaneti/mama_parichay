<template>
   <div
      class="avatar"
      :class="`avatar--${size}`"
      role="img"
      :aria-label="`Photo of ${name}`"
   >
      <img
         v-if="photo && !failed"
         :src="photo"
         :alt="`Photo of ${name}`"
         class="avatar__img"
         loading="lazy"
         decoding="async"
         @error="failed = true"
      />
      <span
         v-else
         class="avatar__initials"
         aria-hidden="true"
      >{{ initials }}</span>
   </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
   name: string
   photo?: string
   size?: "md" | "lg"
}>(), {
   photo: "",
   size: "md",
})

const failed = ref(false)

// Reset the fallback if the photo source changes (e.g. client-side nav).
watch(() => props.photo, () => {
   failed.value = false
})

const initials = computed(() =>
   props.name
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join(""),
)
</script>

<style scoped lang="scss">
.avatar {
   display: grid;
   place-items: center;
   overflow: hidden;
   aspect-ratio: 1;
   border-radius: 50%;
   background: linear-gradient(135deg, #f6b64b, #b0233a);
   color: #fff8ec;
   font-weight: 600;
   line-height: 1;
   user-select: none;

   &--md {
      inline-size: 6rem;
      font-size: 1.75rem;
   }

   &--lg {
      inline-size: 9.5rem;
      font-size: 2.75rem;
   }

   &__img {
      inline-size: 100%;
      block-size: 100%;
      object-fit: cover;
   }
}
</style>
