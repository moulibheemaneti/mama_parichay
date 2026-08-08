<template>
   <div class="lang">
      <span
         class="lang__icon"
         aria-hidden="true"
      >🌐</span>
      <select
         class="lang__select"
         :value="locale"
         aria-label="Select language"
         @change="onChange"
      >
         <option
            v-for="option in locales"
            :key="option.code"
            :value="option.code"
         >
            {{ option.name }}
         </option>
      </select>
   </div>
</template>

<script lang="ts" setup>
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const router = useRouter()

function onChange(event: Event) {
   // The <select> only ever holds one of the configured locale codes, so it is
   // safe to narrow the raw string to the i18n locale union.
   const code = (event.target as HTMLSelectElement).value as typeof locale.value
   const path = switchLocalePath(code)
   if (path) {
      router.push(path)
   }
}
</script>

<style scoped lang="scss">
.lang {
   position: relative;
   display: inline-flex;
   align-items: center;

   &__icon {
      position: absolute;
      inset-inline-start: 0.7rem;
      font-size: 0.9rem;
      pointer-events: none;
   }

   &__select {
      padding: 0.45rem 2rem 0.45rem 2.1rem;
      background: #fffdf8;
      border: 1px solid #f0d9ad;
      border-radius: 999px;
      color: #7a1220;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: border-color 0.18s ease, box-shadow 0.18s ease;

      // Custom chevron on the right (native arrow removed by the reset).
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23b0233a' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 0.7rem center;

      &:hover {
         border-color: #e0b45f;
      }

      &:focus-visible {
         outline: 2px solid #b0233a;
         outline-offset: 2px;
      }
   }
}
</style>
