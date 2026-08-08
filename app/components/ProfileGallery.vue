<template>
   <div class="gallery">
      <ul class="gallery__grid" role="list">
         <li v-for="(src, index) in images" :key="src">
            <button v-if="!failed.has(index)" type="button" class="gallery__thumb"
               :aria-label="`View photo ${index + 1} of ${name}`" @click="open(index)">
               <img :src="src" :alt="altFor(src, index)" class="gallery__img" width="400" height="500" loading="lazy"
                  decoding="async" @error="failed.add(index)" />
            </button>
            <div v-else class="gallery__thumb gallery__thumb--empty" aria-hidden="true">
               <span class="gallery__mark">🪷</span>
            </div>
         </li>
      </ul>

      <div v-if="activeIndex !== null" ref="dialogEl" class="lightbox" role="dialog" aria-modal="true"
         :aria-label="`Photo ${activeIndex + 1} of ${name}`" @click.self="close">
         <button ref="closeBtn" type="button" class="lightbox__btn lightbox__close" aria-label="Close gallery"
            @click="close">
            ✕
         </button>
         <button type="button" class="lightbox__btn lightbox__nav lightbox__nav--prev" aria-label="Previous photo"
            @click="step(-1)">
            ‹
         </button>
         <img :src="images[activeIndex] ?? ''" :alt="altFor(images[activeIndex] ?? '', activeIndex)"
            class="lightbox__img" />
         <button type="button" class="lightbox__btn lightbox__nav lightbox__nav--next" aria-label="Next photo"
            @click="step(1)">
            ›
         </button>
      </div>
   </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
   name: string
   images: string[]
}>()

const failed = reactive(new Set<number>())
const activeIndex = ref<number | null>(null)
const dialogEl = ref<HTMLElement | null>(null)
const closeBtn = ref<HTMLButtonElement | null>(null)

let lastFocused: HTMLElement | null = null

/**
 * Build descriptive alt text from the SEO-friendly filename. Any leading token
 * that just repeats the person's name or initials is dropped, then the person's
 * full name is prefixed, so both "mb-in-traditional-wear.png" and
 * "yojana-in-casual-wear.png" become "<Full Name> — in traditional/casual wear".
 * Falls back to a numbered label when the filename carries no descriptor.
 */
function altFor(src: string, index: number): string {
   const file = src.split("/").pop()?.replace(/\.[^.]+$/, "") ?? ""
   const tokens = file.split(/[-_]+/).filter(Boolean)

   const nameParts = props.name.toLowerCase().split(/\s+/)
   const firstName = nameParts[0] ?? ""
   const initials = nameParts.map((part) => part.charAt(0)).join("")

   while (tokens.length && [firstName, initials].includes(tokens[0]!.toLowerCase())) {
      tokens.shift()
   }

   const descriptor = tokens.join(" ").trim()
   if (!descriptor) {
      return `${props.name} — photo ${index + 1}`
   }
   return `${props.name} — ${descriptor}`
}

function open(index: number) {
   lastFocused = document.activeElement as HTMLElement | null
   activeIndex.value = index
   document.body.style.overflow = "hidden"
   nextTick(() => closeBtn.value?.focus())
}

function close() {
   activeIndex.value = null
   document.body.style.overflow = ""
   lastFocused?.focus()
}

function step(delta: number) {
   if (activeIndex.value === null) {
      return
   }
   const count = props.images.length
   activeIndex.value = (activeIndex.value + delta + count) % count
}

function onKeydown(event: KeyboardEvent) {
   if (activeIndex.value === null) {
      return
   }
   if (event.key === "Escape") {
      close()
   }
   else if (event.key === "ArrowRight") {
      step(1)
   }
   else if (event.key === "ArrowLeft") {
      step(-1)
   }
}

onMounted(() => window.addEventListener("keydown", onKeydown))
onBeforeUnmount(() => {
   window.removeEventListener("keydown", onKeydown)
   document.body.style.overflow = ""
})
</script>

<style scoped lang="scss">
.gallery {
   &__grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(7rem, 1fr));
      gap: 0.75rem;
   }

   &__thumb {
      display: block;
      inline-size: 100%;
      aspect-ratio: 4 / 5;
      overflow: hidden;
      border: 1px solid #f0e0c6;
      border-radius: 0.9rem;
      background: #fbeed7;
      cursor: pointer;
      transition: transform 0.18s ease, box-shadow 0.18s ease;

      &:hover,
      &:focus-visible {
         transform: translateY(-2px);
         box-shadow: 0 8px 20px rgb(122 18 32 / 12%);
      }

      &:focus-visible {
         outline: 2px solid #b0233a;
         outline-offset: 2px;
      }

      &--empty {
         display: grid;
         place-items: center;
         background: linear-gradient(135deg, #fbeed7, #f3dcc0);
         cursor: default;
      }
   }

   &__img {
      inline-size: 100%;
      block-size: 100%;
      object-fit: cover;
   }

   &__mark {
      font-size: 1.75rem;
      opacity: 0.55;
   }
}

.lightbox {
   position: fixed;
   inset: 0;
   z-index: 100;
   display: flex;
   align-items: center;
   justify-content: center;
   gap: 0.5rem;
   padding: clamp(1rem, 4vw, 3rem);
   background: rgb(35 14 8 / 82%);
   backdrop-filter: blur(2px);

   &__img {
      max-inline-size: min(90vw, 720px);
      max-block-size: 85vh;
      object-fit: contain;
      border-radius: 0.75rem;
      box-shadow: 0 12px 40px rgb(0 0 0 / 40%);
   }

   &__btn {
      display: grid;
      place-items: center;
      inline-size: 2.75rem;
      block-size: 2.75rem;
      color: #7a1220;
      font-size: 1.4rem;
      line-height: 1;
      background: #fffdf8;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgb(0 0 0 / 25%);
      cursor: pointer;
      transition: transform 0.15s ease;

      &:hover {
         transform: scale(1.06);
      }

      &:focus-visible {
         outline: 2px solid #fff8ec;
         outline-offset: 2px;
      }
   }

   &__close {
      position: absolute;
      inset-block-start: 1rem;
      inset-inline-end: 1rem;
      font-size: 1.1rem;
   }

   &__nav {
      flex: 0 0 auto;
   }
}

@media (max-width: 30rem) {
   .lightbox__nav {
      position: absolute;
      inset-block-end: 1.25rem;

      &--prev {
         inset-inline-start: 1.25rem;
      }

      &--next {
         inset-inline-end: 1.25rem;
      }
   }
}
</style>
